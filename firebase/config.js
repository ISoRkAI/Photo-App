import { initializeAuth, getReactNativePersistence } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "@firebase/app";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBIAbP4yWg-c9S7iuca43COd2w-lJlquwI",
  authDomain: "photomessenge.firebaseapp.com",
  databaseURL: "https://photomessenge-default-rtdb.firebaseio.com",
  projectId: "photomessenge",
  storageBucket: "photomessenge.appspot.com",
  messagingSenderId: "1007151929864",
  appId: "1:1007151929864:web:21e302fadec9c2ec6f8fbd",
  measurementId: "G-7GK7LP6QRG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, db, storage };
