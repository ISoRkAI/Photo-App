import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../../firebase/config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";

export const authSignUpUser = createAsyncThunk(
  "auth / signUp ",
  async ({ login, email, password, imageAvatar }, ThunkAPI) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: imageAvatar,
      });

      const user = await auth.currentUser;
      const userUpdateProfile = {
        userId: user.uid,
        login: user.displayName,
        email: user.email,
        stateChange: true,
        imageAvatar: user.photoURL,
      };
      return userUpdateProfile;
    } catch (e) {
      console.log("Error authSignUpUser:", e);
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
