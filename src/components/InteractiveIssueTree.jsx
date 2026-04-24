import { useMemo, useState } from 'react';

function NodeBar({ pct }) {
  const w = Math.min(100, Math.max(4, pct));
  return (
    <div className="rca-bar-track" aria-hidden>
      <div className="rca-bar-fill" style={{ width: `${w}%` }} />
    </div>
  );
}

function PathLane({ path, maxLevels, colTemplate, selectedKey, onSelectNode }) {
  const paddedLevels = [...path.levels];
  while (paddedLevels.length < maxLevels) {
    paddedLevels.push({ label: '—', pct: null, barOfParent: null, clientCodes: '', ghost: true });
  }
  const cells = [
    { kind: 'entry', data: path.entry, key: `${path.id}-e` },
    ...paddedLevels.map((lvl, i) => ({ kind: 'level', data: lvl, key: `${path.id}-l${i}` })),
    { kind: 'root', data: path.rootCause, key: `${path.id}-r` },
  ];

  return (
    <div className="rca-lane" role="row" style={{ gridTemplateColumns: colTemplate }}>
      {cells.map((cell, idx) => {
        const isRoot = cell.kind === 'root';
        const isGhost = cell.kind === 'level' && cell.data.ghost;
        const label = cell.data.label;
        const pct = isRoot ? cell.data.pct : cell.data.pct ?? cell.data.barOfParent;
        const vol = cell.kind === 'entry' ? cell.data.volume : null;
        const key = cell.key;
        const active = selectedKey === key;
        const Tag = isGhost ? 'div' : 'button';
        return (
          <div key={key} className="rca-lane-seg">
            {idx > 0 ? <div className="rca-connector" aria-hidden /> : null}
            <Tag
              type={isGhost ? undefined : 'button'}
              className={`rca-node ${active ? 'rca-node--active' : ''} ${isRoot ? 'rca-node--root' : ''} ${isGhost ? 'rca-node--ghost' : ''}`}
              onClick={isGhost ? undefined : () => onSelectNode({ pathId: path.id, key, cell, path })}
            >
              <NodeBar pct={typeof pct === 'number' ? pct : isGhost ? 0 : 40} />
              <span className="rca-node-label">{label}</span>
              {vol ? <span className="rca-node-vol">{vol}</span> : null}
              {!isRoot && cell.kind === 'level' && !isGhost ? <span className="rca-node-pct">{pct}%</span> : null}
              {isRoot ? <span className="rca-root-badge">{cell.data.index}</span> : null}
            </Tag>
          </div>
        );
      })}
    </div>
  );
}

export function InteractiveIssueTree({ paths }) {
  const [selection, setSelection] = useState(null);
  const maxLevels = useMemo(() => Math.max(...paths.map((p) => p.levels.length), 1), [paths]);
  const colTemplate = `minmax(120px, 1fr) repeat(${maxLevels}, minmax(100px, 1fr)) minmax(140px, 1.1fr)`;

  const detail = useMemo(() => {
    if (!selection) return null;
    const { cell, path } = selection;
    if (cell.kind === 'root') {
      return {
        title: cell.data.label,
        lines: [
          ['Root cause #', String(cell.data.index)],
          ['Code', cell.data.code],
          ['Share of misses', `${cell.data.pct}%`],
          ['Client / reason codes', cell.data.clientCodes || '—'],
          ['Path id', path.id],
        ],
      };
    }
    if (cell.kind === 'entry') {
      return {
        title: cell.data.label,
        lines: [
          ['Volume', cell.data.volume],
          ['Scope', `${cell.data.pct}% of analysed OTIF gap`],
          ['Path id', path.id],
        ],
      };
    }
    return {
      title: cell.data.label,
      lines: [
        ['Level contribution', `${cell.data.pct}%`],
        ['Bar vs parent', `${cell.data.barOfParent ?? '—'}%`],
        ['Mapped client codes', cell.data.clientCodes || '—'],
        ['Path id', path.id],
      ],
    };
  }, [selection]);

  return (
    <div className="rca-tree-shell card">
      <div className="rca-tree-head">
        <div>
          <h3 className="card-title rca-title">Root cause tree — OTIF</h3>
          <p className="card-sub rca-sub">Interactive lanes (inspiration: supply-chain RCA). Click any node for drivers &amp; client codes.</p>
        </div>
        <div className="rca-legend-inline">
          <span className="rca-lock-hint" title="Levels align to governance locks in full build">
            Levels L1 → root
          </span>
        </div>
      </div>

      <div className="rca-scroll">
        <div className="rca-col-hdr" style={{ gridTemplateColumns: colTemplate }} aria-hidden>
          <span>Entry</span>
          {Array.from({ length: maxLevels }, (_, i) => (
            <span key={i}>
              Level {i + 1}
            </span>
          ))}
          <span>Root cause</span>
        </div>
        <div className="rca-lanes">
          {paths.map((p) => (
            <PathLane key={p.id} path={p} maxLevels={maxLevels} colTemplate={colTemplate} selectedKey={selection?.key} onSelectNode={setSelection} />
          ))}
        </div>
      </div>

      <div className="rca-detail-grid">
        <div className="rca-detail card">
          <h4 className="it-detail-title">{detail ? detail.title : 'Select a node'}</h4>
          {detail ? (
            <dl className="it-detail-dl">
              {detail.lines.map(([dt, dd]) => (
                <div key={dt} className="rca-dl-row">
                  <dt>{dt}</dt>
                  <dd>{dd}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="card-sub">Choose a node along any lane to see contribution, mapped client codes, and path metadata.</p>
          )}
        </div>
        <div className="rca-hint card">
          <h4 className="it-detail-title">Client reason upload</h4>
          <p className="card-sub">
            Upload <strong>template_issue_tree_client_reasons.csv</strong> on the Data Upload tab. Rows keyed by <code>client_code</code> enrich labels here; same code
            updates existing text.
          </p>
        </div>
      </div>
    </div>
  );
}
