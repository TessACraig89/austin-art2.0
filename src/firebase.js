import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyC-DlIPZi0j_AnvJSd2oY53rlRBR_5Fly8",
    authDomain: "austin-street-art.firebaseapp.com",
    databaseURL: "https://austin-street-art.firebaseio.com",
    projectId: "austin-street-art",
    storageBucket: "austin-street-art.appspot.com",
    messagingSenderId: "215756051544"
  };
firebase.initializeApp(config);
export default firebase;
