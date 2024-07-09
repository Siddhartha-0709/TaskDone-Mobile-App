/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {  Text, View, StatusBar, TouchableOpacity, ScrollView, Modal, TextInput, Alert,BackHandler } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {  useNavigation, useRoute } from '@react-navigation/native';
import Svg, {  Path,  Line } from 'react-native-svg';
import { useState, useEffect } from 'react';
import LoaderKit from 'react-native-loader-kit';
import axios from 'axios';
const Todo = () => {
    const route = useRoute();
    const { user } = route.params;
    console.log(user);
    const email = user.email;
    console.log('Email:', email);
    user.name = user.name + ' ';
    const name = user.name.substr(0, user.name.indexOf(' '));
    const [loader, setLoader] = useState(false);
    const [todos, setTodos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const getTodos = async () => {
        try {
            setLoader(true);
            const response = await axios.post('https://lobster-app-lh22k.ondigitalocean.app/api/todo/v1/todo/get', {
                userEmail: email,
            });
            console.log(response.data);
            setTodos(response.data.todos);
        }
        catch (err) {
            console.log(err);
            Alert.alert('Error', err.response.data.message);
        }
        finally {
            setLoader(false);
        }
    };
    const handleCompletePressed = async (id) => {
        setLoader(true);
        console.log('Modifying todo: ', id);
        try {
            const response = await axios.post('https://lobster-app-lh22k.ondigitalocean.app/api/todo/v1/todo/updatestatus', {
                id: id,
            });
            console.log(response);
            await getTodos();
        } catch (error) {
            console.log(error);
            Alert.alert('Error', error.response.data.message);
        } finally {
            setLoader(false);
        }
    };

    const handleDeletePressed = async (id) => {
        setLoader(true);
        console.log('Deleting todo: ', id);
        try {
            const response = await axios.post('https://lobster-app-lh22k.ondigitalocean.app/api/todo/v1/todo/delete', {
                id: id,
            });
            console.log(response);
            await getTodos();
        } catch (error) {
            console.log(error);
            Alert.alert('Error', error.response.data.message);
        } finally {
            setLoader(false);
        }
    };
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const handleSubmit = async() => {
        console.log('Title:', title);
        console.log('Description:', description);
        if(!title || !description) {
            Alert.alert('Error', 'Please enter title and description');
            return;
        }
        try{
            setLoader(true);
            const response = await axios.post('https://lobster-app-lh22k.ondigitalocean.app/api/todo/v1/todo/create', {
                title,
                description,
                userEmail: email,
            });
            // console.log(response);
            await getTodos();
            setTitle('');
            setDescription('');
            Alert.alert('Success', response.data.message);
        }
        catch (err) {
            Alert.alert('Error', err.response.data.message);
        }
        finally {
            setModalVisible(false); // Close the modal
        }

        // Perform any additional actions, such as submitting the data to a server or updating state

    };

    useEffect(() => {
        const backAction = () => {
          Alert.alert('Hold on!', 'Are you sure you want to exit?', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            { text: 'YES', onPress: () => BackHandler.exitApp() },
          ]);
          return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
          );
          return () => backHandler.remove();
        }, []);

    useEffect(() => {
        getTodos();
    }, []);
    return (
        <>
            {
                loader ? (<View style={{ backgroundColor: '#FFFFFF', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <LoaderKit
                        style={{ width: 60, height: 60 }}
                        name={'BallPulse'}
                        color={'#604CC3'}
                    />
                    <Text style={{ color: '#131313', fontFamily: 'Ubuntu-Regular', fontSize: 18, textAlign: 'center' }}>Please Wait...</Text>
                </View>) : (<ScrollView style={{ backgroundColor: '#FFFFFF', height: '100%' }} keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets={true}>
                    <StatusBar barStyle="dark-content" backgroundColor={'#FFFFFF'} />
                    <View style={{flexDirection: 'row', padding: 10}}>
                        <Text style={{ color: '#131313', fontFamily: 'Ubuntu-Bold', fontSize: 24, paddingLeft: 10 }}>TaskDone</Text>
                        <LottieView source={require('../component/animations/tick.json')} autoPlay loop style={{ width: 100, height: 100, position: 'absolute', top: -24, left: 100 }} />
                        <TouchableOpacity style={{ position: 'absolute', top: 0, left: 300, width: 100, backgroundColor: '#131313', zIndex: 1, borderRadius: 10, padding: 10 }} onPress={() => setModalVisible(true)}>
                            <Text style={{ color: '#FFFFFF', fontFamily: 'Ubuntu-Regular', fontSize: 18, zIndex: 1 }}>New Task</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <ScrollView automaticallyAdjustKeyboardInsets={true}>
                        <View style={{flexDirection: 'row', padding: 10}}>
                        <Text style={{ color: '#131313', fontFamily: 'Ubuntu-Bold', fontSize: 24, paddingLeft: 10 }}>TaskDone</Text>
                        <LottieView source={require('../component/animations/tick.json')} autoPlay loop style={{ width: 100, height: 100, position: 'absolute', top: -24, left: 100 }} />
                        {/* <TouchableOpacity style={{ position: 'absolute', top: 10, left: 300, width: 100, backgroundColor: '#131313', zIndex: 1, borderRadius: 10, padding: 10 }} onPress={() => setModalVisible(true)}>
                            <Text style={{ color: '#FFFFFF', fontFamily: 'Ubuntu-Regular', fontSize: 18, zIndex: 1 }}>New Task</Text>
                        </TouchableOpacity> */}
                    </View>
                            <View>
                                <LottieView source={require('../component/animations/List.json')} autoPlay loop style={{ width: 300, height: 300, marginLeft: 'auto', marginRight: 'auto' }} />
                                <Text style={{ color: '#131313', fontFamily: 'Ubuntu-Bold', fontSize: 24, paddingLeft: 10 }}>Add a New Task</Text>
                            </View>
                            <View style={{ marginTop: 10, padding: 10 }}>
                                <TextInput
                                    style={{ fontSize: 20, height: 80, borderColor: '#131313', borderWidth: 1, borderRadius: 10, paddingLeft: 10, color: '#131313', fontFamily: 'Ubuntu-Regular' }}
                                    placeholder="Title"
                                    placeholderTextColor={'#131313'}
                                    value={title}
                                    onChangeText={setTitle}
                                    multiline={false}
                                />
                                <TextInput
                                    style={{ fontSize: 18, borderColor: '#131313', borderWidth: 1, borderRadius: 10, marginTop: 10, paddingLeft: 10, color: '#131313', fontFamily: 'Ubuntu-Light', height: 200 }}
                                    placeholder="Description"
                                    placeholderTextColor={'#131313'}
                                    value={description}
                                    onChangeText={setDescription}
                                    multiline={true}
                                />
                            </View>
                            <View style={{ marginTop: 10, paddingLeft: 10, paddingRight: 10 }}>
                                <TouchableOpacity style={{ backgroundColor: '#131313', borderRadius: 10, padding: 10 }} onPress={handleSubmit}>
                                    <Text style={{ color: '#FFFFFF', fontFamily: 'Ubuntu-Regular', fontSize: 18, textAlign: 'center', paddingLeft: 10 }}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </Modal>
                    <View>
                        <LottieView source={require('../component/animations/Todos.json')} autoPlay loop style={{ width: 400, height: 400 }} />
                        <Text style={{ color: '#131313', fontFamily: 'Ubuntu-Regular', fontSize: 34, paddingLeft: 10 }}>Hi, {name}</Text>
                    </View>
                    <View style={{ paddingLeft: 10, paddingRight: 10, marginTop: 10 }}>
                        <Text style={{ color: '#131313', fontFamily: 'Ubuntu-Bold', fontSize: 24, marginRight: 70, marginBottom: 10 }}>Your Tasks</Text>
                        <ScrollView>
                            {todos.length === 0 ? (<Text style={{ color: '#131313', fontFamily: 'Ubuntu-Light', fontSize: 18, marginRight: 70, marginBottom: 10 }}>No Tasks Found</Text>) : null}
                            {todos?.map((todo) => (
                                <View key={todo._id} style={{ backgroundColor: '#F5F5F5', borderRadius: 10, padding: 10, marginBottom: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: '#131313', fontFamily: 'Ubuntu-Bold', fontSize: 18 }}>{todo.title}</Text>
                                        <TouchableOpacity style={{ borderRadius: 10, backgroundColor: 'red', width: 30, height: 30, justifyContent: 'center', alignItems: 'center', marginRight: 1, marginLeft: 1, marginBottom: 5 }}
                                            onPress={() => handleDeletePressed(todo._id)}
                                        >
                                            <Svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fafafa" stroke-width="1.7142857142857142" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><Path d="M3 6h18" /><Path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><Path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><Line x1="10" x2="10" y1="11" y2="17" /><Line x1="14" x2="14" y1="11" y2="17" /></Svg>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{ color: '#131313', fontFamily: 'Ubuntu-Light', fontSize: 18, marginTop: 10 }}>{todo.description}</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-end' }}>
                                        <TouchableOpacity style={{ marginTop: 20, borderRadius: 10, backgroundColor: '#000000', width: 110, height: 40, justifyContent: 'center', alignItems: 'center', marginRight: 1, marginLeft: 1, marginBottom: 5 }}
                                            onPress={() => handleCompletePressed(todo._id)}
                                        >
                                            {todo.completed ? (<>
                                                <Text style={{ color: '#FFFFFF', fontFamily: 'Ubuntu-Light' }}>Completed</Text>
                                            </>) : (<>
                                                <Text style={{ color: '#FFFFFF', fontFamily: 'Ubuntu-Light' }}>Not Completed</Text>
                                            </>)}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </ScrollView>)
            }
        </>
    );
};

export default Todo;

