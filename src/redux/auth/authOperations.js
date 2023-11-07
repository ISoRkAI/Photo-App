import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../../firebase/config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import Toast from "react-native-toast-message";

export const authSignUpUser = createAsyncThunk(
  "auth / signUp ",
  async ({ login, email, password, imageAvatar }, ThunkAPI) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: imageAvatar,
      });

      const user = auth.currentUser;

      const userUpdateProfile = {
        userId: user.uid,
        login: user.displayName,
        email: user.email,
        stateChange: true,
        imageAvatar: user.photoURL,
      };
      return userUpdateProfile;
    } catch (e) {
      if (e.message === "Firebase: Error (auth/email-already-in-use).") {
        Toast.show({
          type: "error",
          text1:
            "Sorry, this email address is already registered in the system",
        });
      }
      if (e.message === "Firebase: Error (auth/invalid-email).") {
        Toast.show({
          type: "error",
          text1: "The email address entered is invalid",
        });
      }
      if (
        e.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        Toast.show({
          type: "error",
          text1: "Password should be at least 6 characters",
        });
      }
      return ThunkAPI.rejectWithValue(e.message);
    }
  }
);

export const authSignInUser = createAsyncThunk(
  "auth / signIn ",
  async ({ email, password }, ThunkAPI) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;
      const userUpdateProfile = {
        userId: user.uid,
        login: user.displayName,
        email: user.email,
        stateChange: true,
      };

      return userUpdateProfile;
    } catch (e) {
      if (
        e.message === "Firebase: Error (auth/invalid-login-credentials)." ||
        "Firebase: Error (auth/invalid-email)."
      ) {
        Toast.show({
          type: "error",
          text1: "Wrong login or password",
        });
      }
      return ThunkAPI.rejectWithValue(e.message);
    }
  }
);

export const authSignOutUser = createAsyncThunk(
  "auth/signOut",
  async (ThunkAPI) => {
    try {
      await signOut(auth);
    } catch (e) {
      return ThunkAPI.rejectWithValue(e.message);
    }
  }
);

export const authStateChangeUser = createAsyncThunk(
  "auth/refreshUser",
  async (ThunkAPI) => {
    try {
      const user = await new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            resolve(user);
          } else {
            reject(new Error("User not found"));
          }
        });
      });

      if (user) {
        const userUpdateProfile = {
          userId: user.uid,
          login: user.displayName,
          email: user.email,
        };

        return userUpdateProfile;
      } else {
        const userUpdateProfile = {
          userId: null,
          login: null,
          email: null,
        };

        return userUpdateProfile;
      }
    } catch (e) {
      return ThunkAPI.rejectWithValue(e.message);
    }
  }
);
