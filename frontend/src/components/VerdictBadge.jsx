export default function VerdictBadge({ verdict }) {
  let color = "bg-yellow-600";
  let text = "Suspicious";

  if (verdict === "likely_authentic") {
    color = "bg-green-600";
    text = "Likely Authentic";
  }

  if (verdict === "likely_fake") {
    color = "bg-red-600";
    text = "Likely Fake";
  }

  return (
    <span className={`${color} text-white px-3 py-1 rounded-full text-sm`}>
      {text}
    </span>
  );
}
