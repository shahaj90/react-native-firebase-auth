import React, { useState, useEffect } from 'react'
import { Text, View, Button, Alert } from 'react-native'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase/config';
import styles from './styles';

export default function HomeScreen({ navigation }) {
    const [user, setUser] = useState('')
    useEffect(() => {
        onAuthState();
    }, []);

    const onAuthState = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser('');
            }
        });

    }

    const logout = () => {
        signOut(auth).then(() => {
            Alert.alert(
                "Success",
                "User logout successfully",
                [{ text: "OK", onPress: () => { navigation.navigate('Login') } }]
            );
        }).catch((error) => {
            Alert.alert(
                "Error",
                error.message,
                [{ text: "OK" }]
            );
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.baseText}>
                <Text style={styles.titleText}>
                    Welcome
                    {"\n"}
                    {user.email && user.email}
                    {"\n"}
                </Text>
            </Text>
            <Button
                onPress={logout}
                title="Logout"
                color="#841584"
                accessibilityLabel="Logout"
            />
        </View >
    )
}