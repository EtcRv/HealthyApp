export const USER_UPDATE = 'user/UPDATE';
export const APP_UPDATE_STATE = 'app/UPDATE_STATE';
export const UPDATE_ALL_STORE = 'app/UPDATE_ALL_STORE';
export const updateUser = (payload: any) => ({type: USER_UPDATE, payload});

export const updateAppState = (payload: boolean) => ({
  type: APP_UPDATE_STATE,
  payload,
});