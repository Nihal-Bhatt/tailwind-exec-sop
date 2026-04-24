const rows = [
  { system: 'customer_id', column: 'Customer Code', status: 'ok' },
  { system: 'forecast_cycle', column: 'FCycle', status: 'ok' },
  { system: 'actual_sales', column: 'Act SO', status: 'warn' },
  { system: 'budget', column: '—', status: 'missing' },
];

export function ColumnMappingTable() {
  return (
    <div className="card">
      <h3 className="card-title">Column mapping</h3>
      <p className="card-sub">System field ↔ uploaded column — save as profile</p>
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>System field</th>
              <th>Uploaded column</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.system}>
                <td>{r.system}</td>
                <td>{r.column}</td>
                <td>
                  <span className={`map-status map-${r.status}`}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="upload-actions">
        <button type="button" className="gfb-btn secondary">
          Download template
        </button>
        <button type="button" className="gfb-btn primary">
          Save mapping profile
        </button>
      </div>
    </div>
  );
}
