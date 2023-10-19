import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();

import RegistrationScreen from "./RegistrationScreen/RegistrationScreen";
import LoginScreen from "./LoginScreen/LoginScreen";

export const AuthScreen = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen
        name="RegistrScreen"
        component={RegistrationScreen}
      ></AuthStack.Screen>
      <AuthStack.Screen name="LogIn" component={LoginScreen}></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};
