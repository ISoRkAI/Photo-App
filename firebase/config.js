import { initializeAuth, getReactNativePersistence } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "@firebase/app";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCRL_RQVv6yDGr3_tG5304o4T3hzxmjLEQ",
  authDomain: "test1-9c35e.firebaseapp.com",
  projectId: "test1-9c35e",
  storageBucket: "test1-9c35e.appspot.com",
  messagingSenderId: "506252793210",
  appId: "1:506252793210:web:209ed9485c49ac2879b2c3",
  measurementId: "G-BEMQZP4J0M",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, db, storage };
