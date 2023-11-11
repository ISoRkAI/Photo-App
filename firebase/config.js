import { initializeAuth, getReactNativePersistence } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "@firebase/app";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDPn6MOOBJbxVKQs4wO-M7oneMvqHR5FAs",
  authDomain: "testfinal-eca1f.firebaseapp.com",
  projectId: "testfinal-eca1f",
  storageBucket: "testfinal-eca1f.appspot.com",
  messagingSenderId: "895457897448",
  appId: "1:895457897448:web:c521cee587920aa5cd525d",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, db, storage };
