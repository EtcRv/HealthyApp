import {AuthenticationHeader} from '@components';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {Input} from '@components';
import {useState} from 'react';
import {googleIconImg} from '@assets';
import {navigate, TAB_FORGETPASSWORD, TAB_REGISTER} from '@navigation';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import {useDispatch} from 'react-redux';
import {updateAppState, updateUser} from '@core';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '146476586304-uvnl7rn87jclk7tvkdqb13eu9c7h3cng.apps.googleusercontent.com',
});

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const usersDatabase = firebase
    .app()
    .database(
      'https://healthy-app-5dab0-default-rtdb.asia-southeast1.firebasedatabase.app/',
    )
    .ref('/users');

  const changePage = (pageName: string) => {
    if (pageName === 'register') {
      navigate(TAB_REGISTER);
    } else if (pageName === 'forgetPassword') {
      navigate(TAB_FORGETPASSWORD);
    }
  };

  const login = () => {
    if (email === '' || password === '') {
      setError('Xin hãy nhập đủ các trường bên trên!');
    } else if (!email.includes('@')) {
      setError('Trường email nhập không đúng dạng!');
    } else {
      setError('');
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          usersDatabase.on('value', snapshot => {
            snapshot.forEach((childSnapshot): any => {
              const childData = childSnapshot.val();
              if (childData.user.email === email) {
                dispatch(
                  updateUser({
                    uuid: childData.user.uuid,
                    email: childData.user.email,
                    name: childData.user.name,
                    age: childData.user.age,
                    gender: childData.user.gender,
                    noio: childData.user.noio,
                    quequan: childData.user.quequan,
                  }),
                );
                dispatch(updateAppState(true));
              }
            });
          });
        })
        .catch(err => {
          if (err.code === 'auth/wrong-password') {
            setError(
              'The password is invalid or the user does not have a password',
            );
          }
          console.log('err: ', err);
        });
    }
  };

  const onRestore = (user: any) => {
    let flag = false;
    usersDatabase.on('value', snapshot => {
      snapshot.forEach((childSnapshot): any => {
        const childData = childSnapshot.val();
        if (childData.user.uuid === user.id) {
          flag = true;
          dispatch(
            updateUser({
              uuid: childData.user.uuid,
              email: childData.user.email,
              name: childData.user.name,
              age: childData.user.age,
              gender: childData.user.gender,
              noio: childData.user.noio,
              quequan: childData.user.quequan,
            }),
          );
        }
      });
    });

    if (!flag) {
      const newReference = usersDatabase.push();

      newReference
        .set({
          user: {
            uuid: user.id,
            name: user.name,
            email: user.email,
            age: 0,
            gender: '',
            quequan: '',
            noio: '',
          },
        })
        .then(() => {
          dispatch(
            updateUser({
              uuid: user.id,
              email: user.email,
              name: user.name,
              age: 0,
              gender: '',
              noio: '',
              quequan: '',
            }),
          );
        });
    }
  };

  const onSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      const currentUser = await GoogleSignin.getCurrentUser();
      onRestore(currentUser?.user);
      dispatch(updateAppState(true));
    } catch (err: any) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (err.code === statusCodes.IN_PROGRESS) {
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError('Can not connect to Google Drive! Please try again later.');
      } else {
        console.log('error: ', err);
      }
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <AuthenticationHeader />
      <View style={styles.content}>
        <View style={{maxHeight: 100, height: '100%', paddingVertical: 20}}>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: '#000'}}>
            Xin chào!
          </Text>
          <Text style={{fontSize: 16, color: '#000'}}>
            Hãy đăng nhập để tiếp tục
          </Text>
        </View>
        <View style={{marginBottom: 20}}>
          <Input.FloatingInput
            label={'Email'}
            value={email}
            setValue={setEmail}
            secureTextEntry={false}
          />
          <Input.FloatingInput
            label={'Password'}
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
        </View>
        {error !== '' && (
          <Text style={{color: '#d72020', marginVertical: 4}}>{error}</Text>
        )}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.loginBtn} onPress={login}>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              ĐĂNG NHẬP
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: '100%', alignItems: 'center', marginBottom: 20}}
            onPress={() => changePage('forgetPassword')}>
            <Text style={{color: '#666', fontWeight: '500'}}>
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#7c7979',
                height: 0,
                flex: 0.4,
              }}
            />
            <Text style={{color: '#1d0bd4'}}>Hoặc</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#7c7979',
                height: 0,
                flex: 0.4,
              }}
            />
          </View>
          <View style={{alignItems: 'center', marginTop: 10}}>
            <Text style={{fontWeight: '600', fontSize: 14, color: '#76727a'}}>
              Đăng nhập bằng tài khoản
            </Text>
            <View>
              <TouchableOpacity onPress={onSignIn}>
                <Image
                  source={googleIconImg}
                  style={{width: 60, height: 60}}></Image>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: '500', fontSize: 12, color: '#76727a'}}>
              Bạn chưa có tài khoản?{' '}
            </Text>
            <TouchableOpacity onPress={() => changePage('register')}>
              <Text style={{fontSize: 12, color: '#76727a'}}>Đăng ký</Text>
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
export default LoginScreen;
