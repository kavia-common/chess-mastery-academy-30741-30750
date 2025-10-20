import React from 'react';
import { useStore } from '../state/store';

// PUBLIC_INTERFACE
export default function Header() {
  /** App header with theme toggle and title. */
  const { state, dispatch } = useStore();

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.ui.theme);
  }, [state.ui.theme]);

  return (
    <header className="header-blur" role="banner" aria-label="Top header">
      <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0.75rem 0.25rem'}}>
        <h1 style={{margin:0, fontSize:'1.15rem'}}>Chess Mastery Academy</h1>
        <div style={{display:'flex', gap:'.5rem', alignItems:'center'}}>
          <button
            className="btn ghost"
            aria-label={`Switch to ${state.ui.theme === 'light' ? 'dark' : 'light'} mode`}
            onClick={() => dispatch({ type: 'ui/toggleTheme' })}
          >
            {state.ui.theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          <button
            className="btn ghost"
            onClick={() => dispatch({ type: 'ui/toggleSidebar' })}
            aria-label="Toggle sidebar"
          >
            Toggle Sidebar
          </button>
        </div>
      </div>
    </header>
  );
}
