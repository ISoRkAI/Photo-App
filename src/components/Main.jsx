import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthScreen } from "../Screens/auth/authScreen";
import { MainScreen } from "../Screens/mainScreen/MainScreen";
import { authStateChangeUser } from "../redux/auth/authOperations";
import { isLogIn } from "../redux/selectors";

const Stack = createStackNavigator();

export const Main = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(isLogIn);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="MainScreen"
            component={MainScreen}
          />
        ) : (
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="AuthScreen"
            component={AuthScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
