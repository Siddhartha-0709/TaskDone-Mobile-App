/* eslint-disable jsx-quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { Alert, SafeAreaView, StatusBar,  Text,  TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {
    const navigation = useNavigation();
    const checkLoggedIn = async () => {
        const user = await AsyncStorage.getItem('user');
        if (user) {
            navigation.navigate('Todo', { user: JSON.parse(user) });
        }
    };
    useEffect(() => {
        checkLoggedIn();
    });
    return (
        <SafeAreaView style={{ backgroundColor: '#FFFFFF', height: '100%' }} keyboardShouldPersistTaps='handled' automaticallyAdjustKeyboardInsets={true} >
            <StatusBar barStyle="dark-content" backgroundColor={'#FFFFFF'} />
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <Text style={{ color: '#131313', fontFamily: 'Ubuntu-Bold', fontSize: 24, paddingLeft: 10 }}>TaskDone</Text>
                <LottieView source={require('../component/animations/tick.json')} autoPlay loop style={{ width: 100, height: 100, position: 'absolute', top: -24, left: 100 }} />
            </View>
            <View style={{ alignItems: 'center', height: 400, marginTop: 90 }}>
                <LottieView source={require('../component/animations/Clock.json')} autoPlay loop style={{ width: 400, height: 400 }} />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                {/* <Text style={{ color: '#131313', fontFamily:'Ubuntu-Regular', fontSize: 30, fontWeight: 'bold', marginRight:70}}>TaskDone</Text> */}
                {/* <LottieView source={require('../component/animations/tick.json')} autoPlay loop  speed={2} style={{ width: 120, height: 120, position: 'absolute', left: 210 }}/> */}
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={{ color: '#131313', fontFamily: 'Ubuntu-Light', fontSize: 17, paddingLeft: 10, paddingRight: 10, textAlign: 'center' }}>
                    Synergize your tasks with seamless precision, experience enhanced productivity, and leverage intuitive interfaces to streamline your workflow.
                </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 50 }}>
                <TouchableOpacity style={{ elevation: 8, backgroundColor: '#000000', width: 180, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => { navigation.navigate('Signup');}}>
                    <Text style={{ color: '#FFFFFF', fontFamily: 'Ubuntu-Light', fontSize: 16 }}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ elevation: 8, backgroundColor: '#000000', width: 180, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => { navigation.navigate('Login');}}>
                    <Text style={{ color: '#FFFFFF', fontFamily: 'Ubuntu-Light', fontSize: 16 }}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Home;

