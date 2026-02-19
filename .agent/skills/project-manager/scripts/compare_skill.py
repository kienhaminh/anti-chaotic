#!/usr/bin/env python3
"""
Compare two versions of a skill (before/after upgrade).

Usage:
    python compare_skill.py <before_path> <after_path>
    
Example:
    python compare_skill.py .agent/skills/designer.backup .agent/skills/designer
"""

import sys
import re
import argparse
from pathlib import Path

# Import encoding utils from same directory
try:
    from encoding_utils import configure_utf8_console, read_text_utf8
    configure_utf8_console()
except ImportError:
    def read_text_utf8(path: Path) -> str:
        return path.read_text(encoding='utf-8')


def count_tokens_approx(text: str) -> int:
    """Approximate token count (words + punctuation)."""
    return len(re.findall(r'\S+', text))


def extract_frontmatter(content: str) -> tuple[dict, str]:
    """Extract YAML frontmatter and body from SKILL.md."""
    frontmatter = {}
    body = content
    
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)$', content, re.DOTALL)
    if match:
        fm_text = match.group(1)
        body = match.group(2)
        
        # Simple YAML parsing
        for line in fm_text.split('\n'):
            if ':' in line and not line.startswith(' '):
                key, _, value = line.partition(':')
                frontmatter[key.strip()] = value.strip()
    
    return frontmatter, body


def extract_sections(body: str) -> list[str]:
    """Extract markdown section headers."""
    return re.findall(r'^#{1,3}\s+(.+)$', body, re.MULTILINE)


def count_files(skill_path: Path) -> dict:
    """Count files in skill subdirectories."""
    counts = {'scripts': 0, 'references': 0, 'assets': 0}
    
    for subdir in counts.keys():
        path = skill_path / subdir
        if path.exists():
            counts[subdir] = len([f for f in path.iterdir() if f.is_file()])
    
    return counts


def analyze_skill(skill_path: Path) -> dict:
    """Analyze a skill and return metrics."""
    skill_md = skill_path / 'SKILL.md'
    
    if not skill_md.exists():
        raise FileNotFoundError(f"SKILL.md not found in {skill_path}")
    
    content = read_text_utf8(skill_md)
    frontmatter, body = extract_frontmatter(content)
    sections = extract_sections(body)
    file_counts = count_files(skill_path)
    
    return {
        'name': frontmatter.get('name', skill_path.name),
        'description': frontmatter.get('description', ''),
        'tokens': count_tokens_approx(content),
        'sections': sections,
        'section_count': len(sections),
        'scripts': file_counts['scripts'],
        'references': file_counts['references'],
        'assets': file_counts['assets'],
        'frontmatter': frontmatter,
    }


def compare_skills(before: dict, after: dict) -> str:
    """Generate comparison report in markdown format."""
    
    def calc_change(b, a):
        if b == 0:
            return f"+{a}" if a > 0 else "0"
        pct = ((a - b) / b) * 100
        sign = "+" if pct >= 0 else ""
        return f"{sign}{pct:.0f}%"
    
    # Find section changes
    before_sections = set(before['sections'])
    after_sections = set(after['sections'])
    new_sections = after_sections - before_sections
    removed_sections = before_sections - after_sections
    
    report = f"""## Skill Comparison Report: {after['name']}

### Summary
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Tokens | {before['tokens']} | {after['tokens']} | {calc_change(before['tokens'], after['tokens'])} |
| Sections | {before['section_count']} | {after['section_count']} | {calc_change(before['section_count'], after['section_count'])} |
| Scripts | {before['scripts']} | {after['scripts']} | {calc_change(before['scripts'], after['scripts'])} |
| References | {before['references']} | {after['references']} | {calc_change(before['references'], after['references'])} |
| Assets | {before['assets']} | {after['assets']} | {calc_change(before['assets'], after['assets'])} |

"""

    if new_sections:
        report += "### New Sections Added\n"
        for section in sorted(new_sections):
            report += f"- {section}\n"
        report += "\n"
    
    if removed_sections:
        report += "### Sections Removed\n"
        for section in sorted(removed_sections):
            report += f"- {section}\n"
        report += "\n"
    
    # Description change
    if before['description'] != after['description']:
        report += "### Description Changed\n"
        report += f"**Before:** {before['description'][:100]}...\n\n"
        report += f"**After:** {after['description'][:100]}...\n\n"
    
    return report


def main():
    parser = argparse.ArgumentParser(
        description='Compare two versions of a skill (before/after upgrade)'
    )
    parser.add_argument('before', type=Path, help='Path to before skill (backup)')
    parser.add_argument('after', type=Path, help='Path to after skill (current)')
    parser.add_argument('--output', '-o', type=Path, help='Output file (default: stdout)')
    
    args = parser.parse_args()
    
    if not args.before.exists():
        print(f"❌ Error: Before path does not exist: {args.before}", file=sys.stderr)
        sys.exit(1)
    
    if not args.after.exists():
        print(f"❌ Error: After path does not exist: {args.after}", file=sys.stderr)
        sys.exit(1)
    
    try:
        before_analysis = analyze_skill(args.before)
        after_analysis = analyze_skill(args.after)
        report = compare_skills(before_analysis, after_analysis)
        
        if args.output:
            args.output.write_text(report, encoding='utf-8')
            print(f"✅ Report saved to: {args.output}")
        else:
            print(report)
            
    except Exception as e:
        print(f"❌ Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
