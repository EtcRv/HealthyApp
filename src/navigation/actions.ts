import {StackActions} from '@react-navigation/native';
import {navRef} from './navigator';

export function push(name: string, params?: any) {
  if (navRef.current) {
    navRef.current?.dispatch(StackActions.push(name, params));
  }
}

export function navigate(name: string, params?: any) {
  if (navRef.current) {
    navRef.current?.navigate(name, params);
  }
}

export function back() {
  if (navRef.current) {
    navRef.current?.goBack();
  }
}

export function replace(name: string, params?: any) {
  if (navRef.current) {
    navRef.current?.dispatch(StackActions.replace(name, params));
  }
}

export function reset(name: string, params?: any) {
  navRef.current?.dispatch(StackActions.popToTop());
  replace(name, params);
}