import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load pages
const Home = lazy(() => import('../pages/Home'));
const Lessons = lazy(() => import('../pages/Lessons'));
const Tutorials = lazy(() => import('../pages/Tutorials'));
const Play = lazy(() => import('../pages/Play'));
const NotFound = lazy(() => import('../pages/NotFound'));

// PUBLIC_INTERFACE
export default function Router() {
  /** Renders application pages with code splitting. */
  return (
    <Suspense fallback={<div role="status" aria-live="polite">Loading…</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/play" element={<Play />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
