import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.google = new firebase.auth.GoogleAuthProvider();
    this.facebook = new firebase.auth.FacebookAuthProvider();
  }

  currentUser() {
    return this.auth.currentUser();
  }

  signInWithPopup(provider) {
    return provider === 'google'
      ? this.auth.signInWithPopup(this.google)
      : this.auth.signInWithPopup(this.facebook);
  }

  addUser({ user }) {
    return this.firestore()
      .collection('users')
      .doc(user.uid);
  }

  signOut() {
    return this.auth.signOut();
  }
}

const FirebaseAPI = new Firebase();
export default FirebaseAPI;
