import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import {
  getAllPost,
  getUserAvatar,
} from "../../../../../firebase/firebaseOperations";
import {
  Avatar,
  AvatarContainer,
  CommentBlock,
  CommentBtn,
  CommentLength,
  Container,
  MapBtn,
  Post,
  PostContainer,
  PostName,
  TextLocation,
} from "./DefaultPostScreen.styled";

export const DefaultPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [userAvatar, setUserAvatar] = useState([]);

  useEffect(() => {
    getUserAvatar(setUserAvatar);
    getAllPost(setPosts);
  }, []);

  const sortedTransactions = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const goToComments = (id, photo) => {
    navigation.navigate("MainScreen", { screenOpen: true });
    navigation.navigate("Комментарии", {
      postId: id,
      uri: photo,
    });
  };

  const goToMap = (region) => {
    navigation.navigate("MainScreen", { screenOpen: true });
    navigation.navigate("Карта", { location: region });
  };

  return (
    <Container>
      <FlatList
        data={sortedTransactions}
        keyExtractor={(_, indx) => indx.toString()}
        renderItem={({ item }) => {
          const { id, photo, photoName, region, length, userId } = item;
          const avatar = userAvatar.find((item) => item.userId === userId);

          return (
            <PostContainer>
              <AvatarContainer>
                <Avatar source={{ uri: avatar.photo }} />
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
              </AvatarContainer>
              <Post source={{ uri: photo }} />
              <View>
                <PostName>{photoName}</PostName>
              </View>
              <CommentBlock>
                <CommentBtn
                  onPress={() => {
                    goToComments(id, photo);
                  }}
                >
                  <Feather
                    name="message-circle"
                    size={24}
                    color="#BDBDBD"
                    style={{ marginRight: 6 }}
                  />
                  <View>
                    <CommentLength>{length}</CommentLength>
                  </View>
                </CommentBtn>
                {region && (
                  <MapBtn
                    onPress={() => {
                      goToMap(region);
                    }}
                  >
                    <Feather
                      name="map-pin"
                      size={24}
                      color="#BDBDBD"
                      style={{ marginRight: 4 }}
                    />
                    <View>
                      <TextLocation>
                        {region?.country}, {region?.region}
                      </TextLocation>
                    </View>
                  </MapBtn>
                )}
              </CommentBlock>
            </PostContainer>
          );
        }}
      />
    </Container>
  );
};
