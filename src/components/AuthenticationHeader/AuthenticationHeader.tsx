import Icon from 'react-native-vector-icons/Feather';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {back} from '@navigation';

const AuthenticationHeader = () => {
  return (
    <View style={styles.bar}>
      <View style={styles.pin}>
        <TouchableOpacity onPress={() => back()}>
          <Icon name="chevron-left" size={24} color="#080808" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
  },
  pin: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 16,
    height: '100%',
  },
});

export default AuthenticationHeader;
