import React from 'react';
import { useStore } from '../state/store';

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Collapsible sidebar that lists quick stats. */
  const { state } = useStore();
  const open = state.ui.sidebarOpen;

  if (!open) {
    return (
      <div className="card" aria-label="Sidebar collapsed">
        <p className="muted">Sidebar collapsed</p>
      </div>
    );
  }

  const completed = Object.values(state.lessons.progress).filter(p => p.completed).length;
  return (
    <div>
      <div className="card">
        <h3 className="section-title">Your Progress</h3>
        <p className="muted">{completed} of {state.lessons.items.length} lessons completed</p>
        <div aria-hidden="true" style={{height:8, background:'#e5e7eb', borderRadius:8, overflow:'hidden', marginTop:8}}>
          <div style={{
            height:'100%',
            width: `${Math.round((completed / Math.max(1, state.lessons.items.length))*100)}%`,
            background:'linear-gradient(90deg, var(--primary), #60a5fa)'
          }} />
        </div>
      </div>

      <div className="card">
        <h3 className="section-title">Tips</h3>
        <ul className="list-reset">
          <li>• Practice a little every day.</li>
          <li>• Review your blunders.</li>
          <li>• Control the center.</li>
        </ul>
      </div>
    </div>
  );
}
