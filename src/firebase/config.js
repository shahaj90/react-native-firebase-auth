import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAgHo-IUpxA85tn4SGT_4ES7mpZRLBmzDA",
    authDomain: "react-native-auth-64e0c.firebaseapp.com",
    projectId: "react-native-auth-64e0c",
    storageBucket: "react-native-auth-64e0c.appspot.com",
    messagingSenderId: "693357248303",
    appId: "1:693357248303:web:44a6ea0aa4adc6ec6eebda",
    measurementId: "G-BL44QXBQCD"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export { auth };
