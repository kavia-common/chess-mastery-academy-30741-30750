import React from 'react';
import { useStore } from '../state/store';

// PUBLIC_INTERFACE
export default function LessonCard({ lesson }) {
  /** Card for a single lesson with mark complete action. */
  const { state, dispatch } = useStore();
  const progress = state.lessons.progress[lesson.id];

  return (
    <div className="card" role="article" aria-label={`Lesson ${lesson.title}`}>
      <h4 style={{margin:'0 0 .5rem 0'}}>{lesson.title}</h4>
      <p className="muted" style={{marginTop:0}}>{lesson.description}</p>
      <div style={{display:'flex', gap:'.5rem', alignItems:'center', marginTop:'.5rem'}}>
        <button
          className="btn secondary"
          onClick={() => dispatch({ type: 'lessons/markComplete', payload: { id: lesson.id } })}
          aria-label={`Mark lesson ${lesson.title} complete`}
        >
          {progress?.completed ? 'Completed ✓' : 'Mark Complete'}
        </button>
        <span className="muted">{lesson.level}</span>
      </div>
    </div>
  );
}
