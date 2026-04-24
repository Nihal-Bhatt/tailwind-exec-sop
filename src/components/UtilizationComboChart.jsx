import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const sample = [
  { pkg: 'Can', plan: 100, cap: 105, actual: 102, util: 97 },
  { pkg: 'Pouch', plan: 88, cap: 95, actual: 86, util: 91 },
  { pkg: 'Cup', plan: 72, cap: 80, actual: 70, util: 88 },
  { pkg: 'Sachet', plan: 65, cap: 78, actual: 62, util: 79 },
];

export function UtilizationComboChart({ title, subtitle, data = sample }) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      {subtitle ? <p className="card-sub">{subtitle}</p> : null}
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
            <XAxis dataKey="pkg" tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} axisLine={false} />
            <YAxis yAxisId="vol" tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} axisLine={false} />
            <YAxis
              yAxisId="pct"
              orientation="right"
              domain={[60, 110]}
              tick={{ fill: 'var(--chart-axis)', fontSize: 11 }}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--tooltip-bg)',
                border: '1px solid var(--tooltip-border)',
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Legend />
            <Bar yAxisId="vol" dataKey="plan" name="Plan" stackId="a" fill="var(--color-sky-light)" />
            <Bar yAxisId="vol" dataKey="actual" name="Actual" stackId="b" fill="var(--color-teal)" />
            <Line
              yAxisId="pct"
              type="monotone"
              dataKey="util"
              name="Utilization %"
              stroke="var(--color-royal)"
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
