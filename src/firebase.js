import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCsRhVyMrx1GJA6wjFj4N8VexWJN5bp3tk",
  authDomain: "xspencr.firebaseapp.com",
  projectId: "xspencr",
  storageBucket: "xspencr.appspot.com",
  messagingSenderId: "223810598390",
  appId: "1:223810598390:web:1075d43f422b5305d403d7"
};


// The Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Export Firebase Auth
export const firebaseAuth = process.env.PRODUCTION ? 
  getAuth(firebaseApp) : (() => {
    const devAuth = getAuth();
    connectAuthEmulator(devAuth, "http://localhost:9099");
    return devAuth;
  })();
  

// Export the Firestore app
export const firebaseDB = process.env.PRODUCTION ? 
  getFirestore(firebaseApp) : (() => {
    const devFirestore = getFirestore();
    connectFirestoreEmulator(getFirestore(), 'localhost', 8080);
    return devFirestore;
  })();