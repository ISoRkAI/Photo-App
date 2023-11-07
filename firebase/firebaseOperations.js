import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { nanoid } from "@reduxjs/toolkit";
import { db, storage } from "./config";
import { addDoc, collection, doc, setDoc } from "@firebase/firestore";

export const uploadPhotoToServer = async (photoUrl) => {
  try {
    const id = nanoid();
    const storageRef = ref(storage, `photos/${id}`);
    const response = await fetch(photoUrl);
    const file = await response.blob();
    const metadata = {
      contentType: "image/jpeg",
    };
    await uploadBytesResumable(storageRef, file, metadata);

    const processedPhoto = await getDownloadURL(storageRef);
    return processedPhoto;
  } catch (e) {
    console.log("error PhotoToServer", e);
  }
};

export const uploadPostToServer = async (
  photoUrl,
  photoName,
  region,
  userId,
  login
) => {
  try {
    const photo = await uploadPhotoToServer(photoUrl);
    const createPost = await addDoc(collection(db, "posts"), {
      photo,
      date: +new Date(),
      photoName,
      region,
      userId,
      login,
      length: 0,
    });
    return createPost;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const uploadAvatarToStorage = async (uri, idRef, setUploadAvatar) => {
  try {
    const storageRef = ref(storage, `avatar/${idRef}`);
    const response = await fetch(uri);
    const file = await response.blob();
    const metadata = {
      contentType: "image/jpeg",
    };

    await uploadBytesResumable(storageRef, file, metadata);

    setUploadAvatar(true);
  } catch (e) {
    setUploadAvatar(false);
    console.log("error PhotoToServer", e);
  }
};

export const downloadUrl = async (idRef, setState) => {
  try {
    const storageRef = ref(storage, `avatar/${idRef}`);
    const processedPhoto = await getDownloadURL(storageRef);

    setState((prevState) => ({
      ...prevState,
      imageAvatar: processedPhoto,
    }));
  } catch (e) {
    console.log("error downloadUrl", e);
  }
};

export const uploadAvatarToServer = async (avatarUrl, login, userId) => {
  try {
    await setDoc(doc(db, "avatars", `${userId}`), {
      photo: avatarUrl,
      userId,
      login,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
