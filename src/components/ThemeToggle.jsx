export function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-pressed={theme === 'dark'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="sr-only">Toggle theme</span>
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}
