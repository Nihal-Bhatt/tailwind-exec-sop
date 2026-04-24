import { UploadManager } from '../components/UploadManager.jsx';
import { ColumnMappingTable } from '../components/ColumnMappingTable.jsx';
import { ThemeToggle } from '../components/ThemeToggle.jsx';
import { DemoModeToggle } from '../components/DemoModeToggle.jsx';
import { uploadAudit } from '../data/mockData.js';

export function DataUploadAdmin({ theme, onThemeToggle, demo, onDemo }) {
  return (
    <div className="grid-12">
      <div className="span-6">
        <UploadManager />
      </div>
      <div className="span-6">
        <div className="card">
          <h3 className="card-title">Theme &amp; demo (admin preview)</h3>
          <p className="card-sub">Mirrors header toggles — persist preference locally in live app</p>
          <div className="admin-toggles">
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            <DemoModeToggle demo={demo} onChange={onDemo} />
          </div>
        </div>
        <div className="card" style={{ marginTop: '1rem' }}>
          <h3 className="card-title">Data quality summary</h3>
          <p className="card-sub">Missing keys: 0 · Unclassified RCA: 3 · Late arrivals: 1 (mock)</p>
          <div className="dq-banners">
            <div className="dq-banner dq-warn">3 RCA codes need mapping to executive families</div>
          </div>
        </div>
      </div>
      <div className="span-12">
        <ColumnMappingTable />
      </div>
      <div className="span-12">
        <div className="card">
          <h3 className="card-title">Last refresh audit</h3>
          <ul className="audit-list">
            {uploadAudit.map((a, i) => (
              <li key={i}>
                <time>{a.time}</time> — <strong>{a.user}</strong>: {a.action}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
