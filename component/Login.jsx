/* eslint-disable jsx-quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {  Text, View, StatusBar, Alert, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import LoaderKit from 'react-native-loader-kit'; // Make sure you have this package installed
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const [loader, setLoader] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const handleLogin = async () => {
        setLoader(true);
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        console.log('Email:', email);
        console.log('Password:', password);
        // Simulate a network request
        try {
            const response = await axios.post('https://lobster-app-lh22k.ondigitalocean.app/api/todo/v1/user/login', {
                email,
                password,
            });
            console.log(response.data);
            await AsyncStorage.setItem('user',JSON.stringify(response.data.user));
            navigation.navigate('Todo', { user: response.data.user });
        }
        catch (err) {
            Alert.alert('Error', err.response.data.message);
            console.log(err);
        }
        finally {
            setLoader(false);
        }

    };

    return (
        <>
            {loader ? (
                <View style={{ backgroundColor: '#FFFFFF', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <LoaderKit
                        style={{ width: 60, height: 60 }}
                        name={'BallPulse'}
                        color={'#604CC3'}
                    />
                    <Text style={{ color: '#131313', fontFamily: 'Ubuntu-Regular', fontSize: 18, textAlign: 'center' }}>Please Wait...</Text>
                </View>
            ) : (
                <ScrollView style={{ backgroundColor: '#FFFFFF', height: '100%' }} keyboardShouldPersistTaps='handled' automaticallyAdjustKeyboardInsets={true}>
                    <StatusBar barStyle="dark-content" backgroundColor={'#FFFFFF'} />
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={{ color: '#131313', fontFamily: 'Ubuntu-Bold', fontSize: 24, paddingLeft: 10 }}>TaskDone</Text>
                        <LottieView source={require('../component/animations/tick.json')} autoPlay loop style={{ width: 100, height: 100, position: 'absolute', top: -24, left: 100 }} />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>
                        <LottieView source={require('../component/animations/Login.json')} speed={1.5}  autoPlay loop style={{ width: 500, height: 500 }} />
                    </View>
                    <View style={{ justifyContent: 'center', paddingLeft: 60 }}>
                        <Text style={{ color: '#131313', fontFamily: 'Ubuntu-Regular', fontSize: 24, marginRight: 70 }}>Login To Your Account</Text>
                        <Text style={{ color: '#131313', fontFamily: 'Ubuntu-Light', fontSize: 18, marginRight: 70 }}>Your step towards productivity!</Text>
                    </View>
                    <View style={{ marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <TextInput
                            placeholder='Enter Email'
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
                            placeholder='Enter Password'
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
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
                            onPress={handleLogin}
                        >
                            <Text style={{ color: '#FFFFFF', fontFamily: 'Ubuntu-Light', fontSize: 16 }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}
        </>
    );
};

export default Login;

