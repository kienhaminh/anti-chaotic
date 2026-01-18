#!/usr/bin/env python3
import sys
import re
import os

def check_file(filepath):
    """
    Simple heuristic checks for frontend compliance.
    """
    with open(filepath, 'r') as f:
        content = f.read()

    errors = []
    
    # Check 1: Image Accessibility
    # Matches <img ...> without alt=
    img_tags = re.findall(r'<img[^>]*>', content)
    for tag in img_tags:
        if 'alt=' not in tag:
            errors.append(f"ACCESSIBILITY: Found <img> tag without 'alt' attribute: {tag}")

    # Check 2: Next.js Image Optimization
    if 'next/image' in content or '<Image' in content:
        # Check for sizes prop if not fill
        if '<Image' in content and 'sizes=' not in content and 'fill' not in content:
             errors.append("PERFORMANCE: Found <Image> component (Next.js) without 'sizes' attribute. Use 'sizes' for responsive hydration.")

    # Check 3: React Anti-Pattern (Effect Fetching)
    if 'useEffect' in content and 'fetch(' in content:
        errors.append("ARCHITECTURE: Found 'fetch' inside 'useEffect'. Use Server Components, React Query, or SWR instead.")

    # Check 4: Angular Legacy
    if '*ngIf' in content:
         errors.append("MODERNIZATION: Found '*ngIf'. Use modern Angular control flow '@if'.")

    return errors

def main():
    if len(sys.argv) < 2:
        print("Usage: python validate_compliance.py <file_or_directory>")
        sys.exit(1)

    target = sys.argv[1]
    all_errors = []

    if os.path.isfile(target):
        all_errors.extend(check_file(target))
    elif os.path.isdir(target):
        for root, _, files in os.walk(target):
            for file in files:
                if file.endswith(('.tsx', '.jsx', '.vue', '.ts', '.js')):
                    path = os.path.join(root, file)
                    all_errors.extend(check_file(path))

    if all_errors:
        print("❌ Compliance Errors Found:")
        for err in all_errors:
            print(f"- {err}")
        sys.exit(1)
    else:
        print("✅ No obvious compliance errors found (Heuristic Check).")
        sys.exit(0)

if __name__ == "__main__":
    main()
