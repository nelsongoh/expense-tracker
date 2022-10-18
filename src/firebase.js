import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCsRhVyMrx1GJA6wjFj4N8VexWJN5bp3tk",
  authDomain: "xspencr.firebaseapp.com",
  projectId: "xspencr",
  storageBucket: "xspencr.appspot.com",
  messagingSenderId: "223810598390",
  appId: "1:223810598390:web:1075d43f422b5305d403d7"
};


// Export the Firebase app
export const firebaseApp = initializeApp(firebaseConfig);

// Export the Firestore app
export const firebaseDB = getFirestore(firebaseApp);