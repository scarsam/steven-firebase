import firebase from "firebase/app";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

// class Firebase {
//   constructor() {
//     app.initializeApp(config);
//     this.auth = app.auth();
//     this.db = app.firestore();
//     this.facebookProvider = new app.auth.FacebookAuthProvider();
//     this.googleProvider = new app.auth.GoogleAuthProvider();
//   }

//   async socialLogin(provider) {
//     const credentials =
//       provider === "google"
//         ? await this.auth.signInWithPopup(this.googleProvider)
//         : await this.auth.signInWithPopup(this.facebookProvider);
//     return await this.db.collection("users").doc(credentials.user.uid);
//   }

//   async joinGroup(group, existingUser) {
//     const groupRef = await firebase.db
//       .collectionGroup("groups")
//       .where("id", "==", group);
//     let user;
//     if (existingUser) {
//       user = existingUser;
//     } else {
//       user = await this.auth.signInWithPopup(this.facebookProvider);
//     }
//     groupRef.get().then(querySnapshot => {
//       querySnapshot.forEach(doc => {
//         doc.ref.update({
//           users: app.firestore.FieldValue.arrayUnion({
//             id: user.uid,
//             name: user.displayName
//           })
//         });
//       });
//     });
//   }

//   async logout() {
//     await this.auth.signOut();
//   }
// }

// const firebase = new Firebase();
export default firebase;
