import { HeatmapMatrix } from './HeatmapMatrix.jsx';
import { UTILIZATION_BY_PLANT } from '../data/plantHierarchy.js';

/** SS and SK each have their own packaging list — never a single mixed matrix. */
export function PlantUtilizationGrids({ subtitle }) {
  const ss = UTILIZATION_BY_PLANT.ss;
  const sk = UTILIZATION_BY_PLANT.sk;
  return (
    <div className="plant-util-grid">
      <HeatmapMatrix title={ss.title} subtitle={subtitle ?? 'Effective capacity % (current period)'} rows={ss.rows} cols={ss.cols} values={ss.values} />
      <HeatmapMatrix title={sk.title} subtitle={subtitle ?? 'SK packaging set excludes Alutray; includes Spout & Twin pouch'} rows={sk.rows} cols={sk.cols} values={sk.values} />
    </div>
  );
}
