// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmQ0DKs4bz3n_X6i8onVWd3WYPpCmMV70",
  authDomain: "utdl1-92164.firebaseapp.com",
  projectId: "utdl1-92164",
  storageBucket: "utdl1-92164.appspot.com",
  messagingSenderId: "43323726205",
  appId: "1:43323726205:web:ee45a1c6d7bfbebba91414"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;