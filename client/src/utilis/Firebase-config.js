import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPvRGnFbrJ_z6qjG8hm1ZlkK2PFybnHYs",
  authDomain: "react-netflix-clone-a097a.firebaseapp.com",
  projectId: "react-netflix-clone-a097a",
  storageBucket: "react-netflix-clone-a097a.appspot.com",
  messagingSenderId: "160113906933",
  appId: "1:160113906933:web:f5a909dc27bd3e30fc21bc",
  measurementId: "G-XMLYWG7ME1",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
