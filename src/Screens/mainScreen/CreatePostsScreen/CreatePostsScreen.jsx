import { TouchableOpacity, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";

import MapScreen from "./MapScreen/MapScreen";
import { DefaultScreen } from "./DefaultScreen/DefaultScreen";

const AuthStack = createStackNavigator();

export const CreatePostsScreen = ({ navigation, route }) => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{
          headerBackVisible: true,
          headerBackTitleVisible: true,
          headerBackTitle: "Назад",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Публикации")}
              title="back"
              style={{ marginLeft: 16 }}
            >
              <View>
                <Feather name="arrow-left" size={24} color="black" />
              </View>
            </TouchableOpacity>
          ),
        }}
        name="Создать публикацию"
        component={DefaultScreen}
      ></AuthStack.Screen>
      <AuthStack.Screen
        options={{ headerBackTitle: "Назад" }}
        name="Карта"
        component={MapScreen}
      ></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};
