import { KpiCard } from '../components/KpiCard.jsx';
import { WaterfallCard } from '../components/WaterfallCard.jsx';
import { PlantUtilizationGrids } from '../components/PlantUtilizationGrids.jsx';
import {
  kpiRibbon,
  waterfallBridge,
  momTrendStrip,
  exceptionsSummary,
  heatmapRca,
} from '../data/mockData.js';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function ExecutiveSummary({ onKpiNavigate }) {
  return (
    <>
      <section className="kpi-ribbon" aria-label="Executive KPI ribbon">
        {kpiRibbon.map((k) => (
          <KpiCard
            key={k.id}
            label={k.label}
            value={k.value}
            unit={k.unit}
            target={k.target}
            variance={k.variance}
            rag={k.rag}
            spark={k.spark}
            onClick={() => onKpiNavigate?.(k.id)}
            sparkColor="var(--color-royal)"
          />
        ))}
      </section>

      <div className="grid-12" style={{ marginTop: '1rem' }}>
        <div className="span-7">
          <WaterfallCard
            title="Sales vs budget — outlook bridge"
            subtitle="Budget → base → upside → risk → net (value %)"
            data={waterfallBridge}
          />
        </div>
        <div className="span-5">
          <div className="card">
            <h3 className="card-title">Top risks &amp; actions</h3>
            <p className="card-sub">Constrained packaging, overdue actions, red decisions</p>
            <ul className="risk-list">
              {exceptionsSummary.map((r, i) => (
                <li key={i} className={`risk-item risk--${r.severity}`}>
                  <span className="risk-title">{r.title}</span>
                  <span className="risk-impact">{r.impact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="span-12">
          <div className="card">
            <h3 className="card-title">Month-to-month trend strip</h3>
            <p className="card-sub">Demand, production, service, inventory indices</p>
            <div className="chart-wrap chart-wrap--tall">
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={momTrendStrip} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                  <XAxis dataKey="month" tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <YAxis domain={[85, 105]} tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--tooltip-bg)',
                      border: '1px solid var(--tooltip-border)',
                      borderRadius: 8,
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="demand" name="Demand" stroke="var(--color-royal)" strokeWidth={2} dot />
                  <Line type="monotone" dataKey="production" name="Production" stroke="var(--color-teal)" strokeWidth={2} dot />
                  <Line type="monotone" dataKey="service" name="Service" stroke="var(--color-orange)" strokeWidth={2} dot />
                  <Line type="monotone" dataKey="inventory" name="Inventory" stroke="var(--color-sky)" strokeWidth={2} dot />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="span-12">
          <PlantUtilizationGrids subtitle="Each plant uses its own packaging hierarchy (SS includes Alutray; SK adds Spout & Twin pouch)" />
        </div>
        <div className="span-12">
          <div className="card">
            <h3 className="card-title">OTIF RCA contribution by plant</h3>
            <p className="card-sub">% of misses — executive families</p>
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Plant</th>
                    <th>Vessel</th>
                    <th>Customer</th>
                    <th>Material</th>
                    <th>Prod./QA</th>
                    <th>WH</th>
                    <th>External</th>
                  </tr>
                </thead>
                <tbody>
                  {heatmapRca.map((row) => (
                    <tr key={row.plant}>
                      <th scope="row">{row.plant}</th>
                      <td>{row.vessel}%</td>
                      <td>{row.customer}%</td>
                      <td>{row.material}%</td>
                      <td>{row.production}%</td>
                      <td>{row.wh}%</td>
                      <td>{row.external}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
