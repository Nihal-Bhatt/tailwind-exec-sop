import { PlantUtilizationGrids } from '../components/PlantUtilizationGrids.jsx';
import { UtilizationComboChart } from '../components/UtilizationComboChart.jsx';
import { productionAdherence } from '../data/mockData.js';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function ProductionCapacity() {
  return (
    <div className="grid-12">
      <div className="span-6">
        <div className="card">
          <h3 className="card-title">Production plan adherence</h3>
          <p className="card-sub">Plant SS vs SK — monthly %</p>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productionAdherence} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                <YAxis domain={[90, 100]} tickFormatter={(v) => `${v}%`} tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)' }} />
                <Legend />
                <Bar dataKey="SS" fill="var(--color-royal)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="SK" fill="var(--color-teal)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="span-6">
        <UtilizationComboChart
          title="Capacity vs plan vs actual"
          subtitle="By packaging family — utilization line (right axis)"
        />
      </div>
      <div className="span-12">
        <PlantUtilizationGrids subtitle="RAG: &gt;100% red · 90–100% amber · &lt;80% underutilized — separate matrices per plant" />
      </div>
    </div>
  );
}
