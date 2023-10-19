import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { authSignOutUser } from "../../../redux/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { db } from "../../../../firebase/config";
import { selectorUserId } from "../../../redux/selectors";
import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";

export const ProfileScreen = () => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const id = useSelector(selectorUserId);

  useEffect(() => {
    getUserPost(8);
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

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={signOut}>
        <Text>signOut</Text>
      </TouchableOpacity>
      <FlatList
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
                    {region?.country}, {region.region}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
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
