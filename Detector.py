import psutil

def detect_keylogger():
    """
    Detect keyloggers by checking for Python processes using libraries like pynput, which are typical of keyloggers.
    
    Returns:
        dict: A dictionary with process ID and process name if a keylogger is detected.
        bool: False if no keylogger is detected.
    """
    for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
        try:
            # Check if the process is Python-based
            if 'python' in proc.info['name'].lower() or 'python3' in proc.info['name'].lower():
                
                # Check if 'pynput' is present in the command line arguments
                if proc.info['cmdline'] and any('pynput' in arg for arg in proc.info['cmdline']):
                    return {'pid': proc.info['pid'], 'name': proc.info['name']}
                
                # If no 'pynput' but contains a keyword like 'keylogger' (for more general keyloggers)
                if proc.info['cmdline'] and any('keylogger' in arg.lower() for arg in proc.info['cmdline']):
                    return {'pid': proc.info['pid'], 'name': proc.info['name']}
                    
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass
    
    return False

# Example usage
if __name__ == "__main__":
    result = detect_keylogger()
    if result:
        print(f"Keylogger detected: {result}")
    else:
        print("No keylogger detected.")
