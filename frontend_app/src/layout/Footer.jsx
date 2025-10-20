import React from 'react';

// PUBLIC_INTERFACE
export default function Footer() {
  /** Footer with links */
  return (
    <footer role="contentinfo" style={{marginTop:'2rem', borderTop:'1px solid var(--border)'}}>
      <div className="container" style={{padding:'1rem 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <small className="muted">© {new Date().getFullYear()} Chess Mastery Academy</small>
        <nav aria-label="Footer">
          <a className="link" href="https://reactjs.org" target="_blank" rel="noreferrer">Learn React</a>
        </nav>
      </div>
    </footer>
  );
}
