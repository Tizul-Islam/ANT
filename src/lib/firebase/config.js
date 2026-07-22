import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhRBzLXyHcJPo4LXqep_ygroNKAGEYYg0",
  authDomain: "car-rant-ed0c5.firebaseapp.com",
  projectId: "car-rant-ed0c5",
  storageBucket: "car-rant-ed0c5.firebasestorage.app",
  messagingSenderId: "537475388232",
  appId: "1:537475388232:web:ac3bec1e2116d7a563d97d",
  measurementId: "G-W918K7ERXV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
