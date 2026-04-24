/**
 * Default RCA-style paths for OTIF issue tree (horizontal levels → root cause).
 * Client codes from upload merge into detail / labels via context.
 */

export const defaultRcaPaths = [
  {
    id: 'path-1',
    entry: { label: 'OTIF misses (orders)', volume: '21.6K', pct: 100 },
    levels: [
      { label: 'Delay at customer event', pct: 100, barOfParent: 100, clientCodes: 'DEL-CSH-01' },
      { label: 'Export / vessel window miss', pct: 48, barOfParent: 48, clientCodes: 'VSL-14, CUT-02' },
      { label: 'Booking submitted after cut-off', pct: 62, barOfParent: 30, clientCodes: 'BK-LATE-09' },
      { label: 'Carrier allocation shortfall', pct: 55, barOfParent: 17, clientCodes: 'CAR-AL-03' },
      { label: 'Terminal execution variance', pct: 40, barOfParent: 7, clientCodes: 'TRM-EX-11' },
    ],
    rootCause: { index: 1, code: 'RC-EXEC', label: 'Order Execution Issue', pct: 7, clientCodes: 'ORD-EX-22' },
  },
  {
    id: 'path-2',
    entry: { label: 'OTIF misses (orders)', volume: '21.6K', pct: 100 },
    levels: [
      { label: 'Short shipment vs order', pct: 100, barOfParent: 100, clientCodes: 'SHT-ORD-04' },
      { label: 'Material availability at plant', pct: 42, barOfParent: 42, clientCodes: 'MAT-AV-07' },
      { label: 'RM inbound delay from supplier', pct: 58, barOfParent: 24, clientCodes: 'RM-DEL-18' },
      { label: 'Supplier OTIF below threshold', pct: 71, barOfParent: 17, clientCodes: 'SUP-OT-05' },
      { label: 'MRP / allocation mismatch', pct: 35, barOfParent: 6, clientCodes: 'MRP-AL-02' },
    ],
    rootCause: { index: 2, code: 'RC-ALLOC', label: 'Order Allocation / Planning Issue', pct: 6, clientCodes: 'ALC-PL-01' },
  },
  {
    id: 'path-3',
    entry: { label: 'OTIF misses (orders)', volume: '21.6K', pct: 100 },
    levels: [
      { label: 'Delay at customer event', pct: 100, barOfParent: 100, clientCodes: 'DEL-CSH-01' },
      { label: 'Domestic / regional leg delay', pct: 35, barOfParent: 35, clientCodes: 'DOM-LG-12' },
      { label: 'Hub cross-dock miss', pct: 52, barOfParent: 18, clientCodes: 'HUB-XD-03' },
      { label: 'Loading slot / wave plan', pct: 44, barOfParent: 8, clientCodes: 'LD-SL-08' },
    ],
    rootCause: { index: 3, code: 'RC-DIST', label: 'Distribution Planning / Execution Issue', pct: 8, clientCodes: 'DIS-PE-14' },
  },
  {
    id: 'path-4',
    entry: { label: 'OTIF misses (orders)', volume: '21.6K', pct: 100 },
    levels: [
      { label: 'Short shipment vs order', pct: 100, barOfParent: 100, clientCodes: 'SHT-ORD-04' },
      { label: 'Production short vs plan', pct: 38, barOfParent: 38, clientCodes: 'PRD-SH-06' },
      { label: 'Line changeover overrun', pct: 47, barOfParent: 18, clientCodes: 'CO-CHG-02' },
      { label: 'Quality hold / release delay', pct: 33, barOfParent: 6, clientCodes: 'QA-HLD-09' },
    ],
    rootCause: { index: 4, code: 'RC-PROD', label: 'Production Planning / Execution Issue', pct: 6, clientCodes: 'PRD-PE-03' },
  },
  {
    id: 'path-5',
    entry: { label: 'OTIF misses (orders)', volume: '21.6K', pct: 100 },
    levels: [
      { label: 'Forecast vs actual variance', pct: 100, barOfParent: 100, clientCodes: 'FCV-VA-01' },
      { label: 'Promo uplift not in forecast', pct: 28, barOfParent: 28, clientCodes: 'PRM-UP-07' },
      { label: 'NPD timing slip', pct: 40, barOfParent: 11, clientCodes: 'NPD-TM-04' },
    ],
    rootCause: { index: 5, code: 'RC-FCST', label: 'Forecasting issue', pct: 11, clientCodes: 'FCT-IS-11' },
  },
  {
    id: 'path-6',
    entry: { label: 'OTIF misses (orders)', volume: '21.6K', pct: 100 },
    levels: [
      { label: 'Network stock imbalance', pct: 100, barOfParent: 100, clientCodes: 'NET-ST-02' },
      { label: 'Inter-plant transfer delay', pct: 22, barOfParent: 22, clientCodes: 'IPT-DL-05' },
      { label: 'Safety stock breach', pct: 36, barOfParent: 8, clientCodes: 'SS-BR-03' },
    ],
    rootCause: { index: 6, code: 'RC-NET', label: 'Network Balancing Issue', pct: 8, clientCodes: 'NET-BL-06' },
  },
];
