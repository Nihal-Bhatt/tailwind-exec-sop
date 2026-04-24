import { useRef, useState } from 'react';
import { ThemeToggle } from '../components/ThemeToggle.jsx';
import { DemoModeToggle } from '../components/DemoModeToggle.jsx';
import { useDashboardData } from '../context/DashboardDataContext.jsx';
import { METRIC_TEMPLATE_GROUPS, downloadMetricTemplate, downloadAllTemplatesZip } from '../utils/csvTemplates.js';

export function DataUploadAdmin({ theme, onThemeToggle, demo, onDemo }) {
  const { upsertActionsFromCsvText, mergeReasonsFromCsvText, recordGenericUpload, auditLog } = useDashboardData();
  const [msg, setMsg] = useState('');
  const genericInputRef = useRef(null);

  function readFile(file) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result || ''));
      r.onerror = reject;
      r.readAsText(file);
    });
  }

  async function onActionsFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const text = await readFile(f);
    const res = upsertActionsFromCsvText(text, f.name);
    setMsg(res.ok ? `Actions: merged ${res.count} row(s) by action_id.` : res.message);
    e.target.value = '';
  }

  async function onReasonsFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const text = await readFile(f);
    const res = mergeReasonsFromCsvText(text, f.name);
    setMsg(res.ok ? `Reason codes: merged ${res.count} row(s).` : res.message);
    e.target.value = '';
  }

  async function onGenericMetric(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    await readFile(f);
    recordGenericUpload(`Staged workbook: ${f.name} (map columns in full integration)`);
    setMsg(`Received ${f.name} — audit logged. Wire sheet → metric store in backend.`);
    e.target.value = '';
  }

  return (
    <div className="grid-12">
      <div className="span-12">
        <div className="card upload-hub-intro">
          <h3 className="card-title">Data upload &amp; templates — all metrics</h3>
          <p className="card-sub">
            Download CSV templates per tab/metric. Upload actions and client reason codes here (same <strong>action_id</strong> or <strong>client_code</strong> updates existing rows). Other
            metric files are staged for audit until a backend mapping is connected.
          </p>
          <div className="upload-hub-actions">
            <button type="button" className="gfb-btn primary" onClick={() => downloadAllTemplatesZip()}>
              Download all templates (serial)
            </button>
            <button type="button" className="gfb-btn secondary" onClick={() => genericInputRef.current?.click()}>
              Upload any metric CSV (audit)
            </button>
            <input ref={genericInputRef} type="file" accept=".csv,.txt" className="sr-only" onChange={onGenericMetric} />
          </div>
          {msg ? <p className="upload-msg">{msg}</p> : null}
        </div>
      </div>

      {METRIC_TEMPLATE_GROUPS.map((group) => (
        <div className="span-12" key={group.tab}>
          <div className="card template-group-card">
            <h3 className="card-title">{group.tab}</h3>
            <ul className="template-list">
              {group.items.map((item) => (
                <li key={item.id} className="template-row">
                  <div>
                    <strong>{item.name}</strong>
                    <span className="template-filename">{item.filename}</span>
                  </div>
                  <button type="button" className="gfb-btn secondary small" onClick={() => downloadMetricTemplate(item)}>
                    Download template
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <div className="span-6">
        <div className="card">
          <h3 className="card-title">Upload — actions tracker</h3>
          <p className="card-sub">Columns must match template. Same <code>action_id</code> replaces that action.</p>
          <label className="upload-file-label">
            <span className="gfb-btn primary">Choose actions CSV</span>
            <input type="file" accept=".csv,.txt" className="sr-only" onChange={onActionsFile} />
          </label>
        </div>
      </div>
      <div className="span-6">
        <div className="card">
          <h3 className="card-title">Upload — client reason codes</h3>
          <p className="card-sub">Feeds the OTIF issue tree. Same <code>client_code</code> updates text / mapping.</p>
          <label className="upload-file-label">
            <span className="gfb-btn primary">Choose reasons CSV</span>
            <input type="file" accept=".csv,.txt" className="sr-only" onChange={onReasonsFile} />
          </label>
        </div>
      </div>

      <div className="span-6">
        <div className="card">
          <h3 className="card-title">Theme &amp; demo</h3>
          <p className="card-sub">Aligned with i-Tail calm executive experience.</p>
          <div className="admin-toggles">
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            <DemoModeToggle demo={demo} onChange={onDemo} />
          </div>
        </div>
      </div>
      <div className="span-6">
        <div className="card">
          <h3 className="card-title">Data quality (preview)</h3>
          <p className="card-sub">After uploads, validate keys, RCA mapping, and duplicates in the full pipeline.</p>
          <div className="dq-banners">
            <div className="dq-banner dq-warn">Generic metric files are audit-only until column mapping is saved per sheet.</div>
          </div>
        </div>
      </div>

      <div className="span-12">
        <div className="card">
          <h3 className="card-title">Upload audit log</h3>
          <ul className="audit-list">
            {auditLog.length === 0 ? <li>No uploads yet this browser.</li> : null}
            {auditLog.map((a, i) => (
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
