/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import LoaderKit from 'react-native-loader-kit';

import axios from 'axios';
const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const handleSubmit = async () => {
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    try {
      setLoader(true);
      const response = await axios.post(
        'https://lobster-app-lh22k.ondigitalocean.app/api/todo/v1/user/create',
        {
          name,
          email,
          password,
        }
      );
      console.log(response.data);
      Alert.alert('Success', response.data.message);
      navigation.navigate('Login');
    } catch (err) {
      Alert.alert('Error', err.response.data.message);
      console.log(err);
    } finally {
      setLoader(false);
    }
    // You can also navigate to the Login screen here if needed
    // navigation.navigate('Login');
  };

  return (
    <>
      {loader ? (
        <>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <LoaderKit
              style={{ width: 60, height: 60 }}
              name={'BallPulse'} // Optional: see list of animations below
              color={'#604CC3'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
            />
            <Text
              style={{
                color: '#131313',
                fontFamily: 'Ubuntu-Regular',
                fontSize: 18,
                textAlign: 'center',
              }}
            >
              Please Wait...
            </Text>
          </View>
        </>
      ) : (
        <ScrollView
          style={{ backgroundColor: '#FFFFFF', height: '100%' }}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets={true}
        >
          <StatusBar barStyle="dark-content" backgroundColor={'#FFFFFF'} />
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <Text style={{ color: '#131313', fontFamily: 'Ubuntu-Bold', fontSize: 24, paddingLeft: 10 }}>TaskDone</Text>
            <LottieView source={require('../component/animations/tick.json')} autoPlay loop style={{ width: 100, height: 100, position: 'absolute', top: -24, left: 100 }} />
          </View>
          <View style={{ alignItems: 'center', height: 400, marginTop: 30 }}>
            <LottieView
              source={require('../component/animations/Calender.json')}
              autoPlay
              loop
              style={{ width: 400, height: 400 }}
            />
          </View>
          <View style={{ justifyContent: 'center', paddingLeft: 60 }}>
            <Text
              style={{
                color: '#131313',
                fontFamily: 'Ubuntu-Regular',
                fontSize: 24,
                marginRight: 70,
              }}
            >
              Create To Your Account
            </Text>
            <Text
              style={{
                color: '#131313',
                fontFamily: 'Ubuntu-Light',
                fontSize: 18,
                marginRight: 70,
              }}
            >
              Begin your journey with TaskDone
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextInput
              placeholder="Enter your Name"
              placeholderTextColor={'#000000'}
              value={name}
              onChangeText={setName}
              style={{
                fontSize: 16,
                fontFamily: 'Ubuntu-Light',
                borderWidth: 1,
                borderColor: '#000000',
                width: 300,
                height: 40,
                borderRadius: 10,
                paddingLeft: 10,
                margin: 5,
                color: '#000000',
              }}
            />
            <TextInput
              placeholder="Enter Email"
              placeholderTextColor={'#000000'}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="email"
              textContentType="emailAddress"
              spellCheck={false}
              style={{
                fontSize: 16,
                fontFamily: 'Ubuntu-Light',
                borderWidth: 1,
                borderColor: '#000000',
                width: 300,
                height: 40,
                borderRadius: 10,
                paddingLeft: 10,
                margin: 5,
                color: '#000000',
              }}
            />
            <TextInput
              placeholder="Enter Password"
              placeholderTextColor={'#000000'}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={{
                fontSize: 16,
                fontFamily: 'Ubuntu-Light',
                borderWidth: 1,
                borderColor: '#000000',
                width: 300,
                height: 40,
                borderRadius: 10,
                paddingLeft: 10,
                margin: 5,
                color: '#000000',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={{
                elevation: 8,
                backgroundColor: '#000000',
                width: 300,
                height: 40,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={handleSubmit}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'Ubuntu-Light',
                  fontSize: 16,
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default Signup;

