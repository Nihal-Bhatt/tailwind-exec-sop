import { ActionTrackerGrid } from '../components/ActionTrackerGrid.jsx';
import { actionRows } from '../data/mockData.js';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const statusData = [
  { name: 'Open', value: 14 },
  { name: 'In progress', value: 22 },
  { name: 'Closed', value: 48 },
];

const COLORS = ['var(--color-orange)', 'var(--color-sky)', 'var(--color-teal)'];

export function ExceptionsActions({ onOpenContext }) {
  return (
    <div className="grid-12">
      <div className="span-4">
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
      </div>
      <div className="span-8">
        <div className="card">
          <h3 className="card-title">Overdue &amp; escalation summary</h3>
          <p className="card-sub">12 overdue · 5 exec escalations (mock)</p>
          <div className="stat-row">
            <div className="stat-pill stat-pill--red">Overdue: 12</div>
            <div className="stat-pill stat-pill--gold">Due 7d: 8</div>
            <div className="stat-pill stat-pill--teal">On track: 64</div>
          </div>
        </div>
      </div>
      <div className="span-12">
        <ActionTrackerGrid rows={actionRows} onRowClick={(row) => onOpenContext?.(row)} />
      </div>
    </div>
  );
}
