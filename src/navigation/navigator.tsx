import {connect} from 'react-redux';
import * as names from './routeNames';
import * as Screens from '@screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {options, screenOptions} from './navigation.constants';
import {selectAppState} from '@core';
import {createRef} from 'react';

export const navRef = createRef<any>();

type NavProps = {
  appState: boolean;
};

const Stack = createNativeStackNavigator();

const Navigator = ({appState}: NavProps) => {
  switch (appState) {
    case true:
      return (
        <Stack.Navigator screenOptions={options}>
          <Stack.Screen
            options={options}
            component={Screens.AuthenticationScreen}
            name={names.TAB_AUTHENTICATION}
          />
        </Stack.Navigator>
      );
    default:
      return (
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
            component={Screens.AuthenticationScreen}
            options={options}
            name={names.TAB_AUTHENTICATION}
          />
          <Stack.Screen
            component={Screens.LoginScreen}
            options={options}
            name={names.TAB_LOGIN}
          />
          <Stack.Screen
            component={Screens.RegisterScreen}
            options={options}
            name={names.TAB_REGISTER}
          />
          <Stack.Screen
            component={Screens.ForgetPasswordScreen}
            options={options}
            name={names.TAB_FORGETPASSWORD}
          />
        </Stack.Navigator>
      );
  }
};

const Container = (props: any) => {
  return (
    <NavigationContainer ref={navRef}>
      <Navigator {...props} />
    </NavigationContainer>
  );
};

export default connect(selectAppState)(Container);
