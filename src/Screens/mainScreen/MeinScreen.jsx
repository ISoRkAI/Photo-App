import { Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

import { PostsScreen } from "./PostsScreen/PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen/CreatePostsScreen.jsx";
import { ProfileScreen } from "./ProfileScreen/ProfileScreen.jsx";
import { authSignOutUser } from "../../redux/auth/authOperations.js";
import { BtnExit, BtnGrid, BtnPlus, BtnUser } from "./MeinScreen.styled";
import {
  selectorAvatar,
  selectorLogin,
  selectorUserId,
} from "../../redux/selectors";
import { nanoid } from "@reduxjs/toolkit";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { db, storage } from "../../../firebase/config";
import { addDoc, collection, doc, setDoc } from "@firebase/firestore";
import { useEffect } from "react";

export const MainScreen = ({ route }) => {
  const screenOpen = route.params?.screenOpen;
  const dispatch = useDispatch();

  const avatarUrl = useSelector(selectorAvatar);
  const userId = useSelector(selectorUserId);
  const login = useSelector(selectorLogin);

  useEffect(() => {
    if (!!avatarUrl) {
      uploadPostToServer();
    }
  }, []);

  const uploadAvatarToServer = async () => {
    try {
      const id = nanoid();
      const storageRef = ref(storage, `avatar/${id}`);
      const response = await fetch(avatarUrl);
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
      const photo = await uploadAvatarToServer();
      await setDoc(doc(db, "avatars", `${userId}`), {
        photo,
        userId,
        login,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: !screenOpen,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: Platform.OS === "ios" ? 100 : 70,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarStyle: { display: screenOpen ? "none" : "" },
          headerRight: () => (
            <BtnExit onPress={() => signOut()} title="exit">
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </BtnExit>
          ),
          tabBarIcon: ({ focused, color }) => (
            <BtnGrid>
              <Feather
                name="grid"
                size={24}
                color={focused ? color : "rgba(33, 33, 33, 0.8) "}
              />
            </BtnGrid>
          ),
        }}
        name="Публикации"
        component={PostsScreen}
      />
      <Tab.Screen
        options={{
          tabBarStyle: { display: "none" },
          headerShown: false,
          tabBarIcon: () => (
            <BtnPlus>
              <Feather name="plus" size={24} color="#ffffff" />
            </BtnPlus>
          ),
        }}
        name="CreatePosts"
        component={CreatePostsScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <BtnUser>
              <Feather
                name="user"
                size={24}
                color={focused ? color : "rgba(33, 33, 33, 0.8) "}
              />
            </BtnUser>
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};
