import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyDf9Vdn-REIYbGdH7KdqLFMZ95-Oyd5Z2g",
    authDomain: "testapi-272015.firebaseapp.com",
    databaseURL: "https://testapi-272015.firebaseio.com",
    projectId: "testapi-272015",
    storageBucket: "testapi-272015.appspot.com",
    messagingSenderId: "26774653711",
    appId: "1:26774653711:web:64a1f6b2683477c91f8c7a",
    measurementId: "G-YG5PFNXVBF"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default storage;