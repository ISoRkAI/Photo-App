import { createStackNavigator } from "@react-navigation/stack";
import { DefaultProfileScreen } from "./DefaultProfileScreen/DefaultProfileScreen";
import MapProfileScreen from "./MapScreen/MapProfileScreen";
import { CommentProfileScreen } from "./CommentScreen/CommentProfileScreen";

const AuthStack = createStackNavigator();

export const ProfileScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{
          headerShown: false,
          headerBackVisible: true,
          headerBackTitleVisible: true,
        }}
        name="Publications"
        component={DefaultProfileScreen}
      ></AuthStack.Screen>
      <AuthStack.Screen
        options={{ headerBackTitle: "Назад" }}
        name="Карта"
        component={MapProfileScreen}
      ></AuthStack.Screen>
      <AuthStack.Screen
        options={{ tabBarStyle: { display: "none" }, headerBackTitle: "Назад" }}
        name="Комментарии"
        component={CommentProfileScreen}
      ></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};
