import { initializeApp } from "firebase/app";
import { getStorage, uploadBytes, getDownloadURL,ref,list, listAll, getMetadata, updateMetadata } from "firebase/storage";
import axios from "axios";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_D4dmfC5XjtD114jUbusLKwKC1J7Ue_Q",
  authDomain: "ecommerce-app-7604d.firebaseapp.com",
  projectId: "ecommerce-app-7604d",
  storageBucket: "ecommerce-app-7604d.appspot.com",
  messagingSenderId: "544174806161",
  appId: "1:544174806161:web:db7b2611651cbf14019b30",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
