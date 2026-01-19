import { useRef, useState } from "react";
import { Camera, Square } from "lucide-react";

export default function LiveView() {
  const videoRef = useRef(null);
  const [active, setActive] = useState(false);

  const handleStart = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setActive(true);
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      alert("Camera not accessible. Check permissions.");
    }
  };

  const handleStop = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setActive(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-5">

      {/* Title */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-semibold">Live Deepfake Detection</h2>
        <p className="text-slate-400">
          Use your camera to check if you're being viewed through a deepfake filter in real-time.
        </p>
      </div>

      {/* Video Container */}
      <div className="relative w-full max-w-xl rounded-xl overflow-hidden border border-slate-800 bg-black">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-[350px] object-cover"
        />
        
        {!active && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-slate-300 text-sm">
            Camera feed inactive
          </div>
        )}
      </div>

      {/* Controls */}
      {!active ? (
        <button
          onClick={handleStart}
          className="flex items-center gap-2 bg-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-500 transition"
        >
          <Camera className="w-4 h-4" /> Start Camera
        </button>
      ) : (
        <button
          onClick={handleStop}
          className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500 transition"
        >
          <Square className="w-4 h-4" /> Stop Camera
        </button>
      )}

    </div>
  );
}
