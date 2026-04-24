import { useState } from 'react';
import { ActionTrackerGrid } from '../components/ActionTrackerGrid.jsx';
import { useDashboardData } from '../context/DashboardDataContext.jsx';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const statusData = [
  { name: 'Open', value: 14 },
  { name: 'In progress', value: 22 },
  { name: 'Closed', value: 48 },
];

const COLORS = ['var(--color-orange)', 'var(--color-sky)', 'var(--color-teal)'];

export function ExceptionsActions({ onOpenContext }) {
  const { actions, upsertActionsFromCsvText, addOrUpdateAction } = useDashboardData();
  const [form, setForm] = useState({
    action_id: '',
    issue: '',
    owner: '',
    due: '',
    status: 'Open',
    severity: 'Med',
    forum: '',
  });
  const [formMsg, setFormMsg] = useState('');

  function submitAction(e) {
    e.preventDefault();
    if (!form.issue.trim()) {
      setFormMsg('Issue text is required.');
      return;
    }
    const id = form.action_id.trim() || `ACT-${Date.now()}`;
    addOrUpdateAction({ ...form, action_id: id });
    setFormMsg(`Saved ${id}.`);
    setForm({ action_id: '', issue: '', owner: '', due: '', status: 'Open', severity: 'Med', forum: '' });
  }

  async function onCsv(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const text = await f.text();
    const res = upsertActionsFromCsvText(text, f.name);
    setFormMsg(res.ok ? `Imported ${res.count} row(s) from ${f.name}.` : res.message);
    e.target.value = '';
  }

  return (
    <div className="grid-12">
      <div className="span-6">
        <div className="card">
          <h3 className="card-title">Add / update action</h3>
          <p className="card-sub">Leave Action ID blank to auto-generate. Existing ID updates the row in the grid.</p>
          <form className="action-form" onSubmit={submitAction}>
            <label>
              Action ID
              <input value={form.action_id} onChange={(e) => setForm((s) => ({ ...s, action_id: e.target.value }))} placeholder="e.g. ACT-004" />
            </label>
            <label>
              Issue <span className="req">*</span>
              <textarea required rows={2} value={form.issue} onChange={(e) => setForm((s) => ({ ...s, issue: e.target.value }))} />
            </label>
            <div className="action-form-row">
              <label>
                Owner
                <input value={form.owner} onChange={(e) => setForm((s) => ({ ...s, owner: e.target.value }))} />
              </label>
              <label>
                Due
                <input type="date" value={form.due} onChange={(e) => setForm((s) => ({ ...s, due: e.target.value }))} />
              </label>
            </div>
            <div className="action-form-row">
              <label>
                Status
                <select value={form.status} onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}>
                  <option>Open</option>
                  <option>In progress</option>
                  <option>Overdue</option>
                  <option>Closed</option>
                </select>
              </label>
              <label>
                Severity
                <select value={form.severity} onChange={(e) => setForm((s) => ({ ...s, severity: e.target.value }))}>
                  <option>Low</option>
                  <option>Med</option>
                  <option>High</option>
                </select>
              </label>
            </div>
            <label>
              Forum
              <input value={form.forum} onChange={(e) => setForm((s) => ({ ...s, forum: e.target.value }))} placeholder="Pre-S&OP, Demand Review…" />
            </label>
            <div className="action-form-actions">
              <button type="submit" className="gfb-btn primary">
                Save action
              </button>
            </div>
          </form>
          {formMsg ? <p className="upload-msg">{formMsg}</p> : null}
        </div>
        <div className="card" style={{ marginTop: '1rem' }}>
          <h3 className="card-title">Upload actions CSV</h3>
          <p className="card-sub">Same schema as template_actions_tracker.csv</p>
          <label className="upload-file-label">
            <span className="gfb-btn secondary">Choose file</span>
            <input type="file" accept=".csv,.txt" className="sr-only" onChange={onCsv} />
          </label>
        </div>
      </div>
      <div className="span-6">
        <div className="card">
          <h3 className="card-title">Status mix</h3>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={72} paddingAngle={2}>
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card" style={{ marginTop: '1rem' }}>
          <h3 className="card-title">Overdue &amp; escalation summary</h3>
          <p className="card-sub">Counts refresh when wired to the same store as KPIs.</p>
          <div className="stat-row">
            <div className="stat-pill stat-pill--red">Overdue: 12</div>
            <div className="stat-pill stat-pill--gold">Due 7d: 8</div>
            <div className="stat-pill stat-pill--teal">On track: 64</div>
          </div>
        </div>
      </div>
      <div className="span-12">
        <ActionTrackerGrid rows={actions} onRowClick={(row) => onOpenContext?.(row)} />
      </div>
    </div>
  );
}
