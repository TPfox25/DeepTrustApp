export default function ScoreBar({ label, value }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm text-slate-300">{label}</span>
        <span className="text-sm font-semibold">{value}%</span>
      </div>

      <div className="w-full bg-slate-800 h-2 rounded">
        <div
          className="h-full bg-cyan-500 rounded transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
