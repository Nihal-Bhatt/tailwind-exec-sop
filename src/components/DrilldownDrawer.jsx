export function DrilldownDrawer({ open, title, onClose, children }) {
  return (
    <>
      <div className={`drawer-backdrop ${open ? 'open' : ''}`} onClick={onClose} aria-hidden />
      <aside className={`drawer-panel ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className="drawer-head">
          <div>
            <h2 className="drawer-title">{title}</h2>
            <p className="card-sub">Prior forecast, actuals, bias — validate / hold / shape / escalate</p>
          </div>
          <button type="button" className="drawer-close" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="drawer-body">{children}</div>
      </aside>
    </>
  );
}
