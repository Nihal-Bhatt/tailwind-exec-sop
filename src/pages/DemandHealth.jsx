import { useState } from 'react';
import { KpiCard } from '../components/KpiCard.jsx';
import { WaterfallCard } from '../components/WaterfallCard.jsx';
import { DrilldownDrawer } from '../components/DrilldownDrawer.jsx';
import { ExceptionTable } from '../components/ExceptionTable.jsx';
import { waterfallBridge, fcaTrend, biasByCustomer } from '../data/mockData.js';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  ReferenceLine,
} from 'recharts';

const excRows = [
  { id: 1, customer: 'Customer D', issue: 'Under-forecast', fca: '81%', owner: 'CE West' },
  { id: 2, customer: 'Customer H', issue: 'High volatility', fca: '76%', owner: 'CE North' },
];

const excCols = [
  { key: 'customer', label: 'Customer' },
  { key: 'issue', label: 'Issue' },
  { key: 'fca', label: 'FCA' },
  { key: 'owner', label: 'CE manager' },
];

export function DemandHealth() {
  const [drawer, setDrawer] = useState(null);

  return (
    <>
      <div className="kpi-ribbon kpi-ribbon--compact">
        <KpiCard
          label="Forecast Accuracy (FCA)"
          value="94.2"
          unit="%"
          target="92%"
          variance="+2.2 pts"
          rag="green"
          spark={[88, 90, 91, 89, 92, 93, 94.2]}
        />
        <KpiCard
          label="Forecast Bias"
          value="+1.8"
          unit="%"
          target="±2%"
          variance="neutral band"
          rag="amber"
          spark={[3, 2.5, 2, 1.5, 2.2, 2, 1.8]}
        />
        <KpiCard
          label="Sales vs Budget"
          value="102.4"
          unit="%"
          target="100%"
          variance="+2.4%"
          rag="green"
          spark={[98, 99, 100, 101, 101.5, 102, 102.4]}
        />
      </div>

      <div className="grid-12" style={{ marginTop: '1rem' }}>
        <div className="span-6">
          <div className="card">
            <h3 className="card-title">FCA trend — forecast cycle</h3>
            <p className="card-sub">Total portfolio vs NPD segment</p>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={fcaTrend} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                  <XAxis dataKey="period" tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <YAxis domain={[80, 100]} tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)' }} />
                  <Legend />
                  <Line type="monotone" dataKey="total" name="Total" stroke="var(--color-royal)" strokeWidth={2} />
                  <Line type="monotone" dataKey="npd" name="NPD" stroke="var(--color-teal)" strokeWidth={2} strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="span-6">
          <div className="card">
            <h3 className="card-title">Forecast bias — diverging bar</h3>
            <p className="card-sub">Positive = over-forecast · click row for drawer</p>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={biasByCustomer} layout="vertical" margin={{ top: 8, right: 12, left: 72, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" horizontal={false} />
                  <XAxis type="number" domain={[-6, 6]} tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="name" tick={{ fill: 'var(--chart-axis)', fontSize: 10 }} width={68} />
                  <Tooltip contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)' }} />
                  <ReferenceLine x={0} stroke="var(--color-gray-mid)" strokeDasharray="4 4" />
                  <Bar dataKey="bias" radius={[0, 4, 4, 0]}>
                    {biasByCustomer.map((e) => (
                      <Cell key={e.name} fill={e.bias >= 0 ? 'var(--color-teal)' : 'var(--color-orange)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="chart-hint">Zero line: under-forecast (orange) vs over-forecast (teal)</p>
          </div>
        </div>

        <div className="span-8">
          <WaterfallCard title="Demand outlook bridge" subtitle="Same logic as executive — value / volume toggle in live build" data={waterfallBridge} />
        </div>
        <div className="span-4">
          <ExceptionTable
            title="Critical under-forecast customers"
            subtitle="Sortable · export-ready"
            columns={excCols}
            rows={excRows}
            onRowClick={(row) => setDrawer(row.customer)}
          />
        </div>
      </div>

      <DrilldownDrawer open={!!drawer} title={drawer ? `Customer: ${drawer}` : 'Detail'} onClose={() => setDrawer(null)}>
        <p className="drawer-p">Prior cycle forecast vs current forecast vs actuals (mock).</p>
        <ul className="drawer-list">
          <li>Recommended action: Validate demand with CE · hold promo assumptions</li>
          <li>Bias 3M trend: improving vs prior quarter</li>
        </ul>
      </DrilldownDrawer>
    </>
  );
}
