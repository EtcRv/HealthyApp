import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useState} from 'react';

const PredictCovidScreen = () => {
  const [sot, setSot] = useState(false);
  const [ho, setHo] = useState(false);
  const [viemhong, setViemhong] = useState(false);
  const [khotho, setKhotho] = useState(false);
  const [daudau, setDaudau] = useState(false);

  const onSubmitForm = () => {
    console.log('Hello: ');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text
        style={{
          marginVertical: 20,
          fontSize: 28,
          fontWeight: 'bold',
          width: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#000',
        }}>
        Các triệu chứng mà bạn đang mắc phải
      </Text>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 40,
          alignItems: 'center',
          marginVertical: 20,
        }}>
        <View style={styles.dauhieu}>
          <Text style={styles.text}>Sốt</Text>
          <CheckBox value={sot} onValueChange={newValue => setSot(newValue)} />
        </View>
        <View style={styles.dauhieu}>
          <Text style={styles.text}>Ho</Text>
          <CheckBox value={ho} onValueChange={newValue => setHo(newValue)} />
        </View>
        <View style={styles.dauhieu}>
          <Text style={styles.text}>Viêm họng</Text>
          <CheckBox
            value={viemhong}
            onValueChange={newValue => setViemhong(newValue)}
          />
        </View>
        <View style={styles.dauhieu}>
          <Text style={styles.text}>Khó thở</Text>
          <CheckBox
            value={khotho}
            onValueChange={newValue => setKhotho(newValue)}
          />
        </View>
        <View style={styles.dauhieu}>
          <Text style={styles.text}>Đau đầu</Text>
          <CheckBox
            value={daudau}
            onValueChange={newValue => setDaudau(newValue)}
          />
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.btn} onPress={onSubmitForm}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            CHẨN ĐOÁN
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dauhieu: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  text: {
    fontSize: 24,
    color: '#000',
  },
  buttonWrapper: {
    marginVertical: 20,
    maxWidth: 242,
    alignSelf: 'center',
    width: '100%',
  },
  btn: {
    marginVertical: 8,
    width: '100%',
    borderRadius: 4,
    backgroundColor: '#1f0ec7',
    borderWidth: 2,
    borderColor: '#1f0ec7',
    paddingVertical: 8,
  },
});

export default PredictCovidScreen;
