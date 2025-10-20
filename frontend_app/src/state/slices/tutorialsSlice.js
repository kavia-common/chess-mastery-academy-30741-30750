import tutorialsData from '../../mock/tutorials.json';

export const tutorialsInitialState = {
  items: tutorialsData,
  favorites: [],
};

export function tutorialsReducer(state = tutorialsInitialState, action) {
  switch (action.type) {
    case 'tutorials/toggleFavorite': {
      const id = action.payload;
      const exists = state.favorites.includes(id);
      return {
        ...state,
        favorites: exists ? state.favorites.filter(x => x !== id) : [...state.favorites, id],
      };
    }
    default:
      return state;
  }
}
