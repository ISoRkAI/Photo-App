import { collection, onSnapshot, query } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Image, Text } from "react-native";
import { db } from "../../../../../firebase/config";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

export const DefaultPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [userAvatar, setUserAvatar] = useState([]);

  useEffect(() => {
    getUserAvatar();
    getAllPost();
  }, []);

  const getUserAvatar = () => {
    const queryAvatar = query(collection(db, "avatars"));
    onSnapshot(queryAvatar, (data) => {
      setUserAvatar(data.docs.map((doc) => doc.data()));
    });
  };

  const getAllPost = () => {
    const queryPosts = query(collection(db, "posts"));
    onSnapshot(queryPosts, (data) => {
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const sortedTransactions = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedTransactions}
        keyExtractor={(_, indx) => indx.toString()}
        renderItem={({ item }) => {
          const { id, photo, photoName, region, length, userId } = item;
          const avatar = userAvatar.find((item) => item.userId === userId);

          return (
            <View style={{ marginBottom: 34 }}>
              <View
                style={{
                  marginBottom: 32,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: avatar.photo }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    marginRight: 8,
                  }}
                />
                <Text
                  style={{
                    color: "#212121",

                    // fontFamily: "Roboto",
                    fontSize: 13,
                    fontWeight: "700",
                  }}
                >
                  {avatar.login}
                </Text>
              </View>
              <Image source={{ uri: photo }} style={styles.postPhoto} />
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
                {region && (
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
                      {region?.country}, {region?.region}
                    </Text>
                  </TouchableOpacity>
                )}
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
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },
  postPhoto: { height: 240, borderRadius: 8, marginBottom: 8 },
});
