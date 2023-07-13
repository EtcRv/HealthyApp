import React, {useState} from 'react'
import {SafeAreaView, Text, StyleSheet, TouchableOpacity, View, Image, Animated} from 'react-native';
import {Input} from '@components';

const HomeScreen = () => {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [hometown, setHometown] = useState('')
  const [address, setAddress] = useState('')

  const [arrowAnimationValue] = useState(new Animated.Value(0))
  const [optionsAnimationValue] = useState(new Animated.Value(0))

  const animation = () => {
    const value = arrowAnimationValue._value === 1 ? 0 : 1
    Animated.parallel([
      Animated.timing(arrowAnimationValue, {
        duration: 200,
        toValue: value,
      }),
      Animated.timing(optionsAnimationValue, {
        duration: 200,
        toValue: value,
      })
    ]).start()
  }

  const renderOptions = () => {
    return (
      <View style={{ 
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // backgroundColor: 'red'
      }}>
        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={() => setGender('Nam')}>
          <Animated.View style={[
              {height: optionsAnimationValue.interpolate({
                inputRange: [0 , 1],
                outputRange: [0, 50]
              })},
              styles.optionRow
            ]}>
            <Text style={styles.optionsText(gender === 'Nam' ? true : false)}>Nam</Text>
            <Image 
              resizeMode='contain'
              style={styles.ic_circle}
              source={gender === 'Nam' ? require('../../assets/image/selected.png') : require('../../assets/image/circle.png')} />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={() => setGender('Nữ')}>
          <Animated.View style={[
              {height: optionsAnimationValue.interpolate({
                inputRange: [0 , 1],
                outputRange: [0, 50]
              })},
              styles.optionRow
            ]}>
            <Text style={styles.optionsText(gender === 'Nữ' ? true : false)}>Nữ</Text>
            <Image 
              resizeMode='contain'
              style={styles.ic_circle}
              source={gender === 'Nữ' ? require('../../assets/image/selected.png') : require('../../assets/image/circle.png')} />
          </Animated.View>
        </TouchableOpacity>
      </View>
      
    )
  }

  const createField = (inputKey, label, value, setValue, secureTextEntry) => {
    if(inputKey === 'gender') {
      return (
        <View>
          <Text style={styles.pickerTitle}>Giới tính</Text>
          <TouchableOpacity 
            onPress={() => animation()}
            activeOpacity={0.7}
            style={styles.picker}>
            <Text style={styles.pickerText}>{gender}</Text>
            <Animated.Image 
              style={[
                styles.icArrow,
                {transform: [{
                  rotate: arrowAnimationValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['180deg', '0deg'],
                  })
                }]}
              ]}
              source={require('../../assets/image/arrow-down.png')}/>
          </TouchableOpacity>
          {renderOptions()}
        </View>
      )
    }
    return (
      <Input.FloatingInput
        label={label}
        value={value}
        setValue={setValue}
        secureTextEntry={secureTextEntry}
      />
    )
  }

  const createButton = () => {
    return (
      <TouchableOpacity 
        activeOpacity={0.7}
        onPress={() => {
          const formData = {
            name: name,
            age: age,
            gender: gender,
            hometown: hometown,
            address: address
          }
          console.log('formData', formData)
        }}
        style={styles.button}>
        <Text style={styles.buttonText}>Lưu thông tin</Text>
      </TouchableOpacity>
    )
  }

  const renderProfile = () =>  {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Thông tin cá nhân</Text>
        {createField('name', 'Họ và tên', name, setName, false)}
        {createField('age', 'Tuổi', age, setAge, false)}
        {createField('gender',  'Giới tính', gender, setGender, false)}
        {createField('hometown', 'Quên quán', hometown, setHometown, false)}
        {createField('address', 'Nơi ở hiện tại', address, setAddress, false)}
        {createButton()}
      </SafeAreaView>
    )
  }


  return (
    <SafeAreaView>
      {/* <Text>Hello this is home screen</Text> */}
      {renderProfile()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12
  },
  title: {
    fontSize: 20, 
    fontWeight: 'bold',
    paddingVertical: 16,
    color: 'black'
  },
  button: {
    width: '100%',
    marginTop: 40,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    paddingVertical: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center'
  },
  picker: {
    marginTop: 16,
    borderBottomColor: '#8d8888',
    borderBottomWidth: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  pickerText: {
    fontSize: 16,
    paddingHorizontal: 4,
    color: 'black'
  },
  pickerTitle: {
    marginTop: 6
  },
  icArrow: {
    width: 14,
    height: 16,
    marginHorizontal: 4
  },
  optionRow: {
    flexDirection: 'row',
    marginHorizontal: 5,
    paddingHorizontal: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomColor: '#8d8888',
    borderBottomWidth: 0.3
  },
  ic_circle: {
    width: 14,
    // height: 14,
    height: '100%'
  },
  optionsText: (selected) => {
    return {
      fontSize: 16, 
      paddingHorizontal: 10,
      color: selected ? 'green' : 'black'
    }
  },
  
})

export default HomeScreen;
