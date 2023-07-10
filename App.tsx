import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {configureStore} from '@utils';
import {rootReducer, rootSaga} from '@core';
import {MenuProvider} from 'react-native-popup-menu';
import {Routes} from '@navigation';

const {store, persistor} = configureStore(rootReducer, rootSaga);

const Root = () => {
  return (
    <MenuProvider>
      <Routes />
    </MenuProvider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
};

export default App;