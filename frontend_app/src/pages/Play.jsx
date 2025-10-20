import React from 'react';
import ChessBoard from '../components/Board/ChessBoard';
import BoardControls from '../components/Board/BoardControls';

// PUBLIC_INTERFACE
export default function Play() {
  /** Play area with interactive board. */
  return (
    <div>
      <h2 className="section-title">Play</h2>
      <div className="row">
        <div className="col" style={{flex:'0 0 auto'}}>
          <ChessBoard />
        </div>
        <div className="col">
          <BoardControls />
          <div className="card">
            <h3 className="section-title">How to use</h3>
            <p className="muted">Click a piece to see moves. Click a highlighted square to move. Use Undo to revert and Reset to start new.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
