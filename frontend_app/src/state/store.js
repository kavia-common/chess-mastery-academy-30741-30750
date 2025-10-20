import React, { createContext, useContext, useMemo, useReducer, useEffect } from 'react';
import { uiInitialState, uiReducer } from './slices/uiSlice';
import { lessonsInitialState, lessonsReducer } from './slices/lessonsSlice';
import { tutorialsInitialState, tutorialsReducer } from './slices/tutorialsSlice';
import { gameInitialState, gameReducer } from './slices/gameSlice';

const StoreContext = createContext(null);

function combineReducers(reducers) {
  return (state, action) =>
    Object.keys(reducers).reduce((next, key) => {
      next[key] = reducers[key](state[key], action);
      return next;
    }, {});
}

const rootReducer = combineReducers({
  ui: uiReducer,
  lessons: lessonsReducer,
  tutorials: tutorialsReducer,
  game: gameReducer,
});

const initialState = {
  ui: uiInitialState,
  lessons: lessonsInitialState,
  tutorials: tutorialsInitialState,
  game: gameInitialState,
};

// PUBLIC_INTERFACE
export function StoreProvider({ children }) {
  /**
   * Global store provider.
   * Hydrates progress from localStorage and persists on change.
   */
  const [state, dispatch] = useReducer(rootReducer, initialState, (base) => {
    try {
      const persisted = JSON.parse(localStorage.getItem('cma_progress') || '{}');
      return {
        ...base,
        lessons: {
          ...base.lessons,
          progress: persisted.progress || {},
        },
      };
    } catch {
      return base;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cma_progress', JSON.stringify({ progress: state.lessons.progress }));
    } catch {
      // ignore
    }
  }, [state.lessons.progress]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

// PUBLIC_INTERFACE
export function useStore() {
  /** Access the global store context. */
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
