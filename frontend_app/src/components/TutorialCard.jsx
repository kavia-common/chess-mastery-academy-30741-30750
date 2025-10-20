import React from 'react';
import { useStore } from '../state/store';

// PUBLIC_INTERFACE
export default function TutorialCard({ tutorial }) {
  /** Card for a tutorial with favorite toggle. */
  const { state, dispatch } = useStore();
  const fav = state.tutorials.favorites.includes(tutorial.id);

  return (
    <div className="card" role="article" aria-label={`Tutorial ${tutorial.title}`}>
      <h4 style={{margin:'0 0 .5rem 0'}}>{tutorial.title}</h4>
      <p className="muted" style={{marginTop:0}}>{tutorial.summary}</p>
      <div style={{display:'flex', gap:'.5rem', alignItems:'center', marginTop:'.5rem'}}>
        <button
          className={`btn ${fav ? '' : 'ghost'}`}
          onClick={() => dispatch({ type: 'tutorials/toggleFavorite', payload: tutorial.id })}
          aria-label={`${fav ? 'Remove from' : 'Add to'} favorites`}
        >
          {fav ? '★ Favorited' : '☆ Favorite'}
        </button>
        <span className="muted">{tutorial.duration}</span>
      </div>
    </div>
  );
}
