import { initializeAuth, getReactNativePersistence } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "@firebase/app";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZsD_b1MaTrotTDmAas86_JEB9IX7mkpY",
  authDomain: "photomessenge-b1e0f.firebaseapp.com",
  databaseURL: "https://photomessenge-b1e0f-default-rtdb.firebaseio.com",
  projectId: "photomessenge-b1e0f",
  storageBucket: "photomessenge-b1e0f.appspot.com",
  messagingSenderId: "630119530641",
  appId: "1:630119530641:web:47e84b5b94d3ebc57cff30",
  measurementId: "G-RJJE0H4KX7",
};
// databaseURL: "https://goitproject-reactnative-default-rtdb.firebaseio.com",
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, db, storage };
