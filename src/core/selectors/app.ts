export const selectUser = ({app}: any) => app.user;

export const selectAppState = ({app, _persist}: any) => ({
  appState: app.appState,
  rehydrate: _persist.rehydrate,
});