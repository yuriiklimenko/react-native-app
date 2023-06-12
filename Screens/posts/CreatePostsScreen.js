import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const CreatePostsScreen = () => {
  const title = "Створити публікацію";
  const navigation = useNavigation();
  // -------------------

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

      headerLeft: () => (
        <View style={{ paddingLeft: 10 }}>
          <Feather
            name="arrow-left"
            size={24}
            color="#212121"
            onPress={() => navigation.goBack()}
          />
        </View>
      ),
    });
  }, [navigation]);
  // -------------

  return (
    <View style={styles.container}>
      <Text>CreatePosts Screen</Text>
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

export default CreatePostsScreen;
