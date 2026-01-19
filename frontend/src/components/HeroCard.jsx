import { Camera } from "lucide-react";

export default function HeroCard({ children }) {
  return (
    <div className="mt-10 mx-auto max-w-3xl p-8 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md text-center space-y-4">
      <div className="flex justify-center">
        <Camera className="w-12 h-12 text-cyan-400" />
      </div>
      {children}
    </div>
  );
}
