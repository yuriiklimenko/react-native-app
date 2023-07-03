import "react-native-gesture-handler";
import React, { useEffect } from "react";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import Home from "./Screens/posts/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import CommentsScreen from "./Screens/posts/CommentsScreen";
import MapScreen from "./Screens/helpers/MapScreen";
import CameraPhone from "./Screens/helpers/CameraPhone";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./redux/auth/authSelectors";
import { authChangeUser } from "./redux/auth/authOperations";

// -----------------
const MainStack = createStackNavigator();

const Main = () => {
  const dispatch = useDispatch();
  const { isCurrentUser } = useSelector(selectUser);

  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    dispatch(authChangeUser());
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isCurrentUser && (
          <>
            <MainStack.Screen name="Login" component={LoginScreen} />
            <MainStack.Screen
              name="Registration"
              component={RegistrationScreen}
            />
          </>
        )}
        {isCurrentUser && <MainStack.Screen name="Home" component={Home} />}

        <MainStack.Screen name="Comments" component={CommentsScreen} />
        <MainStack.Screen name="Camera" component={CameraPhone} />
        <MainStack.Screen name="Map" component={MapScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
