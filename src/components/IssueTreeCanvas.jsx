import { useState } from 'react';

function Branch({ node, depth = 0, selectedId, onSelect }) {
  const hasKids = node.children?.length > 0;
  return (
    <li className={`it-branch depth-${depth}`}>
      <button
        type="button"
        className={`it-node ${selectedId === node.id ? 'selected' : ''}`}
        onClick={() => onSelect(node)}
      >
        <span className="it-label">{node.label}</span>
        <span className="it-pct">{node.pct}%</span>
      </button>
      {hasKids ? (
        <ul className="it-children">
          {node.children.map((ch) => (
            <Branch key={ch.id} node={ch} depth={depth + 1} selectedId={selectedId} onSelect={onSelect} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function IssueTreeCanvas({ roots, detail }) {
  const [selected, setSelected] = useState(roots[0]?.children?.[0] || roots[0]);
  const [mode, setMode] = useState('tree');

  return (
    <div className="card issue-tree-card">
      <div className="it-toolbar">
        <h3 className="card-title">OTIF issue tree</h3>
        <div className="it-toggle">
          <button type="button" className={mode === 'tree' ? 'active' : ''} onClick={() => setMode('tree')}>
            Tree
          </button>
          <button type="button" className={mode === 'waterfall' ? 'active' : ''} onClick={() => setMode('waterfall')}>
            Waterfall
          </button>
        </div>
      </div>
      <p className="card-sub">Contribution % by branch — cross-links to Service &amp; Logistics RCA</p>
      <div className="it-layout">
        <div className="it-canvas">
          {mode === 'tree' ? (
            <ul className="it-root">
              {roots.map((n) => (
                <Branch key={n.id} node={n} selectedId={selected?.id} onSelect={setSelected} />
              ))}
            </ul>
          ) : (
            <div className="it-waterfall-bars">
              {['Delay 48%', 'Short 35%', 'Short+delay 17%'].map((t, i) => (
                <div key={t} className="it-wf-row">
                  <span>{t}</span>
                  <div className="it-wf-bar-wrap">
                    <div className="it-wf-bar" style={{ width: `${[48, 35, 17][i]}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="it-detail card">
          <h4 className="it-detail-title">{selected?.label ?? 'Select a branch'}</h4>
          <dl className="it-detail-dl">
            <dt>Contribution</dt>
            <dd>{selected?.pct ?? '—'}%</dd>
            <dt>Missed orders</dt>
            <dd>{detail?.orders ?? '128'}</dd>
            <dt>Impacted value</dt>
            <dd>{detail?.value ?? '฿ 4.2M'}</dd>
            <dt>Top RCA codes</dt>
            <dd>VSL-01, CUT-14, ORD-08</dd>
            <dt>Owner / forum</dt>
            <dd>Export logistics — Pre-S&amp;OP</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
