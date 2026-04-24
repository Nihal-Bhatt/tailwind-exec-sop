import { KpiCard } from '../components/KpiCard.jsx';
import { supplierOtif, rmDioTrend, slobAging } from '../data/mockData.js';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

export function InventorySupplier() {
  return (
    <>
      <div className="kpi-ribbon kpi-ribbon--compact">
        <KpiCard
          label="Supplier OTIF"
          value="88.7"
          unit="%"
          target="90%"
          variance="-1.3 pts"
          rag="amber"
          spark={[90, 89.8, 89.5, 89.2, 89, 88.8, 88.7]}
        />
        <KpiCard
          label="RM DIO"
          value="42"
          unit="days"
          target="45"
          variance="-3 days"
          rag="green"
          spark={[48, 47, 46, 45, 44, 43, 42]}
        />
        <KpiCard
          label="SLOB / aged %"
          value="8"
          unit="%"
          target="6%"
          variance="+2 pts"
          rag="amber"
          spark={[6, 6.2, 6.5, 7, 7.5, 7.8, 8]}
        />
      </div>
      <div className="grid-12" style={{ marginTop: '1rem' }}>
        <div className="span-6">
          <div className="card">
            <h3 className="card-title">Supplier OTIF — ranked</h3>
            <p className="card-sub">Current month mock</p>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={supplierOtif} layout="vertical" margin={{ top: 8, right: 12, left: 96, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" horizontal={false} />
                  <XAxis type="number" domain={[80, 100]} tickFormatter={(v) => `${v}%`} tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" width={92} tick={{ fill: 'var(--chart-axis)', fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)' }} />
                  <Bar dataKey="v" fill="var(--color-teal)" name="OTIF %" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="span-6">
          <div className="card">
            <h3 className="card-title">RM DIO trend</h3>
            <p className="card-sub">Days — tie to shortage incidents in live build</p>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={rmDioTrend} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                  <XAxis dataKey="m" tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <YAxis tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)' }} />
                  <Line type="monotone" dataKey="dio" name="DIO" stroke="var(--color-royal)" strokeWidth={2} dot />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="span-12">
          <div className="card">
            <h3 className="card-title">SLOB / aging — stacked buckets</h3>
            <p className="card-sub">% of inventory value by age band</p>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={slobAging} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                  <XAxis dataKey="bucket" tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <YAxis tickFormatter={(v) => `${v}%`} tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)' }} />
                  <Bar dataKey="val" fill="var(--color-gold)" name="Share %" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
