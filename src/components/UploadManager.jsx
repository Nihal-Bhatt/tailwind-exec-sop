export function UploadManager() {
  return (
    <div className="card upload-card">
      <h3 className="card-title">Upload workbooks</h3>
      <p className="card-sub">Drag-and-drop or browse — multiple sheets supported (demo: UI only)</p>
      <div className="upload-dropzone" role="button" tabIndex={0}>
        <p>Drop Excel files here or click to browse</p>
        <span className="upload-hint">Required tabs validated on upload</span>
      </div>
      <ul className="upload-list">
        <li>
          <strong>Demand_Fact.xlsx</strong> — staged · 2026-02-19
        </li>
        <li>
          <strong>Logistics_OTIF.xlsx</strong> — mapped · 2026-02-18
        </li>
      </ul>
    </div>
  );
}
