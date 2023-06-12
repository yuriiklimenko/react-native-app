import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const PostsScreen = () => {
  const title = "Публікації";
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontFamily: "Roboto-Medium",
        fontWeight: "500",
        fontSize: 19,
        letterSpacing: -0.408,
        color: "#212121",
      },

      headerTitle: title,

      headerRight: () => (
        <View style={{ paddingRight: 10 }}>
          <Feather
            name="log-out"
            size={24}
            color="#BDBDBD"
            style={styles.logoutIcon}
            onPress={() => {
              console.log("Log out");
              navigation.navigate("Login");
            }}
          />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>PostsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PostsScreen;
