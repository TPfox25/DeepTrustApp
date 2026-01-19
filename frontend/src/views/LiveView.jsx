/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";

export default function LiveView() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });
      videoRef.current.srcObject = stream;
      setActive(true);
    } catch (err) {
      alert("Camera access denied");
    }
  };

  const stopCamera = () => {
    const tracks = videoRef.current?.srcObject?.getTracks();
    tracks?.forEach(track => track.stop());
    videoRef.current.srcObject = null;
    setActive(false);
  };

  const captureAndAnalyze = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      setLoading(true);
      setResult(null);

      const formData = new FormData();
      formData.append("file", blob, "frame.jpg");

      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
      setLoading(false);
    }, "image/jpeg", 0.9);
  };

  return (
    <div className="flex flex-col items-center text-center space-y-4 w-full">
      
      {/* VIDEO FEED */}
      <div className="relative border border-slate-700 rounded-lg overflow-hidden w-full max-w-xl bg-black">
        <video ref={videoRef} autoPlay playsInline className="w-full h-[350px] object-cover" />
        {!active && <div className="absolute inset-0 flex items-center justify-center text-slate-400">Camera Off</div>}
      </div>

      {/* ACTION BUTTONS */}
      {!active ? (
        <button onClick={startCamera} className="px-4 py-2 bg-cyan-600 rounded-lg">Start Camera</button>
      ) : (
        <div className="flex gap-3">
          <button onClick={stopCamera} className="px-4 py-2 bg-red-600 rounded-lg">Stop</button>
          <button onClick={captureAndAnalyze} disabled={loading} className="px-4 py-2 bg-blue-600 rounded-lg">
            {loading ? "Analyzing..." : "Capture & Analyze"}
          </button>
        </div>
      )}

      {/* HIDDEN CANVAS */}
      <canvas ref={canvasRef} className="hidden"></canvas>

      {/* RESULTS */}
      {result && (
        <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 w-full max-w-xl text-left">
          <p className="font-semibold">Trust Score: {result.trustScore}%</p>
          <p>Verdict: {result.verdict}</p>
          <p className="text-slate-400 text-sm mt-2">{result.details}</p>
        </div>
      )}
    </div>
  );
}
