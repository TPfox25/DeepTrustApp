from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uuid

app = FastAPI()

# Allow local frontend during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later we restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_file(file: UploadFile = File(...)):
    # Generate dummy scores (placeholder for AI)
    fake_result = {
        "id": str(uuid.uuid4()),
        "fileName": file.filename,
        "type": "image" if file.content_type.startswith("image") else "video",
        "faceScore": 78,
        "motionScore": 82,
        "audioScore": 0 if file.content_type.startswith("image") else 76,
        "trustScore": 81,
        "verdict": "likely_authentic",
        "details": "No significant deepfake artifacts detected."
    }

    return fake_result
