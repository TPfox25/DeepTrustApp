import { useState, useRef } from "react";
import { Upload } from "lucide-react";

export default function UploadView() {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleOpenPicker = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    // Validate basic formats for MVP
    const valid = ["image", "video"];
    if (!valid.some(type => selected.type.startsWith(type))) {
      alert("Unsupported file type. Please upload an image or video.");
      return;
    }

    setFile(selected);

    // Preview for images/videos
    const url = URL.createObjectURL(selected);
    setPreviewURL(url);
  };

  const handleAnalyze = () => {
    if (!file) return;
    alert(`Ready to send "${file.name}" to backend for analysis!`);
  };

  return (
    <div className="flex flex-col items-center text-center space-y-4">

      {/* Title */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Upload Deepfake Detection</h2>
        <p className="text-slate-400">Upload images or videos to analyze authenticity.</p>
      </div>

      {/* Upload Box */}
      <div
        onClick={handleOpenPicker}
        className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-xl p-6 w-full max-w-xl bg-slate-900/60 hover:bg-slate-900/80 transition"
      >
        <Upload className="w-8 h-8 text-cyan-400 mb-3" />
        <p className="text-sm text-slate-400">Click to upload or drag & drop</p>
      </div>

      {/* Hidden Input */}
      <input
        ref={inputRef}
        type="file"
        accept="video/*,image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Preview */}
      {previewURL && (
        <div className="w-full max-w-xl space-y-3">
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-black">
            {file.type.startsWith("image") ? (
              <img src={previewURL} alt="preview" className="w-full object-cover" />
            ) : (
              <video src={previewURL} controls className="w-full object-cover" />
            )}
          </div>

          <p className="text-sm text-slate-400">
            <span className="font-semibold text-white">{file.name}</span> — {(file.size / 1024 / 1024).toFixed(2)}MB
          </p>

          <button
            onClick={handleAnalyze}
            className="bg-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-500 transition"
          >
            Analyze
          </button>
        </div>
      )}
    </div>
  );
}
