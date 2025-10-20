import React from 'react';
import LessonCard from '../components/LessonCard';
import { useStore } from '../state/store';

// PUBLIC_INTERFACE
export default function Lessons() {
  /** Lessons listing page. */
  const { state } = useStore();

  return (
    <div>
      <h2 className="section-title">Lessons</h2>
      <div className="row">
        {state.lessons.items.map(lesson => (
          <div key={lesson.id} className="col">
            <LessonCard lesson={lesson} />
          </div>
        ))}
      </div>
    </div>
  );
}
