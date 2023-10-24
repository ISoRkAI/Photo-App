import { Feather } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { View } from "react-native";
import { useState } from "react";

import {
  CameraBlock,
  DeletePhoto,
  Photo,
  PhotoBlock,
  PhotoBtn,
  PhotoCamera,
} from "./PhotoContainer.styled";

export const PhotoContainer = ({ photo, setPhoto, setGoCamera, goCamera }) => {
  const [camera, setCamera] = useState(null);
  const [_, requestPermission] = Camera.useCameraPermissions();

  const takePhoto = async () => {
    try {
      const photo = await camera.takePictureAsync();
      setPhoto(photo.uri);
      setGoCamera(false);
    } catch (error) {
      console.log("Error taking photo: ", error.message);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setGoCamera(true);
  };

  return (
    <View>
      {photo && (
        <PhotoBlock>
          <Photo source={{ uri: photo }} />
          <DeletePhoto onPress={() => removePhoto()}>
            <Feather name="trash-2" size={24} color="#FFFFFF" />
          </DeletePhoto>
        </PhotoBlock>
      )}

      {goCamera && (
        <CameraBlock>
          <PhotoCamera ref={setCamera}>
            <PhotoBtn
              onPress={() => {
                takePhoto(), requestPermission();
              }}
            >
              <Feather name="camera" size={24} color="#FFFFFF" />
            </PhotoBtn>
          </PhotoCamera>
        </CameraBlock>
      )}
    </View>
  );
};
