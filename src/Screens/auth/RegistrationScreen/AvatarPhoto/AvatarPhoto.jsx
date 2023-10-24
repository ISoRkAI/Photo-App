import * as ImagePicker from "expo-image-picker";

import { ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../../../../firebase/config";

import {
  Avatar,
  AvatarContainer,
  BlockPlug,
  DeleteBtn,
  PlusBtn,
  PlusImg,
} from "../RegistrationScreen.styled";

export const AvatarPhoto = ({ image, setImage, setUploadAvatar, idRef }) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await uploadAvatarToServer(result.assets[0].uri);
    }
  };

  const uploadAvatarToServer = async (e) => {
    try {
      const storageRef = ref(storage, `avatar/${idRef}`);
      const response = await fetch(e);
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
  return (
    <AvatarContainer>
      {image ? <Avatar source={{ uri: image }} /> : <BlockPlug></BlockPlug>}
      {image ? (
        <DeleteBtn
          onPress={() => {
            setImage();
          }}
        >
          <PlusImg
            style={{ width: 40, height: 40 }}
            source={require("../../../../../assets/delete.png")}
          />
        </DeleteBtn>
      ) : (
        <PlusBtn
          onPress={() => {
            pickImage();
          }}
        >
          <PlusImg source={require("../../../../../assets/add.png")} />
        </PlusBtn>
      )}
    </AvatarContainer>
  );
};
