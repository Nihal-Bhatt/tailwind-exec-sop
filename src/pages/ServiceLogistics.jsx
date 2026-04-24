import { KpiCard } from '../components/KpiCard.jsx';
import { RcaParetoChart } from '../components/RcaParetoChart.jsx';
import { otifTrend, rcaPareto, vesselMisses, logisticsCost } from '../data/mockData.js';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Area,
  AreaChart,
} from 'recharts';

const costStack = logisticsCost.map((row) => ({
  m: row.m,
  total: row.freight + row.wh + row.premium + row.other,
}));

export function ServiceLogistics() {
  return (
    <>
      <div className="kpi-ribbon kpi-ribbon--compact">
        <KpiCard
          label="Customer OTIF"
          value="91.3"
          unit="%"
          target="93%"
          variance="-1.7 pts"
          rag="red"
          spark={[94, 93.5, 93, 92.5, 92, 91.5, 91.3]}
          sparkColor="var(--color-orange)"
        />
        <KpiCard
          label="Missed vessel / cut-off"
          value="6.4"
          unit="%"
          target="4%"
          variance="+2.4 pts"
          rag="amber"
          spark={[4.2, 4.5, 5, 5.5, 5.8, 6.1, 6.4]}
        />
      </div>
      <div className="grid-12" style={{ marginTop: '1rem' }}>
        <div className="span-5">
          <div className="card">
            <h3 className="card-title">OTIF trend</h3>
            <p className="card-sub">Monthly % — numerator/denominator in tooltip (live)</p>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={otifTrend} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                  <XAxis dataKey="m" tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <YAxis domain={[88, 95]} tickFormatter={(v) => `${v}%`} tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)' }} />
                  <Line type="monotone" dataKey="otif" name="OTIF %" stroke="var(--color-royal)" strokeWidth={2} dot />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="span-7">
          <RcaParetoChart title="OTIF RCA Pareto" subtitle="Miss count vs cumulative % — executive families" data={rcaPareto} />
        </div>
        <div className="span-6">
          <div className="card">
            <h3 className="card-title">% shipments missing vessel / cut-off</h3>
            <p className="card-sub">Leading indicator for delay-related OTIF</p>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={vesselMisses} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <YAxis tickFormatter={(v) => `${v}%`} tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)' }} />
                  <Bar dataKey="pct" fill="var(--color-gold)" name="%" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="span-6">
          <div className="card">
            <h3 className="card-title">Logistics cost % sales — composition</h3>
            <p className="card-sub">Freight, WH, premium, other</p>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={logisticsCost} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                  <XAxis dataKey="m" tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <YAxis tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)' }} />
                  <Area type="monotone" dataKey="freight" stackId="1" stroke="var(--color-royal)" fill="var(--color-royal-light)" name="Freight" />
                  <Area type="monotone" dataKey="wh" stackId="1" stroke="var(--color-teal)" fill="var(--color-teal-light)" name="WH" />
                  <Area type="monotone" dataKey="premium" stackId="1" stroke="var(--color-orange)" fill="var(--color-orange-light)" name="Premium" />
                  <Area type="monotone" dataKey="other" stackId="1" stroke="var(--color-sky)" fill="var(--color-sky-light)" name="Other" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="card-sub">Total trend: {costStack.at(-1)?.total.toFixed(2)}% (Feb)</p>
          </div>
        </div>
      </div>
    </>
  );
}
