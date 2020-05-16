import * as firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCUOY1i9SNdjMPhcNhBUGaIpqzbCYdTnhc",
    authDomain: "crime-reporting-1579366343613.firebaseapp.com",
    databaseURL: "https://crime-reporting-1579366343613.firebaseio.com",
    projectId: "crime-reporting-1579366343613",
    storageBucket: "crime-reporting-1579366343613.appspot.com",
    messagingSenderId: "495532365789",
    appId: "1:495532365789:web:450d920413431af0b44834",
    measurementId: "G-W6VNQ66PZG"
  };
const Firebase = firebase.initializeApp(firebaseConfig);
const Auth = firebase.auth();
const DataBase = firebase.firestore();
export {
  Auth,
  DataBase
}
export default Firebase;