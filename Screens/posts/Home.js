import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const Tabs = createBottomTabNavigator();

const Home = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Posts") {
            iconName = "grid";
          } else if (route.name === "CreatePosts") {
            iconName = "plus";
          } else if (route.name === "Profile") {
            iconName = "user";
          }

          return (
            // ---------------------
            <View
              style={{
                width: 70,
                height: 40,
                borderRadius: 20,
                backgroundColor: focused ? "#FF6C00" : "#FFF",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather
                name={iconName}
                size={24}
                color={focused ? "#FFFFFF" : color}
              />
            </View>
            // ---------------------
          );
        },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#212121",
        tabBarLabel: () => null,
      })}
    >
      <Tabs.Screen name="Posts" component={PostsScreen} />
      <Tabs.Screen name="CreatePosts" component={CreatePostsScreen} />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
};

export default Home;
