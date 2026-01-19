import { Shield } from "lucide-react";

export default function Header() {
  return (
    <header className="text-center pt-10 pb-6 space-y-2">
      <div className="flex justify-center">
        <Shield className="w-10 h-10 text-cyan-400" />
      </div>
      <h1 className="text-4xl font-bold">
        Deep<span className="text-cyan-400">Trust</span>
      </h1>
      <p className="text-slate-400 max-w-xl mx-auto">
        Real-time deepfake detection powered by advanced AI. Verify the authenticity of video content instantly.
      </p>
    </header>
  );
}
