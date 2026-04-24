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

export function RcaParetoChart({ title, subtitle, data }) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      {subtitle ? <p className="card-sub">{subtitle}</p> : null}
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
            <XAxis dataKey="family" tick={{ fill: 'var(--chart-axis)', fontSize: 10 }} axisLine={false} />
            <YAxis yAxisId="left" tick={{ fill: 'var(--chart-axis)', fontSize: 11 }} axisLine={false} />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 100]}
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
            <Bar yAxisId="left" dataKey="misses" name="Misses" fill="var(--color-royal)" radius={[4, 4, 0, 0]} />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="pct"
              name="Cumulative %"
              stroke="var(--color-orange)"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
