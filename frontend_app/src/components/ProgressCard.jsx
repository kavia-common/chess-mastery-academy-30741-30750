import React from 'react';

// PUBLIC_INTERFACE
export default function ProgressCard({ title, value, total }) {
  /** Displays a progress metric with a bar. */
  const pct = Math.round((value / Math.max(1, total)) * 100);
  return (
    <div className="card" role="region" aria-label={`${title} progress`}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
        <strong>{title}</strong>
        <span className="muted">{value} / {total}</span>
      </div>
      <div aria-hidden="true" style={{height:8, background:'#e5e7eb', borderRadius:8, overflow:'hidden'}}>
        <div style={{height:'100%', width:`${pct}%`, background:'linear-gradient(90deg, var(--primary), #60a5fa)'}} />
      </div>
    </div>
  );
}
