import {applyMiddleware, createStore, compose} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

const SHOW_LOG_REDUX = false;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: [],
};

export const configureStore = (
  rootReducer: any,
  rootSaga: any,
  mode = 'production',
) => {
  const middleware = [];
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);
  let composeEnhancers = compose;
  if (SHOW_LOG_REDUX && mode !== 'production') {
    // middleware.push(createLogger());
  }

  const enhancer = composeEnhancers(applyMiddleware(...middleware));
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, enhancer);
  // console.log('store:', store.getState());
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return {store, persistor};
};

export default configureStore;