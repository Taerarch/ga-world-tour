import * as firebase from 'firebase';
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDueuzkaY1w2R8SiEqgAR8lSXzFL58O4-U",
    authDomain: "ga-world-tour-b8252.firebaseapp.com",
    databaseURL: "https://ga-world-tour-b8252.firebaseio.com",
    projectId: "ga-world-tour-b8252",
    storageBucket: "ga-world-tour-b8252.appspot.com",
    messagingSenderId: "512986502516",
    appId: "1:512986502516:web:408e501277054fb4c88821"
  };

  const fire = firebase.initializeApp(firebaseConfig)
  const storage = firebase.storage()
  // Initialize Firebase
  export {storage, fire as default};
