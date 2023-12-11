import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCAGuAPnVZoRERmZdmMQ-nocFPFkaDevDg",
  authDomain: "livelaunchapp.firebaseapp.com",
  projectId: "livelaunchapp",
  storageBucket: "livelaunchapp.appspot.com",
  messagingSenderId: "814572207143",
  appId: "1:814572207143:web:3b2b3237ce69fed964e202",
  measurementId: "G-1367YF131S"
};

let firebaseApp;

if (firebase.apps.length === 0) {
    firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
  firebaseApp = firebase.app()
}

const db = firebaseApp.database()
const auth = firebaseApp.auth()
const storage = firebaseApp.storage()

export { auth, db, storage, firebase }