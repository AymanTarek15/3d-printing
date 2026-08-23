export default function Rating({ value = 0, outOf = 5 }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const empty = outOf - full - (half ? 1 : 0);
  return (
    <div aria-label={`Rating ${value} out of ${outOf}`} style={{display:"inline-flex", gap:4}}>
      {Array.from({length: full}).map((_,i)=><Star key={`f${i}`} fill />)}
      {half && <Star half />}
      {Array.from({length: empty}).map((_,i)=><Star key={`e${i}`} />)}
    </div>
  );
}
function Star({ fill=false, half=false }) {
  const color = fill || half ? "#f59e0b" : "#d1d5db";
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        {half && (
          <linearGradient id="half">
            <stop offset="50%" stopColor="#f59e0b"/><stop offset="50%" stopColor="#d1d5db"/>
          </linearGradient>
        )}
      </defs>
      <path fill={half ? "url(#half)" : color}
        d="M12 17.3l-6.18 3.25 1.18-6.88-5-4.86 6.9-1 3.1-6.29 3.1 6.29 6.9 1-5 4.86 1.18 6.88z"/>
    </svg>
  );
}
