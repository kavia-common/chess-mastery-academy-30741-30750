import React from 'react';
import TutorialCard from '../components/TutorialCard';
import { useStore } from '../state/store';

// PUBLIC_INTERFACE
export default function Tutorials() {
  /** Tutorials listing page. */
  const { state } = useStore();

  return (
    <div>
      <h2 className="section-title">Tutorials</h2>
      <div className="row">
        {state.tutorials.items.map(t => (
          <div key={t.id} className="col">
            <TutorialCard tutorial={t} />
          </div>
        ))}
      </div>
    </div>
  );
}
