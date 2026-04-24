import { useEffect, useMemo, useState } from 'react';
import { packagingFilterOptions } from './data/plantHierarchy.js';
import { GlobalFilterBar } from './components/GlobalFilterBar.jsx';
import { ExecutiveSummary } from './pages/ExecutiveSummary.jsx';
import { DemandHealth } from './pages/DemandHealth.jsx';
import { ProductionCapacity } from './pages/ProductionCapacity.jsx';
import { ServiceLogistics } from './pages/ServiceLogistics.jsx';
import { InventorySupplier } from './pages/InventorySupplier.jsx';
import { OtifIssueTree } from './pages/OtifIssueTree.jsx';
import { ExceptionsActions } from './pages/ExceptionsActions.jsx';
import { DataUploadAdmin } from './pages/DataUploadAdmin.jsx';

const TABS = [
  { id: 'summary', label: 'Executive Summary' },
  { id: 'demand', label: 'Demand Health' },
  { id: 'production', label: 'Production & Capacity' },
  { id: 'logistics', label: 'Service & Logistics' },
  { id: 'inventory', label: 'Inventory & Supplier' },
  { id: 'issueTree', label: 'OTIF Issue Tree' },
  { id: 'actions', label: 'Exceptions & Actions' },
  { id: 'admin', label: 'Data Upload & Admin' },
];

const KPI_TAB = {
  fca: 'demand',
  bias: 'demand',
  svb: 'demand',
  ppa: 'production',
  cotif: 'logistics',
  sotif: 'inventory',
  dio: 'inventory',
  logcost: 'logistics',
};

export default function App() {
  const [tab, setTab] = useState('summary');
  const [period, setPeriod] = useState('YTD');
  const [plant, setPlant] = useState('all');
  const [packaging, setPackaging] = useState('all');
  const [theme, setTheme] = useState(() => localStorage.getItem('sop-theme') || 'light');
  const [demo, setDemo] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('sop-theme', theme);
  }, [theme]);

  const packagingOptions = useMemo(() => packagingFilterOptions(plant), [plant]);

  useEffect(() => {
    if (packaging === 'all') return;
    const ok = packagingOptions.some((o) => o.value === packaging);
    if (!ok) setPackaging('all');
  }, [plant, packaging, packagingOptions]);

  const breadcrumb = useMemo(() => {
    const parts = [period, plant !== 'all' ? plant.toUpperCase() : 'All plants', packaging !== 'all' ? packaging : 'All packaging'];
    return `Active: ${parts.join(' · ')}`;
  }, [period, plant, packaging]);

  const lastRefresh = '2026-02-20 06:00 ICT';

  function handleKpiNavigate(kpiId) {
    const target = KPI_TAB[kpiId];
    if (target) setTab(target);
  }

  const content = (() => {
    switch (tab) {
      case 'summary':
        return <ExecutiveSummary onKpiNavigate={handleKpiNavigate} />;
      case 'demand':
        return <DemandHealth />;
      case 'production':
        return <ProductionCapacity />;
      case 'logistics':
        return <ServiceLogistics />;
      case 'inventory':
        return <InventorySupplier />;
      case 'issueTree':
        return <OtifIssueTree />;
      case 'actions':
        return <ExceptionsActions onOpenContext={() => setDrawerOpen(true)} />;
      case 'admin':
        return <DataUploadAdmin theme={theme} onThemeToggle={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} demo={demo} onDemo={setDemo} />;
      default:
        return null;
    }
  })();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-top">
          <div className="app-brand">
            <img
              className="app-logo"
              src={`${import.meta.env.BASE_URL}images/itail-logo.png`}
              alt="i-Tail Corporation"
              width={132}
              height={40}
            />
            <div>
              <h1>Executive S&amp;OP Dashboard</h1>
              <span className="app-tagline">Nourishing one healthy family — demand, supply &amp; service in one view</span>
            </div>
          </div>
          {demo ? (
            <span className="demo-badge" title="Mock data for workshops">
              Demo mode
            </span>
          ) : null}
        </div>
        <nav className="app-tabs" aria-label="Primary">
          {TABS.map((t) => (
            <button key={t.id} type="button" className={`app-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="app-main">
        <GlobalFilterBar
          period={period}
          onPeriod={setPeriod}
          plant={plant}
          onPlant={setPlant}
          packaging={packaging}
          onPackaging={setPackaging}
          packagingOptions={packagingOptions}
          lastRefresh={lastRefresh}
          theme={theme}
          onThemeToggle={() => setTheme((x) => (x === 'dark' ? 'light' : 'dark'))}
          demo={demo}
          onDemo={setDemo}
          onReset={() => {
            setPeriod('YTD');
            setPlant('all');
            setPackaging('all');
          }}
          onExport={() => alert('Export would generate PDF/PNG/CSV with current filters (wire in backend).')}
          activeBreadcrumb={breadcrumb}
        />

        <div className="pet-divider" aria-hidden />

        <div style={{ marginTop: '1rem' }}>{content}</div>

        {tab === 'summary' ? (
          <div className="bottom-drawer-trigger">
            <button type="button" className="gfb-btn primary" onClick={() => setTab('actions')}>
              Open action tracker
            </button>
            <button type="button" className="gfb-btn secondary" onClick={() => setDrawerOpen(true)}>
              Meeting handoff summary
            </button>
          </div>
        ) : null}
      </main>

      {drawerOpen ? (
        <aside className="floating-panel card" role="dialog" aria-label="Meeting handoff">
          <div className="floating-panel-head">
            <h3 className="card-title">Meeting handoff (mock)</h3>
            <button type="button" className="drawer-close" onClick={() => setDrawerOpen(false)}>
              Close
            </button>
          </div>
          <p className="card-sub">Pre-S&amp;OP decisions, owners, and due dates — link to same data as Exceptions tab.</p>
          <ul className="drawer-list">
            <li>OTIF recovery plan — Logistics — due 01 Mar</li>
            <li>Can capacity mitigation — Plant — due 28 Feb</li>
          </ul>
        </aside>
      ) : null}
    </div>
  );
}
