/** Plant × packaging style matrix with RAG-style cell coloring */

function cellClass(v) {
  if (v > 100) return 'hm-red';
  if (v >= 90) return 'hm-amber';
  if (v < 80) return 'hm-blue';
  return 'hm-green';
}

export function HeatmapMatrix({ title, subtitle, rows, cols, values }) {
  return (
    <div className="card heatmap-card">
      <h3 className="card-title">{title}</h3>
      {subtitle ? <p className="card-sub">{subtitle}</p> : null}
      <div className="hm-table-wrap">
        <table className="hm-table">
          <thead>
            <tr>
              <th className="hm-corner" />
              {cols.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={r}>
                <th scope="row">{r}</th>
                {cols.map((_, ci) => {
                  const v = values[ri]?.[ci] ?? 0;
                  return (
                    <td key={`${ri}-${ci}`}>
                      <span className={`hm-cell ${cellClass(v)}`} title={`${v}% utilization`}>
                        {v}%
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="hm-legend">
        <span>
          <i className="hm-dot hm-green" /> 80–90%
        </span>
        <span>
          <i className="hm-dot hm-amber" /> 90–100%
        </span>
        <span>
          <i className="hm-dot hm-red" /> &gt;100%
        </span>
        <span>
          <i className="hm-dot hm-blue" /> &lt;80%
        </span>
      </div>
    </div>
  );
}
