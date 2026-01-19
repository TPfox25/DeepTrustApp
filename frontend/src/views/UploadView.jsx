import { useState } from "react";
import VerdictBadge from "../components/VerdictBadge";
import TrustGauge from "../components/TrustGauge";
import ScoreBar from "../components/ScoreBar";

export default function UploadView() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-12 p-6 rounded-xl border border-slate-700 bg-slate-900/60 backdrop-blur-xl text-white">
      <h2 className="text-xl font-semibold text-center mb-4">Upload Video / Image</h2>

      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
  <div className="mt-6 p-4 rounded-lg bg-slate-800 border border-slate-700 space-y-4">
    {/* Top Row */}
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold">Analysis Results</h3>
      <VerdictBadge verdict={result.verdict} />
    </div>

    {/* Gauge */}
    <div className="flex justify-center">
      <TrustGauge score={result.trustScore} />
    </div>

    {/* Breakdown */}
    <div className="space-y-3">
      <ScoreBar label="Face Analysis" value={result.faceScore} />
      <ScoreBar label="Motion Analysis" value={result.motionScore} />
      {!result.type.startsWith("image") && (
        <ScoreBar label="Audio Analysis" value={result.audioScore} />
      )}
    </div>

    {/* Details */}
    <p className="text-sm text-slate-400 mt-3">{result.details}</p>
  </div>
)}
    </div>
  );
}
