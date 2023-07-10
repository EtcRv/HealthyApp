import {all, put, takeLatest} from 'redux-saga/effects';
import {updateAppState, updateUser, UPDATE_ALL_STORE} from '../actions';

function* save({payload}: any) {
  yield put(updateUser(payload.app.user));
  yield put(updateAppState(payload.app.appState));
}

function* appSaga() {
  yield all([takeLatest(UPDATE_ALL_STORE, save)]);
}

export default appSaga;
