import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import { authSignOutUser } from "../../../../redux/auth/authOperations";
import { selectorLogin, selectorUserId } from "../../../../redux/selectors";
import {
  getProfileAvatar,
  getUserPost,
} from "../../../../../firebase/firebaseOperations";
import {
  Avatar,
  AvatarBlock,
  AvatarContainer,
  CommentBlock,
  CommentBtn,
  CommentLength,
  Container,
  ExitBlock,
  MapBtn,
  Post,
  PostContainer,
  PostName,
  ProfileContainer,
  TextLocation,
} from "./DefaultProfileScreen.styled";

export const DefaultProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState([]);

  const dispatch = useDispatch();

  const id = useSelector(selectorUserId);
  const login = useSelector(selectorLogin);

  useEffect(() => {
    getUserPost(id, setPosts);
    getProfileAvatar(id, setImage);
  }, []);

  const signOut = () => {
    dispatch(authSignOutUser());
  };

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
      <ImageBackground
        style={{ flex: 1, justifyContent: "flex-end", paddingTop: 146 }}
        source={require("../../../../../assets/PhotoBG.png")}
      >
        <ProfileContainer>
          <AvatarContainer>
            <AvatarBlock>
              <Avatar source={{ uri: image[0] }} />
            </AvatarBlock>
          </AvatarContainer>
          <ExitBlock>
            <TouchableOpacity onPress={() => signOut()} title="exit">
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </ExitBlock>
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
                <PostContainer>
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
                        <TextLocation>{region?.country}</TextLocation>
                      </View>
                    </MapBtn>
                  </CommentBlock>
                </PostContainer>
              );
            }}
          />
        </ProfileContainer>
      </ImageBackground>
    </Container>
  );
};
