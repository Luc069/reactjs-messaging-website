import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp ({
  apiKey: "AIzaSyD3U4g31xIRpyeKrzchACXCRd4KzTN_HDk",
  authDomain: "lucchat-6500b.firebaseapp.com",
  projectId: "lucchat-6500b",
  storageBucket: "lucchat-6500b.appspot.com",
  messagingSenderId: "983956875415",
  appId: "1:983956875415:web:a82ba4926b687e97eee1d2",
  measurementId: "G-SDLVBLY7E3"
}).auth();