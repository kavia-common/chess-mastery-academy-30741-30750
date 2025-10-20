import React from 'react';
import { useStore } from '../../state/store';
import { getHints } from '../../state/slices/gameSlice';

const files = ['a','b','c','d','e','f','g','h'];

// PUBLIC_INTERFACE
export default function ChessBoard() {
  /**
   * Minimal board with selection and simplified move highlighting.
   * Uses letters for pieces (Uppercase white, lowercase black).
   */
  const { state, dispatch } = useStore();
  const { board, selected, turn } = state.game;

  const onSquareClick = (r, c) => {
    if (selected && selected.r === r && selected.c === c) {
      dispatch({ type: 'game/select', payload: { r: -1, c: -1 } });
      return;
    }
    const piece = board[r][c];
    if (selected) {
      // try move
      dispatch({ type: 'game/move', payload: { to: { r, c } } });
    } else if (piece) {
      dispatch({ type: 'game/select', payload: { r, c } });
    }
  };

  const hints = selected ? getHints(board, selected.r, selected.c) : [];
  const isHint = (r, c) => hints.some(h => h.r === r && h.c === c);

  return (
    <div role="grid" aria-label="Chess board" style={{userSelect:'none'}}>
      <div className="muted" style={{marginBottom:'.5rem'}}>Turn: {turn === 'w' ? 'White' : 'Black'}</div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(8, 48px)', gridTemplateRows:'repeat(8, 48px)', border:'1px solid var(--border)', borderRadius:12, overflow:'hidden', boxShadow:'var(--shadow-sm)'}}>
        {board.map((row, r) =>
          row.map((cell, c) => {
            const dark = (r + c) % 2 === 1;
            const sel = selected && selected.r === r && selected.c === c;
            const hint = isHint(r, c);
            return (
              <button
                key={`${r}-${c}`}
                role="gridcell"
                aria-label={`${files[c]}${8-r} ${cell ? `contains ${cell}` : 'empty'}`}
                onClick={() => onSquareClick(r, c)}
                style={{
                  width:48, height:48, display:'flex', alignItems:'center', justifyContent:'center',
                  border:'none',
                  background: sel ? '#fde68a' : hint ? '#bbf7d0' : dark ? '#9ca3af' : '#e5e7eb',
                  cursor:'pointer',
                  fontWeight:'700'
                }}
              >
                <span aria-hidden="true" style={{fontFamily:'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'}}>
                  {cell || ''}
                </span>
              </button>
            );
          })
        )}
      </div>
      <div style={{marginTop:'.6rem', display:'flex', gap:'.5rem'}}>
        <button className="btn" onClick={() => dispatch({ type: 'game/undo' })} aria-label="Undo last move">Undo</button>
        <button className="btn ghost" onClick={() => dispatch({ type: 'game/reset' })} aria-label="Reset game">New / Reset</button>
      </div>
    </div>
  );
}
