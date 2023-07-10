import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

type ButtonProps = {
  title: string;
  disabled?: boolean;
  onPress?: () => void;
};

export const RoundButton = ({
  title = 'Button',
  disabled = false,
  onPress,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.Button}
      disabled={disabled}
      onPress={onPress}>
      <Text style={styles.Text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Button: {
    width: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  Text: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#f0ffff',
  },
});
