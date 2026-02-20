#!/usr/bin/env python3
"""
Skill Validator - Validates skill structure per Agent Skills spec

Usage:
    python quick_validate.py <skill_directory>

Validates:
    - SKILL.md exists with valid YAML frontmatter
    - name: 1-64 chars, lowercase alphanumeric + hyphens, matches directory
    - description: 1-1024 chars, no angle brackets
    - Optional fields: license, compatibility (1-500 chars), metadata
"""

import sys
import re
from pathlib import Path

from encoding_utils import configure_utf8_console, read_text_utf8

configure_utf8_console()


def validate_skill(skill_path):
    """Validate a skill against Agent Skills specification."""
    skill_path = Path(skill_path)
    errors = []
    warnings = []

    # Check SKILL.md exists
    skill_md = skill_path / 'SKILL.md'
    if not skill_md.exists():
        return False, "SKILL.md not found", []

    content = read_text_utf8(skill_md)

    # Check frontmatter exists
    if not content.startswith('---'):
        return False, "No YAML frontmatter found (must start with ---)", []

    # Extract frontmatter
    match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if not match:
        return False, "Invalid frontmatter format (missing closing ---)", []

    frontmatter = match.group(1)

    # Validate name field (required)
    name_match = re.search(r'^name:\s*(.+)$', frontmatter, re.MULTILINE)
    if not name_match:
        errors.append("Missing required 'name' field")
    else:
        name = name_match.group(1).strip()
        
        # Length check: 1-64 characters
        if len(name) < 1 or len(name) > 64:
            errors.append(f"Name '{name}' must be 1-64 characters (got {len(name)})")
        
        # Format check: lowercase alphanumeric + hyphens
        if not re.match(r'^[a-z0-9-]+$', name):
            errors.append(f"Name '{name}' must be lowercase alphanumeric with hyphens only")
        
        # No invalid hyphen patterns
        if name.startswith('-') or name.endswith('-'):
            errors.append(f"Name '{name}' cannot start or end with hyphen")
        if '--' in name:
            errors.append(f"Name '{name}' cannot contain consecutive hyphens")
        
        # Must match directory name
        if name != skill_path.name:
            errors.append(f"Name '{name}' must match directory name '{skill_path.name}'")

    # Validate description field (required)
    desc_match = re.search(r'^description:\s*(.+)$', frontmatter, re.MULTILINE)
    if not desc_match:
        errors.append("Missing required 'description' field")
    else:
        description = desc_match.group(1).strip()
        
        # Length check: 1-1024 characters
        if len(description) < 1:
            errors.append("Description cannot be empty")
        elif len(description) > 1024:
            errors.append(f"Description exceeds 1024 characters (got {len(description)})")
        
        # No angle brackets (common mistake)
        if '<' in description or '>' in description:
            errors.append("Description cannot contain angle brackets (< or >)")
        
        # Warning for short descriptions
        if len(description) < 50:
            warnings.append(f"Description is short ({len(description)} chars). Consider adding more detail.")

    # Validate optional compatibility field
    compat_match = re.search(r'^compatibility:\s*(.+)$', frontmatter, re.MULTILINE)
    if compat_match:
        compatibility = compat_match.group(1).strip()
        if len(compatibility) > 500:
            errors.append(f"Compatibility exceeds 500 characters (got {len(compatibility)})")

    if errors:
        return False, "; ".join(errors), warnings

    return True, "Skill is valid!", warnings


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python quick_validate.py <skill_directory>")
        sys.exit(1)

    valid, message, warnings = validate_skill(sys.argv[1])
    
    if warnings:
        for w in warnings:
            print(f"⚠️  Warning: {w}")
    
    if valid:
        print(f"✅ {message}")
    else:
        print(f"❌ {message}")
    
    sys.exit(0 if valid else 1)