/** Minimal CSV parsing — supports quoted fields; commas inside quotes OK */

export function parseCsv(text) {
  const rows = [];
  let i = 0;
  const s = text.replace(/^\uFEFF/, '').trim();
  if (!s) return rows;
  let field = '';
  let row = [];
  let inQuotes = false;
  while (i <= s.length) {
    const c = s[i];
    if (c === undefined) {
      row.push(field);
      rows.push(row);
      break;
    }
    if (inQuotes) {
      if (c === '"') {
        if (s[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      field += c;
      i += 1;
      continue;
    }
    if (c === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }
    if (c === ',') {
      row.push(field);
      field = '';
      i += 1;
      continue;
    }
    if (c === '\r') {
      i += 1;
      continue;
    }
    if (c === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      i += 1;
      continue;
    }
    field += c;
    i += 1;
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ''));
}

export function rowsToObjects(headerRow, dataRows) {
  const keys = headerRow.map((h) => h.trim().toLowerCase().replace(/\s+/g, '_'));
  return dataRows.map((cells) => {
    const obj = {};
    keys.forEach((k, idx) => {
      obj[k] = (cells[idx] ?? '').trim();
    });
    return obj;
  });
}
