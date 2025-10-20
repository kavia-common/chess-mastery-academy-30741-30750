import React from 'react';
import { NavLink } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Navigation() {
  /** Primary navigation bar. */
  const linkStyle = ({ isActive }) => ({
    padding: '.6rem .8rem',
    borderRadius: '10px',
    border: '1px solid var(--border)',
    color: isActive ? 'white' : 'var(--text)',
    background: isActive ? 'var(--primary)' : 'transparent',
    transition: 'all .2s ease',
  });

  return (
    <nav aria-label="Primary" role="navigation" style={{borderBottom:'1px solid var(--border)'}}>
      <div className="container" style={{display:'flex', gap:'.5rem', padding:'.6rem 0'}}>
        <NavLink to="/" style={linkStyle} end>Home</NavLink>
        <NavLink to="/lessons" style={linkStyle}>Lessons</NavLink>
        <NavLink to="/tutorials" style={linkStyle}>Tutorials</NavLink>
        <NavLink to="/play" style={linkStyle}>Play</NavLink>
      </div>
    </nav>
  );
}
