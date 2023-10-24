import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { doc, setDoc } from "@firebase/firestore";

import { Feather } from "@expo/vector-icons";

import {
  selectorAvatar,
  selectorLogin,
  selectorUserId,
} from "../../redux/selectors";
import { db } from "../../../firebase/config";

import { PostsScreen } from "./PostsScreen/PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen/CreatePostsScreen.jsx";
import { ProfileScreen } from "./ProfileScreen/ProfileScreen.jsx";
import { authSignOutUser } from "../../redux/auth/authOperations.js";
import { BtnExit, BtnGrid, BtnPlus, BtnUser } from "./MeinScreen.styled";

const Tab = createBottomTabNavigator();

export const MainScreen = ({ route }) => {
  const [avatarUrl, setAvatarUrl] = useState(useSelector(selectorAvatar));

  const dispatch = useDispatch();

  const userId = useSelector(selectorUserId);
  const login = useSelector(selectorLogin);
  const screenOpen = route.params?.screenOpen;

  useEffect(() => {
    if (!!avatarUrl) {
      uploadPostToServer(avatarUrl);
      setAvatarUrl(null);
      return;
    }
  }, []);

  const uploadPostToServer = async (avatarUrl) => {
    try {
      await setDoc(doc(db, "avatars", `${userId}`), {
        photo: avatarUrl,
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
          tabBarStyle: { display: screenOpen ? "none" : "" },
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
