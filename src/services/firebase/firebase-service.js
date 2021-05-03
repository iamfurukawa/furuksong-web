import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/firebase-database';

const FirebaseService = () => {
  const firebaseConfig = () => ({
    apiKey: 'AIzaSyAIzwheovszYOCgKQeFbWAjyNzk4t-jS28',
    authDomain: 'furuksong.firebaseapp.com',
    projectId: 'furuksong',
    storageBucket: 'furuksong.appspot.com',
    messagingSenderId: '511657412828',
    appId: '1:511657412828:web:e82110995aff6804414c19',
  });

  const app = () => {
    if (!firebase.apps.length) return firebase.initializeApp(firebaseConfig(), { databaseURL: 'https://furuksong-default-rtdb.firebaseio.com/' });
    return firebase.app();
  };

  return { app };
};

export default FirebaseService();
