import { IssueTreeCanvas } from '../components/IssueTreeCanvas.jsx';
import { issueTreeNodes } from '../data/mockData.js';

export function OtifIssueTree() {
  return <IssueTreeCanvas roots={issueTreeNodes} detail={{ orders: 128, value: '฿ 4.2M' }} />;
}
