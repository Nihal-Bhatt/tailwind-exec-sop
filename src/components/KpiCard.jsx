import { TrendSparkline } from './TrendSparkline.jsx';

const ragClass = { green: 'rag-green', amber: 'rag-amber', red: 'rag-red' };

export function KpiCard({
  label,
  value,
  unit,
  target,
  variance,
  rag,
  spark,
  onClick,
  sparkColor,
}) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      className={`kpi-card card ${onClick ? 'kpi-card--click' : ''}`}
      onClick={onClick}
    >
      <div className="kpi-card-head">
        <span className="kpi-label">{label}</span>
        <span className={`kpi-rag ${ragClass[rag] || ''}`} title={`Status: ${rag}`}>
          <span className="sr-only">{rag}</span>
        </span>
      </div>
      <div className="kpi-value-row">
        <span className="kpi-value">
          {value}
          {unit ? <span className="kpi-unit">{unit}</span> : null}
        </span>
        <TrendSparkline values={spark} color={sparkColor} />
      </div>
      <div className="kpi-meta">
        <span>Target {target}</span>
        <span className="kpi-var">{variance}</span>
      </div>
    </Tag>
  );
}
