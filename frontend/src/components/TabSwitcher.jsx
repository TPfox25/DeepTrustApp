import { Upload, Video } from "lucide-react";

export default function TabSwitcher({ active, setActive }) {
  return (
    <div className="flex justify-center gap-2 mt-6">
      <button
        onClick={() => setActive("upload")}
        className={`px-4 py-2 rounded-lg flex items-center gap-2 border transition ${
          active === "upload" 
            ? "bg-cyan-600 border-cyan-600 text-white" 
            : "bg-slate-800 border-slate-700 text-slate-300"
        }`}
      >
        <Upload className="w-4 h-4" /> Upload Video
      </button>

      <button
        onClick={() => setActive("live")}
        className={`px-4 py-2 rounded-lg flex items-center gap-2 border transition ${
          active === "live"
            ? "bg-cyan-600 border-cyan-600 text-white"
            : "bg-slate-800 border-slate-700 text-slate-300"
        }`}
      >
        <Video className="w-4 h-4" /> Live Camera
      </button>
    </div>
  );
}
