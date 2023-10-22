import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { authSignOutUser } from "../../../redux/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "@firebase/firestore";
import { db, storage } from "../../../../firebase/config";
import { selectorLogin, selectorUserId } from "../../../redux/selectors";
import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { DefaultProfileScreen } from "./DefaultProfileScreen/DefaultProfileScreen";
import { ImageBackground } from "react-native";
import { ScrollView } from "react-native";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { nanoid } from "@reduxjs/toolkit";

export const ProfileScreen = () => {
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState([]);
  const [newImage, setNewImage] = useState([]);
  const dispatch = useDispatch();
  const id = useSelector(selectorUserId);
  const login = useSelector(selectorLogin);

  useEffect(() => {
    getUserPost();
    getUserAvatar();
  }, []);

  useEffect(() => {
    if (newImage.length > 0) {
      uploadAvatarToServer(newImage);
      return;
    }
  }, [newImage]);

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  const getUserPost = async () => {
    const queryPosts = query(
      collection(db, "posts"),
      where("userId", "==", id)
    );
    onSnapshot(queryPosts, (data) => {
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const getUserAvatar = async () => {
    const queryAvatar = query(
      collection(db, "avatars"),
      where("userId", "==", id)
    );
    onSnapshot(queryAvatar, (data) => {
      setImage(data.docs.map((doc) => doc.data().photo));
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewImage(result.assets[0].uri);
    }
  };

  const uploadAvatarToStorage = async (imageUri) => {
    try {
      const idAvatar = nanoid();
      const storageRef = ref(storage, `avatar/${idAvatar}`);
      const response = await fetch(imageUri);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      const processedPhoto = await getDownloadURL(storageRef);
      return processedPhoto;
    } catch (error) {
      console.log("error PhotoToServer", error);
    }
  };

  const uploadAvatarToServer = async (imageUri) => {
    try {
      const photo = await uploadAvatarToStorage(imageUri);

      await setDoc(doc(db, "avatars", `${id}`), {
        photo,
        userId: id,
        login,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#932525" }}>
      <ImageBackground
        style={{ flex: 1, justifyContent: "flex-end", paddingTop: 146 }}
        source={require("../../../../assets/PhotoBG.png")}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#ffffff",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            // alignItems: "center",
            paddingTop: 22,
          }}
        >
          <View
            style={{
              width: "100%",
              position: "absolute",
              top: -60,
              borderRadius: 16,
              alignItems: "center",
            }}
          >
            <View
              style={{
                borderRadius: 16,
              }}
            >
              {image.length !== 0 ? (
                <Image
                  source={{ uri: image[0] }}
                  style={{ width: 120, height: 120, borderRadius: 16 }}
                />
              ) : (
                <View
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 16,
                    backgroundColor: "#f6f6f6",
                  }}
                ></View>
              )}
              {image.length !== 0 ? (
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    width: 25,
                    height: 25,
                    bottom: 18,
                    right: -7.5,
                  }}
                  onPress={() => {
                    setImage([]);
                  }}
                >
                  <Image
                    style={{ width: 35, height: 35 }}
                    source={require("../../../../assets/delete.png")}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    width: 25,
                    height: 25,
                    bottom: 14,
                    right: -12.5,
                  }}
                  onPress={() => {
                    pickImage();
                  }}
                >
                  <Image
                    style={{ width: 25, height: 25 }}
                    source={require("../../../../assets/add.png")}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View
            style={{ marginBottom: 46, marginRight: 16, marginLeft: "auto" }}
          >
            <TouchableOpacity onPress={() => signOut()} title="exit">
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 34 }}>
            <Text
              style={{
                color: "#212121",
                textAlign: "center",
                // fontFamily: "Roboto",
                fontSize: 30,
                fontWeight: "500",
                letterSpacing: 0.3,
              }}
            >
              {login}
            </Text>
          </View>
          <FlatList
            style={{ paddingLeft: 16, paddingRight: 16 }}
            data={posts}
            keyExtractor={(_, indx) => indx.toString()}
            renderItem={({ item }) => {
              const { id, photo, photoName, region, length } = item;

              return (
                <View style={{ marginBottom: 34 }}>
                  <Image
                    source={{ uri: photo }}
                    style={{ height: 240, borderRadius: 8, marginBottom: 8 }}
                  />
                  <Text
                    style={{
                      color: "#212121",
                      fontSize: 16,
                      fontWeight: "500",
                      marginBottom: 8,
                    }}
                  >
                    {photoName}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                      onPress={() => {
                        navigation.navigate("MainScreen", { screenOpen: true });
                        navigation.navigate("Комментарии", {
                          postId: id,
                          uri: photo,
                        });
                      }}
                    >
                      <Feather
                        name="message-circle"
                        size={24}
                        color="#BDBDBD"
                        style={{ marginRight: 6 }}
                      />
                      <Text
                        style={{
                          color: "#BDBDBD",
                          fontSize: 16,
                        }}
                      >
                        {length}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                      onPress={() => {
                        navigation.navigate("MainScreen", { screenOpen: true });
                        navigation.navigate("Карта", { location: region });
                      }}
                    >
                      <Feather
                        name="map-pin"
                        size={24}
                        color="#BDBDBD"
                        style={{ marginRight: 4 }}
                      />
                      <Text
                        style={{
                          color: "#212121",
                          fontSize: 16,
                          textDecorationLine: "underline",
                        }}
                      >
                        {region?.country}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ImageBackground>
    </View>

    // <View style={styles.container}>
    //   <TouchableOpacity onPress={signOut}>
    //     <Text>signOut</Text>
    //   </TouchableOpacity>
    //   <FlatList
    //     data={posts}
    //     keyExtractor={(_, indx) => indx.toString()}
    //     renderItem={({ item }) => {
    //       const { id, photo, photoName, region, length } = item;

    //       return (
    //         <View style={{ marginBottom: 34 }}>
    //           <Image
    //             source={{ uri: photo }}
    //             style={{ height: 240, borderRadius: 8, marginBottom: 8 }}
    //           />
    //           <Text
    //             style={{
    //               color: "#212121",
    //               fontSize: 16,
    //               fontWeight: "500",
    //               marginBottom: 8,
    //             }}
    //           >
    //             {photoName}
    //           </Text>
    //           <View
    //             style={{
    //               flexDirection: "row",
    //               justifyContent: "space-between",
    //             }}
    //           >
    //             <TouchableOpacity
    //               style={{ flexDirection: "row", alignItems: "center" }}
    //               onPress={() => {
    //                 navigation.navigate("MainScreen", { screenOpen: true });
    //                 navigation.navigate("Комментарии", {
    //                   postId: id,
    //                   uri: photo,
    //                 });
    //               }}
    //             >
    //               <Feather
    //                 name="message-circle"
    //                 size={24}
    //                 color="#BDBDBD"
    //                 style={{ marginRight: 6 }}
    //               />
    //               <Text
    //                 style={{
    //                   color: "#BDBDBD",
    //                   fontSize: 16,
    //                 }}
    //               >
    //                 {length}
    //               </Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity
    //               style={{ flexDirection: "row", alignItems: "center" }}
    //               onPress={() => {
    //                 navigation.navigate("MainScreen", { screenOpen: true });
    //                 navigation.navigate("Карта", { location: region });
    //               }}
    //             >
    //               <Feather
    //                 name="map-pin"
    //                 size={24}
    //                 color="#BDBDBD"
    //                 style={{ marginRight: 4 }}
    //               />
    //               <Text
    //                 style={{
    //                   color: "#212121",
    //                   fontSize: 16,
    //                   textDecorationLine: "underline",
    //                 }}
    //               >
    //                 {region?.country}, {region.region}
    //               </Text>
    //             </TouchableOpacity>
    //           </View>
    //         </View>
    //       );
    //     }}
    //   />
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
