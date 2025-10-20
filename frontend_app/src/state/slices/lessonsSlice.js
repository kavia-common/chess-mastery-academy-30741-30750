import lessonsData from '../../mock/lessons.json';

export const lessonsInitialState = {
  items: lessonsData,
  progress: {}, // { [lessonId]: { completed: boolean, score?: number } }
};

export function lessonsReducer(state = lessonsInitialState, action) {
  switch (action.type) {
    case 'lessons/markComplete': {
      const { id, score } = action.payload;
      return {
        ...state,
        progress: {
          ...state.progress,
          [id]: { completed: true, score: typeof score === 'number' ? score : state.progress[id]?.score },
        },
      };
    }
    case 'lessons/resetProgress':
      return { ...state, progress: {} };
    default:
      return state;
  }
}
