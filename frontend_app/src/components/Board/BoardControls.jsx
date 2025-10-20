import React from 'react';
import { useStore } from '../../state/store';

// PUBLIC_INTERFACE
export default function BoardControls() {
  /** Ancillary controls: clear selection and show move count. */
  const { state, dispatch } = useStore();
  const moves = state.game.moves.length;

  return (
    <div className="card" role="region" aria-label="Board controls">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <strong>Moves:</strong> {moves}
        </div>
        <div style={{display:'flex', gap:'.5rem'}}>
          <button className="btn ghost" onClick={() => dispatch({ type: 'game/undo' })}>Undo</button>
          <button className="btn ghost" onClick={() => dispatch({ type: 'game/reset' })}>Reset</button>
        </div>
      </div>
    </div>
  );
}
