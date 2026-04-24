import { InteractiveIssueTree } from '../components/InteractiveIssueTree.jsx';
import { useDashboardData } from '../context/DashboardDataContext.jsx';

export function OtifIssueTree() {
  const { rcaPaths } = useDashboardData();
  return <InteractiveIssueTree paths={rcaPaths} />;
}
