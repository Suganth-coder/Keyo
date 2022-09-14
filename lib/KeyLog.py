import keyboard as key
from threading import Thread

class WatchKey(Thread):
    def __init__(self):
        Thread.__init__(self)
        
    def run(self):
        self.k = KeyLog()
        self.k.record_keys()
    
    
class KeyLog:
    
    def __init__(self):
        pass
    
    def press_key(self,key_comb):
        key.press_and_release(key_comb)
        
    def record_keys(self):
        
        print("*** KeyLogging Has Been Started ***")
        recorded = key.record(until='esc')
        print("*** KeyLogging Has Been Ended ***")
        
        key.play(recorded, speed_factor=2)
        
    
    