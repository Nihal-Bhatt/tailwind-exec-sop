/**
 * CSV templates for every metric area (all tabs). Download only — upload handled in UI.
 */

function download(filename, content) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const BOM = '\uFEFF';

export const METRIC_TEMPLATE_GROUPS = [
  {
    tab: 'Executive & Demand',
    items: [
      {
        id: 'demand_fca',
        name: 'Forecast accuracy & bias',
        filename: 'template_demand_fca_bias.csv',
        headers: ['customer_id', 'segment', 'month', 'forecast_cycle', 'forecast_qty', 'actual_qty', 'fca_pct', 'bias_pct', 'budget_qty'],
        example: ['CUST-001', 'Mainstream', '2026-02', 'FC5', '12000', '11800', '98.3', '1.7', '11500'],
      },
      {
        id: 'demand_bridge',
        name: 'Sales vs budget / outlook bridge',
        filename: 'template_demand_sales_budget_bridge.csv',
        headers: ['month', 'budget', 'base_demand', 'confirmed_uplift', 'pipeline', 'risk_downside', 'net_outlook_pct'],
        example: ['2026-02', '100', '3', '2.5', '1.2', '-4.3', '102.4'],
      },
    ],
  },
  {
    tab: 'Production & capacity',
    items: [
      {
        id: 'production_adherence',
        name: 'Plan adherence by plant',
        filename: 'template_production_plan_adherence.csv',
        headers: ['plant_code', 'month', 'planned_output', 'actual_output', 'adherence_pct', 'bucket'],
        example: ['SS', '2026-02', '10000', '9650', '96.5', 'within_10pct'],
      },
      {
        id: 'capacity_utilization',
        name: 'Capacity utilization (plant × packaging)',
        filename: 'template_capacity_utilization.csv',
        headers: ['plant_code', 'packaging_type', 'month', 'effective_capacity', 'actual_volume', 'utilization_pct'],
        example: ['SS', 'Can', '2026-02', '5000', '5250', '105'],
      },
    ],
  },
  {
    tab: 'Service & logistics',
    items: [
      {
        id: 'logistics_otif',
        name: 'Customer OTIF & shipment lines',
        filename: 'template_logistics_otif_shipments.csv',
        headers: ['order_id', 'plant_code', 'customer_id', 'month', 'otif_met', 'delay_days', 'short_qty', 'rca_family', 'client_reason_code'],
        example: ['SO-10001', 'SS', 'CUST-001', '2026-02', 'N', '3', '0', 'vessel_export', 'VSL-14'],
      },
      {
        id: 'logistics_vessel',
        name: 'Vessel / cut-off misses',
        filename: 'template_logistics_vessel_cutoff.csv',
        headers: ['shipment_id', 'plant_code', 'lane', 'month', 'missed_cutoff_yn', 'customer_id'],
        example: ['SH-9001', 'SK', 'EU-West', '2026-02', 'Y', 'CUST-002'],
      },
      {
        id: 'logistics_cost',
        name: 'Logistics cost % sales',
        filename: 'template_logistics_cost_pct_sales.csv',
        headers: ['month', 'plant_code', 'freight', 'warehousing', 'premium_freight', 'customs_port', 'net_sales', 'cost_pct_sales'],
        example: ['2026-02', 'ALL', '2.35', '1.25', '0.95', '0.5', '100000', '4.6'],
      },
    ],
  },
  {
    tab: 'Inventory & supplier',
    items: [
      {
        id: 'inventory_supplier_otif',
        name: 'Supplier OTIF receipts',
        filename: 'template_inventory_supplier_otif.csv',
        headers: ['supplier_id', 'material_family', 'plant_code', 'month', 'otif_pct', 'date_adherence', 'qty_adherence'],
        example: ['SUP-01', 'Meat meal', 'SS', '2026-02', '88.5', '90', '87'],
      },
      {
        id: 'inventory_dio_slob',
        name: 'RM DIO & aging / SLOB',
        filename: 'template_inventory_dio_slob.csv',
        headers: ['plant_code', 'material_family', 'month', 'rm_dio_days', 'slob_pct', 'age_bucket', 'inventory_value'],
        example: ['SK', 'Packaging RM', '2026-02', '42', '8', '61-90d', '125000'],
      },
    ],
  },
  {
    tab: 'Actions & issue tree',
    items: [
      {
        id: 'actions_tracker',
        name: 'Actions (upsert by action_id)',
        filename: 'template_actions_tracker.csv',
        headers: ['action_id', 'issue', 'owner', 'due', 'status', 'severity', 'forum'],
        example: ['ACT-001', 'Export lane congestion — EU west', 'Logistics', '2026-03-01', 'Open', 'High', 'Pre-S&OP'],
      },
      {
        id: 'issue_tree_reasons',
        name: 'Client reason codes & RCA mapping',
        filename: 'template_issue_tree_client_reasons.csv',
        headers: ['client_code', 'client_reason_text', 'parent_code', 'level', 'path_id', 'executive_family', 'weight_pct', 'maps_to_root_label'],
        example: ['VSL-14', 'Vessel rolled / slot lost', 'ROOT', '1', 'path-1', 'vessel_export', '12', 'Order Execution Issue'],
      },
    ],
  },
];

export function buildTemplateCsv(headers, exampleRow) {
  const h = headers.join(',');
  const e = exampleRow.map((c) => (String(c).includes(',') ? `"${String(c).replace(/"/g, '""')}"` : c)).join(',');
  return `${BOM}${h}\n${e}\n`;
}

export function downloadMetricTemplate(item) {
  const content = buildTemplateCsv(item.headers, item.example);
  download(item.filename, content);
}

export function downloadAllTemplatesZip() {
  METRIC_TEMPLATE_GROUPS.forEach((g) => {
    g.items.forEach((item) => downloadMetricTemplate(item));
  });
}
