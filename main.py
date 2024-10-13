from fastapi import FastAPI
from Detector import *
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


@app.get("/detect_keylogger")
async def keylogger_status():
    result = detect_keylogger()
    
    if result:
        return {"is_keylogging": True, "pid": result['pid'], "process_name": result['name']}
    else:
        return {"is_keylogging": False}

if __name__ == "__main__":
    uvicorn.run("main:app", host='0.0.0.0', port=8080, reload=True)


