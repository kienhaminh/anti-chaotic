import sys
import re
import subprocess
import shutil

def check_mermaid_cli():
    """Check if mmdc (Mermaid CLI) is installed."""
    return shutil.which("mmdc") is not None

def validate_mermaid_content(content):
    """
    Validates Mermaid syntax.
    1. Basic Regex checks for common errors.
    2. (Optional) Runs mmdc --dry-run if available.
    """
    errors = []
    
    # Check 1: Empty content
    if not content.strip():
        return ["Error: Diagram content is empty."]

    # Check 2: Known Diagram Types
    valid_starts = [
        "flowchart", "graph", "sequenceDiagram", "classDiagram", 
        "stateDiagram", "erDiagram", "gantt", "pie", "journey", 
        "gitGraph", "C4Context"
    ]
    
    first_line = content.strip().split('\n')[0].strip()
    # Remove options like 'flowchart TD' -> 'flowchart'
    diagram_type = first_line.split(' ')[0]
    
    if diagram_type not in valid_starts:
        errors.append(f"Warning: Unknown or missing diagram type '{diagram_type}'. Supported: {', '.join(valid_starts)}")

    # Check 3: Brackets balance (simple check)
    if content.count('{') != content.count('}'):
        errors.append("Error: Mismatched curly braces '{}'.")
    
    # Check 4: Sequence Diagram participants
    if diagram_type == "sequenceDiagram":
        if "participant" not in content and "->" not in content and "-->>" not in content:
             errors.append("Warning: Sequence diagram appears to lack interactions (arrows).")

    return errors

def main(filepath):
    try:
        with open(filepath, 'r') as f:
            content = f.read()
            
        print(f"Validating {filepath}...")
        errors = validate_mermaid_content(content)
        
        if errors:
            print("❌ Validation Failed:")
            for err in errors:
                print(f"  - {err}")
            sys.exit(1)
        else:
            print("✅ Syntax looks plausible (regex check).")
            
            # Optional: Real validation using CLI
            if check_mermaid_cli():
                print("Running mmdc (Mermaid CLI) for strict validation...")
                try:
                    # Run a dry run or output to null
                    subprocess.run(["mmdc", "-i", filepath, "-o", "/dev/null"], check=True, capture_output=True)
                    print("✅ mmdc validation passed.")
                except subprocess.CalledProcessError as e:
                    print("❌ mmdc validation failed:")
                    print(e.stderr.decode())
                    sys.exit(1)
            else:
                 print("ℹ️  mmdc not found. Skipping strict CLI validation. Install @mermaid-js/mermaid-cli for better checks.")

    except FileNotFoundError:
        print(f"Error: File {filepath} not found.")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python verify_mermaid.py <path_to_mermaid_file>")
        sys.exit(1)
        
    main(sys.argv[1])
