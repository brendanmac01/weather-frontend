import firebase from "firebase/app";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBZ3mpF8X2wZ4oO8W785-ndS_f46qCpRjk",
    authDomain: "weather-31be1.firebaseapp.com",
    projectId: "weather-31be1",
    storageBucket: "weather-31be1.appspot.com",
    messagingSenderId: "585348476145",
    appId: "1:585348476145:web:ac626f424a9be88bfd8d50",
    measurementId: "G-7XH4CDTYHK"
  };
// activate firebase
firebase.initializeApp(firebaseConfig);

// configure settings
const auth = firebase.auth();

// set up provider
const provider = new firebase.auth.GoogleAuthProvider();

// set up auth functions
function login() {
    return auth.signInWithPopup(provider);
}

function logout() {
    return auth.signOut();
}

export { login, logout, auth };