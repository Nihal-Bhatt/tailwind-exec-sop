/**
 * Plant-specific packaging hierarchy (Executive S&OP architecture).
 * SS = Samut Sakhon · SK = Songkhla — each plant has its own allowed packaging types.
 */
export const PLANT_META = {
  ss: { code: 'SS', name: 'Samut Sakhon (SS)', short: 'SS' },
  sk: { code: 'SK', name: 'Songkhla (SK)', short: 'SK' },
};

/** Packaging types valid only at SS */
export const PACKAGING_SS = ['Alutray', 'Can', 'Cup', 'Pouch', 'Sachet'];

/** Packaging types valid only at SK (no Alutray; adds Spout, Twin pouch) */
export const PACKAGING_SK = ['Can', 'Cup', 'Pouch', 'Sachet', 'Spout', 'Twin pouch'];

export const PACKAGING_BY_PLANT = {
  ss: PACKAGING_SS,
  sk: PACKAGING_SK,
};

/** Utilization % by packaging for each plant (mock — one column “Feb YTD”) */
export const UTILIZATION_BY_PLANT = {
  ss: {
    plantKey: 'ss',
    title: 'SS — Samut Sakhon',
    rows: PACKAGING_SS,
    cols: ['Utilization %'],
    values: [[72], [105], [85], [91], [78]],
  },
  sk: {
    plantKey: 'sk',
    title: 'SK — Songkhla',
    rows: PACKAGING_SK,
    cols: ['Utilization %'],
    values: [[88], [92], [79], [94], [81], [76]],
  },
};

export function packagingFilterOptions(plantFilter) {
  if (plantFilter === 'ss') return PACKAGING_SS.map((p) => ({ value: p.toLowerCase().replace(/\s+/g, '-'), label: p }));
  if (plantFilter === 'sk') return PACKAGING_SK.map((p) => ({ value: p.toLowerCase().replace(/\s+/g, '-'), label: p }));
  const merged = [...PACKAGING_SS];
  for (const p of PACKAGING_SK) {
    if (!merged.includes(p)) merged.push(p);
  }
  return merged.map((p) => ({ value: p.toLowerCase().replace(/\s+/g, '-'), label: p }));
}
