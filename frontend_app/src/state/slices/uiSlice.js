export const uiInitialState = {
  theme: 'light',
  sidebarOpen: true,
};

export function uiReducer(state = uiInitialState, action) {
  switch (action.type) {
    case 'ui/toggleTheme':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case 'ui/setTheme':
      return { ...state, theme: action.payload };
    case 'ui/toggleSidebar':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'ui/setSidebar':
      return { ...state, sidebarOpen: !!action.payload };
    default:
      return state;
  }
}
