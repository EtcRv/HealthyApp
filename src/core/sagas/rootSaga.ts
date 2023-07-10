import {all} from 'redux-saga/effects';
import appSaga from './app';

function* rootSaga() {
  yield all([appSaga()]);
}

export default rootSaga;
