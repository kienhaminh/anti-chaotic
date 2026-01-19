import sys
import os
import subprocess
import site

# --- Configuration ---
# Get the absolute path of the directory containing this script
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

# Define local directories for libs and models
LOCAL_LIB_DIR = os.path.join(SCRIPT_DIR, "libs")
LOCAL_MODEL_DIR = os.path.join(SCRIPT_DIR, "models")

# IMPORTANT: Add the local lib directory to sys.path immediately
# This allows us to import packages we install into LOCAL_LIB_DIR
if LOCAL_LIB_DIR not in sys.path:
    site.addsitedir(LOCAL_LIB_DIR) # addsitedir handles .pth files correctly
    sys.path.insert(0, LOCAL_LIB_DIR) # Ensure it's first for priority

# Force rembg/u2net to use our local models directory
os.environ["U2NET_HOME"] = LOCAL_MODEL_DIR

def install_rembg():
    print(f"\n[Info] The 'rembg' library is required for background removal.")
    print(f"[Info] It will be installed LOCALLY into: {LOCAL_LIB_DIR}")
    print(f"[Info] This will NOT affect your system-wide Python packages.\n")
    
    print(f"Installing dependencies to {LOCAL_LIB_DIR}...")
    os.makedirs(LOCAL_LIB_DIR, exist_ok=True)
    
    try:
        # Install rembg and onnxruntime to the target directory
        # We also upgrade pip to ensure compatibility
        subprocess.check_call([
            sys.executable, "-m", "pip", "install", 
            "rembg", "onnxruntime", "pillow",
            "--target", LOCAL_LIB_DIR,
            "--upgrade"
        ])
        print("Installation successful.")
    except subprocess.CalledProcessError as e:
        print(f"Failed to install dependencies: {e}")
        sys.exit(1)

# --- Import Logic ---
try:
    # Try importing first. 
    # If standard import fails, it might be because we just added the path 
    # and site-packages logic needs a refresh or it's just not there.
    import rembg
    from rembg import remove, new_session
except ImportError:
    # If missing, install it
    install_rembg()
    
    # After install, we must re-add to site dir to pick up new info
    site.addsitedir(LOCAL_LIB_DIR)
    import importlib
    importlib.invalidate_caches()
    
    try:
        import rembg
        from rembg import remove, new_session
    except ImportError as e:
        print(f"CRITICAL ERROR: Failed to import 'rembg' even after installation.")
        print(f"Debug Info:")
        print(f"sys.path: {sys.path}")
        print(f"LOCAL_LIB_DIR: {LOCAL_LIB_DIR}")
        print(f"Error: {e}")
        sys.exit(1)

# Standard imports (will be available now)
from PIL import Image
import io

def remove_background(input_path, output_path):
    print(f"Processing: {input_path} -> {output_path}")
    
    if not os.path.exists(input_path):
        print(f"Error: Input file does not exist: {input_path}")
        sys.exit(1)

    # The AI model for background removal (~170MB) will be downloaded to LOCAL_MODEL_DIR
    os.makedirs(LOCAL_MODEL_DIR, exist_ok=True)

    # Load input image
    try:
        with open(input_path, 'rb') as i:
            input_data = i.read()
    except Exception as e:
        print(f"Error reading input file: {e}")
        sys.exit(1)

    # Create session with isnet-general-use (default)
    # The library handles the download if U2NET_HOME is set and we call new_session
    print("Initializing AI session (this may trigger the download to {})...".format(LOCAL_MODEL_DIR))
    try:
        session = new_session("isnet-general-use")
    except Exception as e:
        print(f"Error initializing session: {e}")
        sys.exit(1)

    # Apply background removal with alpha matting
    print("Applying background removal...")
    try:
        output_data = remove(
            input_data,
            session=session,
            alpha_matting=True,
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=10,
            alpha_matting_erode=10
        )
    except Exception as e:
        print(f"Error during removal process: {e}")
        sys.exit(1)

    # Save output
    try:
        with open(output_path, 'wb') as o:
            o.write(output_data)
        print("Background removal complete.")
    except Exception as e:
        print(f"Error writing output file: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python3 remove_background.py <input_path> <output_path>")
        sys.exit(1)
        
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    remove_background(input_file, output_file)
