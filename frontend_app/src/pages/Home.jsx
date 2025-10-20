import React from 'react';
import ProgressCard from '../components/ProgressCard';
import { useStore } from '../state/store';

// PUBLIC_INTERFACE
export default function Home() {
  /** Landing page with quick stats and callouts. */
  const { state } = useStore();
  const completed = Object.values(state.lessons.progress).filter(p => p.completed).length;

  return (
    <div>
      <div className="card gradient-accent" role="region" aria-label="Welcome">
        <h2 style={{marginTop:0}}>Welcome to Chess Mastery Academy</h2>
        <p className="muted">Interactive lessons, curated tutorials, and a practice board to level up your game.</p>
        <div style={{display:'flex', gap:'.5rem', marginTop:'.5rem'}}>
          <a className="btn" href="/lessons">Start Lessons</a>
          <a className="btn secondary" href="/play">Play Now</a>
        </div>
      </div>

      <div className="row" style={{marginTop:'1rem'}}>
        <div className="col"><ProgressCard title="Lessons Completed" value={completed} total={state.lessons.items.length} /></div>
        <div className="col"><ProgressCard title="Tutorials Available" value={state.tutorials.items.length} total={state.tutorials.items.length} /></div>
        <div className="col"><ProgressCard title="Current Streak" value={Math.min(completed, 7)} total={7} /></div>
      </div>
    </div>
  );
}
