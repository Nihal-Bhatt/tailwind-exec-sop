export function DemoModeToggle({ demo, onChange }) {
  return (
    <label className="demo-pill">
      <input
        type="checkbox"
        checked={demo}
        onChange={(e) => onChange(e.target.checked)}
        className="demo-pill-input"
      />
      <span className="demo-pill-ui">Demo data</span>
    </label>
  );
}
