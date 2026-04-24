import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { actionRows as seedActions } from '../data/mockData.js';
import { defaultRcaPaths } from '../data/issueTreePaths.js';
import { parseCsv, rowsToObjects } from '../utils/csvParse.js';

const DashboardDataContext = createContext(null);

const STORAGE_ACTIONS = 'sop-actions-v1';
const STORAGE_REASONS = 'sop-client-reasons-v1';
const STORAGE_AUDIT = 'sop-upload-audit-v1';

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return fallback;
}

function saveJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

function appendAudit(entry) {
  const prev = loadJson(STORAGE_AUDIT, []);
  const next = [{ time: new Date().toISOString().slice(0, 16).replace('T', ' '), ...entry }, ...prev].slice(0, 50);
  saveJson(STORAGE_AUDIT, next);
  return next;
}

function normalizeAction(row) {
  const id = (row.action_id || row.actionid || '').trim() || `ACT-${Date.now()}`;
  return {
    action_id: id,
    issue: row.issue || row.title || '',
    owner: row.owner || '',
    due: row.due || row.due_date || '',
    status: row.status || 'Open',
    severity: row.severity || 'Med',
    forum: row.forum || '',
  };
}

function seedWithIds() {
  return seedActions.map((r, i) => ({
    action_id: `ACT-${String(i + 1).padStart(3, '0')}`,
    issue: r.issue,
    owner: r.owner,
    due: r.due,
    status: r.status,
    severity: r.severity,
    forum: r.forum,
  }));
}

export function DashboardDataProvider({ children }) {
  const [actions, setActionsState] = useState(() => loadJson(STORAGE_ACTIONS, null) || seedWithIds());
  const [clientReasons, setClientReasonsState] = useState(() => loadJson(STORAGE_REASONS, []));
  const [auditLog, setAuditLog] = useState(() => loadJson(STORAGE_AUDIT, []));

  useEffect(() => {
    saveJson(STORAGE_ACTIONS, actions);
  }, [actions]);

  useEffect(() => {
    saveJson(STORAGE_REASONS, clientReasons);
  }, [clientReasons]);

  const setActions = useCallback((next) => {
    setActionsState(next);
  }, []);

  const upsertActionsFromCsvText = useCallback((text, label = 'Actions CSV') => {
    const rows = parseCsv(text);
    if (rows.length < 2) return { ok: false, message: 'No data rows found.' };
    const objs = rowsToObjects(rows[0], rows.slice(1));
    setActionsState((prev) => {
      const map = new Map(prev.map((a) => [a.action_id, { ...a }]));
      for (const o of objs) {
        const a = normalizeAction(o);
        map.set(a.action_id, { ...map.get(a.action_id), ...a });
      }
      return Array.from(map.values());
    });
    setAuditLog(appendAudit({ user: 'Upload', action: `${label}: merged ${objs.length} row(s) by action_id` }));
    return { ok: true, count: objs.length };
  }, []);

  const addOrUpdateAction = useCallback((partial) => {
    const a = normalizeAction(partial);
    setActionsState((prev) => {
      const idx = prev.findIndex((x) => x.action_id === a.action_id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], ...a };
        return copy;
      }
      return [...prev, a];
    });
  }, []);

  const mergeReasonsFromCsvText = useCallback((text, label = 'Client reasons CSV') => {
    const rows = parseCsv(text);
    if (rows.length < 2) return { ok: false, message: 'No data rows found.' };
    const objs = rowsToObjects(rows[0], rows.slice(1));
    setClientReasonsState((prev) => {
      const map = new Map(prev.map((r) => [r.client_code, r]));
      for (const o of objs) {
        const code = (o.client_code || '').trim();
        if (!code) continue;
        map.set(code, {
          client_code: code,
          client_reason_text: o.client_reason_text || '',
          parent_code: o.parent_code || '',
          level: o.level || '',
          path_id: o.path_id || '',
          executive_family: o.executive_family || '',
          weight_pct: o.weight_pct || '',
          maps_to_root_label: o.maps_to_root_label || '',
        });
      }
      return Array.from(map.values());
    });
    setAuditLog(appendAudit({ user: 'Upload', action: `${label}: merged ${objs.length} reason code(s)` }));
    return { ok: true, count: objs.length };
  }, []);

  const recordGenericUpload = useCallback((label) => {
    setAuditLog(appendAudit({ user: 'Upload', action: label }));
  }, []);

  const rcaPaths = useMemo(() => {
    const reasonByCode = Object.fromEntries(clientReasons.map((r) => [r.client_code, r]));
    return defaultRcaPaths.map((path) => ({
      ...path,
      levels: path.levels.map((lvl) => ({
        ...lvl,
        clientCodes: String(lvl.clientCodes || '')
          .split(/[,;]/)
          .map((c) => c.trim())
          .filter(Boolean)
          .map((code) => {
            const r = reasonByCode[code];
            return r ? `${code}: ${r.client_reason_text}` : code;
          })
          .join(' · ') || lvl.clientCodes,
      })),
      rootCause: {
        ...path.rootCause,
        clientCodes: String(path.rootCause.clientCodes || '')
          .split(/[,;]/)
          .map((c) => c.trim())
          .filter(Boolean)
          .map((code) => {
            const r = reasonByCode[code];
            return r ? `${code}: ${r.client_reason_text}` : code;
          })
          .join(' · ') || path.rootCause.clientCodes,
      },
    }));
  }, [clientReasons]);

  const value = useMemo(
    () => ({
      actions,
      setActions,
      upsertActionsFromCsvText,
      addOrUpdateAction,
      clientReasons,
      mergeReasonsFromCsvText,
      rcaPaths,
      auditLog,
      recordGenericUpload,
    }),
    [actions, setActions, upsertActionsFromCsvText, addOrUpdateAction, clientReasons, mergeReasonsFromCsvText, rcaPaths, auditLog, recordGenericUpload]
  );

  return <DashboardDataContext.Provider value={value}>{children}</DashboardDataContext.Provider>;
}

export function useDashboardData() {
  const v = useContext(DashboardDataContext);
  if (!v) throw new Error('useDashboardData must be used within DashboardDataProvider');
  return v;
}
