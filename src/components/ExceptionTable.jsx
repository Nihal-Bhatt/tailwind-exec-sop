export function ExceptionTable({ title, subtitle, columns, rows, onRowClick }) {
  return (
    <div className="card exception-table-card">
      <div className="et-head">
        <div>
          <h3 className="card-title">{title}</h3>
          {subtitle ? <p className="card-sub">{subtitle}</p> : null}
        </div>
        <button type="button" className="gfb-btn secondary small">
          Export CSV
        </button>
      </div>
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.action_id ?? row.id ?? row.issue}
                className={onRowClick ? 'clickable' : ''}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((c) => (
                  <td key={c.key}>
                    {c.badge ? (
                      <span
                        className={`badge badge--${String(row[c.key])
                          .replace(/\s+/g, '-')
                          .replace(/[^a-zA-Z0-9-]/g, '')
                          .toLowerCase()}`}
                      >
                        {row[c.key]}
                      </span>
                    ) : (
                      row[c.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
