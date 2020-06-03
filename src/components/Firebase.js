import * as firebase from 'firebase';
import 'firebase/firestore';

//nter firebaseconfig object
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};
const Firebase = firebase.initializeApp(firebaseConfig);
const Auth = firebase.auth();
const DataBase = firebase.firestore();
export {Auth, DataBase};
export default Firebase;
