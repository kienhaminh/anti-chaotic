import sys
import os

def check_consent(message):
    """
    Ask for user consent. Returns True if user agrees, False otherwise.
    """
    print(f"{message} [y/N]: ", end="", flush=True)
    try:
        choice = input().strip().lower()
        return choice == 'y'
    except EOFError:
        return False

def install_rembg():
    if not check_consent("The 'rembg' library is required to remove backgrounds. It will be installed via pip. Do you want to proceed?"):
        print("Installation aborted by user.")
        sys.exit(1)
        
    print("Installing rembg...")
    import subprocess
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "rembg", "onnxruntime"])
    except subprocess.CalledProcessError:
        print("Failed to install rembg.")
        sys.exit(1)

try:
    from rembg import remove, new_session
except ImportError:
    install_rembg()
    try:
        from rembg import remove, new_session
    except ImportError:
        print("Failed to import rembg after installation.")
        sys.exit(1)

from PIL import Image
import io

def remove_background(input_path, output_path):
    print(f"Processing: {input_path} -> {output_path}")
    
    if not os.path.exists(input_path):
        print(f"Error: Input file does not exist: {input_path}")
        sys.exit(1)

    # Warn about model download on first run
    # We can't strictly detect if it's the first run without checking cache, 
    # but we can maintain the consent principle by warning generally if it looks like we might need to download.
    # rembg uses ~/.u2net by default.
    u2net_path = os.path.expanduser("~/.u2net/isnet-general-use.onnx")
    if not os.path.exists(u2net_path):
        if not check_consent("This appears to be the first run. The background removal model (~170MB) needs to be downloaded. Proceed?"):
            print("Model download aborted by user.")
            sys.exit(1)

    # Load input image
    with open(input_path, 'rb') as i:
        input_data = i.read()

    # Create session with isnet-general-use (default)
    session = new_session("isnet-general-use")

    # Apply background removal with alpha matting
    print("Applying background removal (this may take a moment)...")
    output_data = remove(
        input_data,
        session=session,
        alpha_matting=True,
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=10,
        alpha_matting_erode=10
    )

    # Save output
    with open(output_path, 'wb') as o:
        o.write(output_data)
        
    print("Background removal complete.")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python3 remove_background.py <input_path> <output_path>")
        sys.exit(1)
        
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    remove_background(input_file, output_file)
