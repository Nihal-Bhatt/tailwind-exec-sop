/** Simple SVG sparkline — values 0–100 scale auto-normalized */

export function TrendSparkline({ values, color = 'var(--color-royal)' }) {
  if (!values?.length) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = 2;
  const w = 72;
  const h = 22;
  const range = max - min || 1;
  const pts = values.map((v, i) => {
    const x = pad + (i / (values.length - 1 || 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  });
  return (
    <svg className="trend-sparkline" width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden>
      <polyline fill="none" stroke={color} strokeWidth="1.5" points={pts.join(' ')} strokeLinecap="round" />
    </svg>
  );
}
