import { useEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { Feather } from "@expo/vector-icons";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { db, storage } from "../../../../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { addDoc, collection } from "@firebase/firestore";
import {
  ClearBtn,
  Container,
  DownloadBtn,
  DownloadBtnText,
  Input,
  MapBtn,
  MapBtnText,
  Placeholder,
  PublishBtn,
  PublishBtnText,
} from "./DefaultScreen.styled";
import { PhotoContainer } from "./PhotoContainer/PhotoContainer";

export const DefaultScreen = ({ navigation, route }) => {
  const [_, setKeyboardStatus] = useState();
  const [photoName, setPhotoName] = useState("");
  const [goCamera, setGoCamera] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [region, setRegion] = useState(null);
  const { userId, login } = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!route.params) {
      return;
    }

    setRegion({ ...route.params.region[0], ...route.params.coordinates });
  }, [route]);

  const keyboardHide = () => {
    setKeyboardStatus(false);
    Keyboard.dismiss();
  };

  const uploadPhotoToServer = async () => {
    try {
      const id = nanoid();
      const storageRef = ref(storage, `photos/${id}`);
      const response = await fetch(photo);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      const processedPhoto = await getDownloadURL(storageRef);
      return processedPhoto;
    } catch (error) {
      console.log("error PhotoToServer", error);
    }
  };

  const uploadPostToServer = async () => {
    try {
      const photo = await uploadPhotoToServer();
      const createPost = await addDoc(collection(db, "posts"), {
        photo,
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

  const sendPhoto = () => {
    navigation.navigate("Публикации");
    uploadPostToServer();
    setPhoto(null);
    setPhotoName("");
    setRegion(null);
    setGoCamera(true);
  };

  const clearPhoto = () => {
    setGoCamera(true);
    setPhoto(null);
    setPhotoName("");
    setRegion(null);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <Container>
        <PhotoContainer
          photo={photo}
          setPhoto={setPhoto}
          setGoCamera={setGoCamera}
          goCamera={goCamera}
        />
        <DownloadBtn>
          <DownloadBtnText>Загрузите фото</DownloadBtnText>
        </DownloadBtn>
        <Input
          placeholder="Название..."
          onChangeText={(value) => setPhotoName(value)}
          value={photoName}
          onFocus={() => setKeyboardStatus(true)}
          onSubmitEditing={() => setKeyboardStatus(false)}
        ></Input>
        <MapBtn onPress={() => navigation.navigate("Карта")}>
          <Feather
            name="map-pin"
            size={24}
            color="#BDBDBD"
            style={{ marginRight: 4 }}
          />
          {region ? (
            <MapBtnText>
              {region?.country}, {region.city}, {region.name}
            </MapBtnText>
          ) : (
            <Placeholder>Местность...</Placeholder>
          )}
        </MapBtn>
        <PublishBtn
          disabled={photoName.length !== 0 && photo ? false : true}
          photoName={photoName}
          photo={photo}
          onPress={() => sendPhoto()}
        >
          <PublishBtnText photoName={photoName} photo={photo}>
            Опубликовать
          </PublishBtnText>
        </PublishBtn>
        <ClearBtn onPress={() => clearPhoto()}>
          <Feather name="trash-2" size={24} color="#DADADA" />
        </ClearBtn>
      </Container>
    </TouchableWithoutFeedback>
  );
};
