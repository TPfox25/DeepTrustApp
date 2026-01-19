from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    # Save file temporarily (not required for ML, just placeholder)
    with open(f"temp_{file.filename}", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # MOCK result — this will be replaced with real ML later
    trust_score = random.randint(20, 99)

    if trust_score >= 75:
        verdict = "likely_authentic"
    elif trust_score >= 40:
        verdict = "suspicious"
    else:
        verdict = "likely_fake"

    return {
        "trustScore": trust_score,
        "verdict": verdict,
        "faceScore": random.randint(30, 95),
        "motionScore": random.randint(30, 95),
        "audioScore": random.randint(30, 95),
        "details": "This is a mock inference. Real model results coming soon.",
        "type": file.content_type
    }
