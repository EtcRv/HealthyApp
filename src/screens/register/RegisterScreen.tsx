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
import {TAB_LOGIN, navigate} from '@navigation';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const changePage = (pageName: string) => {
    if (pageName === 'login') {
      navigate(TAB_LOGIN);
    }
  };
  const database = firebase
    .app()
    .database(
      'https://healthy-app-5dab0-default-rtdb.asia-southeast1.firebasedatabase.app/',
    )
    .ref('/users');

  const submitForm = () => {
    if (name === '' || email === '' || password === '' || rePassword === '') {
      setError('Xin hãy nhập đủ các trường bên trên!');
    } else if (!email.includes('@')) {
      setError('Trường email nhập không đúng dạng!');
    } else if (password !== rePassword) {
      setError('Mật khẩu nhập lại không khớp');
    } else {
      setError('');
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res): any => {
          const newReference = database.push();

          newReference
            .set({
              user: {
                uuid: res.user.uid,
                name: name,
                email: email,
                age: 0,
                gender: '',
                quequan: '',
                noio: '',
              },
            })
            .then(() => {
              setSuccess('Tạo tài khoản thành công');
              setEmail('');
              setName('');
              setPassword('');
              setRePassword('');
              // navigate(TAB_LOGIN)
            });
        })
        .catch(err => {
          if (err.code === 'auth/email-already-in-use') {
            setError('The email address is already in use by another account.');
          }
          console.log('error:', err);
        });
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <AuthenticationHeader />
      <View style={styles.content}>
        <View style={{maxHeight: 100, height: '100%', paddingVertical: 20}}>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000'}}>
            Tạo tài khoản!
          </Text>
          <Text style={{fontSize: 16, color: '#000'}}>
            Hãy nhập các thông tin dưới đây để tạo tài khoản mới
          </Text>
        </View>
        <View style={{marginBottom: 20}}>
          <Input.FloatingInput
            label={'Họ và tên'}
            value={name}
            setValue={setName}
            secureTextEntry={false}
          />
          <Input.FloatingInput
            label={'Email'}
            value={email}
            setValue={setEmail}
            secureTextEntry={false}
          />
          <Input.FloatingInput
            label={'Mật khẩu'}
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
          <Input.FloatingInput
            label={'Nhập lại mật khẩu'}
            value={rePassword}
            setValue={setRePassword}
            secureTextEntry={true}
          />
        </View>
        {error !== '' && (
          <Text style={{color: '#d72020', marginVertical: 4}}>{error}</Text>
        )}
        {success !== '' && (
          <Text style={{color: '#13c26a', marginVertical: 4}}>{success}</Text>
        )}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.loginBtn} onPress={submitForm}>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              ĐĂNG KÝ
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={{fontWeight: '500', fontSize: 12, color: '#76727a'}}>
              Bạn đã có tài khoản?{' '}
            </Text>
            <TouchableOpacity onPress={() => changePage('login')}>
              <Text style={{fontSize: 12, color: '#76727a'}}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
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

export default RegisterScreen;
