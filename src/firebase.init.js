// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsekXMf-k9R-QaYLyr_Gen3-PD36rsBIs",
  authDomain: "ema-john-simple-9ae65.firebaseapp.com",
  projectId: "ema-john-simple-9ae65",
  storageBucket: "ema-john-simple-9ae65.appspot.com",
  messagingSenderId: "475208039034",
  appId: "1:475208039034:web:0ce2b7ac7f4e354c8019c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth  = getAuth(app)

export default auth;