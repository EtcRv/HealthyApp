import {combineReducers} from 'redux';
import {APP_UPDATE_STATE, USER_UPDATE} from '../actions';

type Action = {
  type: string;
  payload?: any;
};

type UserState = {
  uuid: string;
  email: string;
  name: string;
  age: number;
  gender: string;
  noio: string;
  quequan: string;
};

const initUser: UserState = {
  uuid: '',
  email: '',
  name: '',
  age: 0,
  gender: '',
  noio: '',
  quequan: '',
};

const user = (state: UserState = initUser, action: Action): UserState => {
  switch (action.type) {
    case USER_UPDATE:
      return {...state, ...action.payload};
    default:
      return state;
  }
};

const appState = (state: boolean = false, action: Action) => {
  switch (action.type) {
    case APP_UPDATE_STATE:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  user,
  appState,
});
