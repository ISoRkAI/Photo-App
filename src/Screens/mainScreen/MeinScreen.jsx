import { Platform } from "react-native";
import { useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

import { PostsScreen } from "./PostsScreen/PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen/CreatePostsScreen.jsx";
import { ProfileScreen } from "./ProfileScreen/ProfileScreen.jsx";
import { authSignOutUser } from "../../redux/auth/authOperations.js";
import { BtnExit, BtnGrid, BtnPlus, BtnUser } from "./MeinScreen.styled";

export const MainScreen = ({ route }) => {
  const screenOpen = route.params?.screenOpen;
  const dispatch = useDispatch();

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
