#!/usr/bin/env python3
"""
Skill Initializer - Creates a new skill from template

Usage:
    init_skill.py <skill-name> --path <path>

Examples:
    init_skill.py my-skill --path .agent/skills        # Workspace skill
    init_skill.py my-skill --path ~/.gemini/skills     # Global skill
"""

import sys
from pathlib import Path

from encoding_utils import configure_utf8_console, write_text_utf8

configure_utf8_console()


SKILL_TEMPLATE = """---
name: {skill_name}
description: [TODO: Describe what this skill does and when to use it. Include trigger keywords. 1-1024 chars]
# license: MIT
# compatibility: [Optional: environment requirements, 1-500 chars]
# metadata:
#   author: your-name
#   version: "1.0"
# allowed-tools: [Experimental: pre-approved tools list]
---

# {skill_title}

[TODO: 1-2 sentences explaining what this skill enables]

## Workflow

[TODO: Step-by-step instructions for the agent]

1. **Step 1**: Description
2. **Step 2**: Description
3. **Step 3**: Description

## Examples

[TODO: Concrete examples with realistic user requests]

## Resources

- `scripts/` - Executable scripts for automation
- `references/` - Documentation loaded as needed
- `assets/` - Templates and files for output

Delete unused directories.
"""

EXAMPLE_SCRIPT = '''#!/usr/bin/env python3
"""
Example script for {skill_name}

Replace with actual implementation or delete if not needed.
"""

def main():
    print("Example script for {skill_name}")
    # TODO: Add actual logic

if __name__ == "__main__":
    main()
'''

EXAMPLE_REFERENCE = """# Reference: {skill_title}

[TODO: Add detailed documentation here]

## API Reference

[Document endpoints, functions, or schemas]

## Examples

[Provide code examples and usage patterns]
"""

EXAMPLE_ASSET = """# Asset Placeholder

Replace with actual assets (templates, images, fonts, etc.) or delete this file.

Common asset types:
- Templates: .pptx, .docx, boilerplate directories
- Images: .png, .jpg, .svg
- Data: .csv, .json, .yaml
"""


def title_case_skill_name(skill_name):
    """Convert hyphenated skill name to Title Case."""
    return ' '.join(word.capitalize() for word in skill_name.split('-'))


def init_skill(skill_name, path):
    """Initialize a new skill directory with template SKILL.md."""
    skill_dir = Path(path).resolve() / skill_name

    if skill_dir.exists():
        print(f"❌ Error: Directory already exists: {skill_dir}")
        return None

    try:
        skill_dir.mkdir(parents=True, exist_ok=False)
        print(f"✅ Created: {skill_dir}")
    except Exception as e:
        print(f"❌ Error creating directory: {e}")
        return None

    # Create SKILL.md
    skill_title = title_case_skill_name(skill_name)
    skill_content = SKILL_TEMPLATE.format(
        skill_name=skill_name,
        skill_title=skill_title
    )

    skill_md_path = skill_dir / 'SKILL.md'
    try:
        write_text_utf8(skill_md_path, skill_content)
        print("✅ Created SKILL.md")
    except Exception as e:
        print(f"❌ Error creating SKILL.md: {e}")
        return None

    # Create resource directories with examples
    try:
        # scripts/
        scripts_dir = skill_dir / 'scripts'
        scripts_dir.mkdir(exist_ok=True)
        example_script = scripts_dir / 'example.py'
        write_text_utf8(example_script, EXAMPLE_SCRIPT.format(skill_name=skill_name))
        example_script.chmod(0o755)
        print("✅ Created scripts/example.py")

        # references/
        references_dir = skill_dir / 'references'
        references_dir.mkdir(exist_ok=True)
        example_ref = references_dir / 'reference.md'
        write_text_utf8(example_ref, EXAMPLE_REFERENCE.format(skill_title=skill_title))
        print("✅ Created references/reference.md")

        # assets/
        assets_dir = skill_dir / 'assets'
        assets_dir.mkdir(exist_ok=True)
        example_asset = assets_dir / 'README.md'
        write_text_utf8(example_asset, EXAMPLE_ASSET)
        print("✅ Created assets/README.md")
    except Exception as e:
        print(f"❌ Error creating resources: {e}")
        return None

    print(f"\n✅ Skill '{skill_name}' initialized at {skill_dir}")
    print("\nNext steps:")
    print("1. Edit SKILL.md to complete TODO items")
    print("2. Customize or delete example files")
    print("3. Run: python scripts/quick_validate.py <skill-path>")

    return skill_dir


def main():
    if len(sys.argv) < 4 or sys.argv[2] != '--path':
        print("Usage: init_skill.py <skill-name> --path <path>")
        print("\nSkill name requirements:")
        print("  - 1-64 characters")
        print("  - Lowercase letters, digits, and hyphens only")
        print("  - No starting/ending hyphens, no consecutive hyphens")
        print("\nExamples:")
        print("  init_skill.py my-skill --path .agent/skills")
        print("  init_skill.py my-skill --path ~/.gemini/skills")
        sys.exit(1)

    skill_name = sys.argv[1]
    path = sys.argv[3]

    print(f"🚀 Initializing skill: {skill_name}")
    print(f"   Location: {path}\n")

    result = init_skill(skill_name, path)
    sys.exit(0 if result else 1)


if __name__ == "__main__":
    main()
