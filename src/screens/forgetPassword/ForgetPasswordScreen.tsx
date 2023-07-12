import {AuthenticationHeader} from '@components';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import {Input} from '@components';
import {useState} from 'react';
import auth from '@react-native-firebase/auth';

const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');

  const getNewPassword = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmail('');
        setSuccess('Kiểm tra mail để cập nhật mật khẩu của bạn!');
      });
  };

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <AuthenticationHeader />
      <View style={styles.content}>
        <View style={{maxHeight: 100, height: '100%', paddingVertical: 20}}>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000'}}>
            Quên mật khẩu!
          </Text>
          <Text style={{fontSize: 16, color: '#000'}}>
            Hãy nhập email để lấy lại mật khẩu
          </Text>
        </View>
        <View style={{marginBottom: 20}}>
          <Input.FloatingInput
            label={'Email'}
            value={email}
            setValue={setEmail}
            secureTextEntry={false}
          />
        </View>
        {success !== '' && (
          <Text style={{color: '#13c26a', marginVertical: 4}}>{success}</Text>
        )}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.loginBtn} onPress={getNewPassword}>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              LẤY MẬT KHẨU MỚI
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 40,
    flex: 1,
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
    backgroundColor: '#1f0ec7',
    borderWidth: 2,
    borderColor: '#1f0ec7',
    paddingVertical: 8,
  },
});

export default ForgetPasswordScreen;
