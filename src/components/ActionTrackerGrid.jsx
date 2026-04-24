import { ExceptionTable } from './ExceptionTable.jsx';

const cols = [
  { key: 'action_id', label: 'Action ID' },
  { key: 'issue', label: 'Issue' },
  { key: 'owner', label: 'Owner' },
  { key: 'due', label: 'Due' },
  { key: 'status', label: 'Status', badge: true },
  { key: 'severity', label: 'Severity', badge: true },
  { key: 'forum', label: 'Forum' },
];

export function ActionTrackerGrid({ rows, onRowClick }) {
  return (
    <ExceptionTable
      title="Action tracker"
      subtitle="Owners, due dates, and meeting forum"
      columns={cols}
      rows={rows}
      onRowClick={onRowClick}
    />
  );
}
