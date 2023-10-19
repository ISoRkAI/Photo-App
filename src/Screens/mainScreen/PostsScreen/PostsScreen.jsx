import { TouchableOpacity, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import { DefaultPostsScreen } from "./DefaultPostScreen/DefaultPostScreen";
import MapPostScreen from "./MapScreen/MapPostScreen";
import { CommentScreen } from "./CommentScreen/CommentScreen";

const AuthStack = createStackNavigator();

export const PostsScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{
          headerShown: false,
          headerBackVisible: true,
          headerBackTitleVisible: true,
        }}
        name="Publications"
        component={DefaultPostsScreen}
      ></AuthStack.Screen>
      <AuthStack.Screen
        options={{ headerBackTitle: "Назад" }}
        name="Карта"
        component={MapPostScreen}
      ></AuthStack.Screen>
      <AuthStack.Screen
        options={{ headerBackTitle: "Назад" }}
        name="Комментарии"
        component={CommentScreen}
      ></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};
