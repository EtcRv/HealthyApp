import React, {useState, useRef} from 'react';
import {Animated, Easing, TextInput, StyleSheet} from 'react-native';

const FloatingInput = ({
  label = 'New Title',
  titleActiveSize = 12,
  titleInActiveSize = 14,
  titleActiveColor = '#8d8888',
  titleInactiveColor = '#8d8888',
  value = '',
  setValue,
  secureTextEntry,
}: any) => {
  const onChangeText = (text: string) => setValue(text);
  const animatedValue = useRef(new Animated.Value(0));

  const returnAnimatedTitleStyles = {
    transform: [
      {
        translateY: animatedValue?.current?.interpolate({
          inputRange: [0, 1],
          outputRange: [22, -4],
          extrapolate: 'clamp',
        }),
      },
    ],
    fontSize: animatedValue?.current?.interpolate({
      inputRange: [0, 1],
      outputRange: [titleInActiveSize, titleActiveSize],
      extrapolate: 'clamp',
    }),
    color: animatedValue?.current?.interpolate({
      inputRange: [0, 1],
      outputRange: [titleInactiveColor, titleActiveColor],
    }),
  };

  const viewStyles = {
    borderBottomColor: animatedValue?.current?.interpolate({
      inputRange: [0, 1],
      outputRange: [titleInactiveColor, titleActiveColor],
    }),
    borderBottomWidth: 0.8,
  };
  const onFocus = () => {
    Animated.timing(animatedValue?.current, {
      toValue: 1,
      duration: 500,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  };

  const onBlur = () => {
    if (!value) {
      Animated.timing(animatedValue?.current, {
        toValue: 0,
        duration: 500,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <Animated.View style={[styles.subContainer, viewStyles]}>
      <Animated.Text style={[returnAnimatedTitleStyles]}>{label}</Animated.Text>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        style={styles.textStyle}
        onBlur={onBlur}
        onFocus={onFocus}
        secureTextEntry={secureTextEntry}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    paddingTop: 10,
  },
  textStyle: {
    paddingBottom: 10,
    fontSize: 16,
  },
});

export default FloatingInput;
