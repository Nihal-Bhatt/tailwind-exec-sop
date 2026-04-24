import { ThemeToggle } from './ThemeToggle.jsx';
import { DemoModeToggle } from './DemoModeToggle.jsx';

const PERIODS = ['Month', 'Quarter', 'YTD', 'Rolling 3M', 'Rolling 12M', 'YoY'];

export function GlobalFilterBar({
  period,
  onPeriod,
  plant,
  onPlant,
  packaging,
  onPackaging,
  lastRefresh,
  theme,
  onThemeToggle,
  demo,
  onDemo,
  onReset,
  onExport,
  activeBreadcrumb,
}) {
  return (
    <div className="global-filter-bar card">
      <div className="gfb-row gfb-row--top">
        <div className="gfb-period">
          <span className="gfb-label">Period</span>
          <div className="gfb-chips">
            {PERIODS.map((p) => (
              <button
                key={p}
                type="button"
                className={`gfb-chip ${period === p ? 'active' : ''}`}
                onClick={() => onPeriod(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="gfb-meta">
          <span className="gfb-refresh">Last refresh: {lastRefresh}</span>
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          <DemoModeToggle demo={demo} onChange={onDemo} />
        </div>
      </div>
      <div className="gfb-row gfb-row--filters">
        <label className="gfb-field">
          <span className="gfb-label">Plant</span>
          <select value={plant} onChange={(e) => onPlant(e.target.value)} className="gfb-select">
            <option value="all">All (SS + SK)</option>
            <option value="ss">SS only</option>
            <option value="sk">SK only</option>
          </select>
        </label>
        <label className="gfb-field">
          <span className="gfb-label">Packaging</span>
          <select value={packaging} onChange={(e) => onPackaging(e.target.value)} className="gfb-select">
            <option value="all">All families</option>
            <option value="can">Can</option>
            <option value="pouch">Pouch</option>
            <option value="cup">Cup</option>
          </select>
        </label>
        <div className="gfb-actions">
          <button type="button" className="gfb-btn secondary" onClick={onReset}>
            Reset filters
          </button>
          <button type="button" className="gfb-btn primary" onClick={onExport}>
            Export view
          </button>
        </div>
      </div>
      {activeBreadcrumb ? <div className="filter-breadcrumb">{activeBreadcrumb}</div> : null}
    </div>
  );
}
