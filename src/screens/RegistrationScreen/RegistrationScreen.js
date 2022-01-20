import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/config';
import styles from './styles';

export default function RegistrationScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const onRegisterPress = () => {
        // Form validations
        if (!email) {
            Alert.alert(
                "Error",
                "Email is required",
                [{ text: "OK" }]
            );
            return;
        }

        if (!password) {
            Alert.alert(
                "Error",
                "Password is required",
                [{ text: "OK" }]
            );
            return;
        }

        if (password.length < 6) {
            Alert.alert(
                "Error",
                "Password min length is 6",
                [{ text: "OK" }]
            );
            return;
        }

        if (!confirmPassword) {
            Alert.alert(
                "Error",
                "Confirm password is required",
                [{ text: "OK" }]
            );
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert(
                "Error",
                "Password is not match",
                [{ text: "OK" }]
            );
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert(
                "Error",
                "Email is not valid",
                [{ text: "OK" }]
            );
            return;
        }

        // Register to firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                Alert.alert(
                    "Success",
                    "User register successfully! Please login",
                    [{ text: "OK", onPress: () => { navigation.navigate('Login') } }]
                );
            })
            .catch((error) => {
                Alert.alert(
                    "Error",
                    error.message,
                    [{ text: "OK" }]
                );
            });
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}