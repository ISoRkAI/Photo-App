import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { authSignOutUser } from "../../../../redux/auth/authOperations";
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
import { db, storage } from "../../../../../firebase/config";
import { selectorLogin, selectorUserId } from "../../../../redux/selectors";
import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { ImageBackground } from "react-native";
import { ScrollView } from "react-native";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "@firebase/storage";
import { nanoid } from "@reduxjs/toolkit";

export const DefaultProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState([]);

  const dispatch = useDispatch();

  const id = useSelector(selectorUserId);
  const login = useSelector(selectorLogin);

  useEffect(() => {
    getUserPost();
    getUserAvatar();
  }, []);

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

  const sortedTransactions = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#932525" }}>
      <ImageBackground
        style={{ flex: 1, justifyContent: "flex-end", paddingTop: 146 }}
        source={require("../../../../../assets/PhotoBG.png")}
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
            <View style={{ backgroundColor: "#F6F6F6", borderRadius: 16 }}>
              <Image
                source={{ uri: image[0] }}
                style={{ width: 120, height: 120, borderRadius: 16 }}
              />
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
            data={sortedTransactions}
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
                        navigation.removeListener;
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
