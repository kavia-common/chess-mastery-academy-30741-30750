import React from 'react';

// PUBLIC_INTERFACE
export default function NotFound() {
  /** Fallback route for unknown paths. */
  return (
    <div className="card" role="alert" aria-live="assertive">
      <h2 style={{marginTop:0}}>Page not found</h2>
      <p className="muted">We couldn't find what you were looking for.</p>
      <a className="btn" href="/">Go Home</a>
    </div>
  );
}
