import {
  Image,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {dienlucImg, covid19Img} from '@assets';
import {TAB_LOGIN, TAB_REGISTER, navigate} from '@navigation';

const AuthenticationScreen = () => {
  const clickBtn = (page: string) => {
    if (page === 'login') {
      navigate(TAB_LOGIN);
    } else if (page === 'register') {
      navigate(TAB_REGISTER);
    }
  };

  return (
    <SafeAreaView style={styles.view}>
      <Image source={dienlucImg} style={styles.image}></Image>
      <View style={styles.bodyContent}>
        <Image source={covid19Img}></Image>
        <Text style={styles.title}>
          An toàn cho bản thân và xã hội trước Covid-19
        </Text>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => clickBtn('login')}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => clickBtn('register')}>
          <Text
            style={{
              color: '#007AFF',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Đăng ký
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  bodyContent: {
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 21,
    fontWeight: 'bold',
    color: '#1ce983',
  },
  image: {
    width: 150,
    height: 150,
  },
  buttonWrapper: {
    marginVertical: 20,
    maxWidth: 242,
    alignSelf: 'center',
    width: '100%',
  },
  loginBtn: {
    marginVertical: 8,
    width: '100%',
    borderRadius: 4,
    backgroundColor: '#007AFF',
    borderWidth: 2,
    borderColor: '#007AFF',
    paddingVertical: 8,
  },
  registerBtn: {
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#007AFF',
    paddingVertical: 8,
  },
});

export default AuthenticationScreen;
