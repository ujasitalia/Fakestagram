// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAVwWQirBTcASq265mk1HsfiXhHQglrGAo",
//   authDomain: "fakestagram-react-ujasitalia.firebaseapp.com",
//   databaseURL: "https://fakestagram-react-ujasitalia-default-rtdb.firebaseio.com",
//   projectId: "fakestagram-react-ujasitalia",
//   storageBucket: "fakestagram-react-ujasitalia.appspot.com",
//   messagingSenderId: "795753736512",
//   appId: "1:795753736512:web:b1439a2581a05cb28132a5",
//   measurementId: "G-RYTX3QX52C"
// };

// export default firebaseConfig;
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAVwWQirBTcASq265mk1HsfiXhHQglrGAo",
    authDomain: "fakestagram-react-ujasitalia.firebaseapp.com",
    databaseURL: "https://fakestagram-react-ujasitalia-default-rtdb.firebaseio.com",
    projectId: "fakestagram-react-ujasitalia",
    storageBucket: "fakestagram-react-ujasitalia.appspot.com",
    messagingSenderId: "795753736512",
    appId: "1:795753736512:web:b1439a2581a05cb28132a5",
    measurementId: "G-RYTX3QX52C"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};