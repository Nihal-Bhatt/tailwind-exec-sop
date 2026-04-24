/** Budget → drivers → net outlook — CSS waterfall for correct step semantics */

export function WaterfallCard({ title, subtitle, data }) {
  const max = Math.max(...data.map((d) => Math.abs(Number(d.value) || 0)), 100);
  return (
    <div className="card waterfall-card">
      <h3 className="card-title">{title}</h3>
      {subtitle ? <p className="card-sub">{subtitle}</p> : null}
      <div className="wf-chart">
        {data.map((d) => {
          const h = Math.min(100, (Math.abs(d.value) / max) * 100);
          let cls = 'wf-bar wf-neutral';
          if (d.type === 'positive') cls = 'wf-bar wf-up';
          if (d.type === 'negative') cls = 'wf-bar wf-down';
          if (d.type === 'start' || d.type === 'total') cls = 'wf-bar wf-total';
          return (
            <div key={d.name} className="wf-col">
              <div className="wf-bar-wrap">
                <div className={cls} style={{ height: `${Math.max(h, 8)}%` }} title={`${d.name}: ${d.value}`} />
              </div>
              <span className="wf-label">{d.name}</span>
              <span className="wf-val">{d.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
