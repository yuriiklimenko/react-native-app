import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const CommentsScreen = () => {
  const title = "Коментарі";
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
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
      headerStyle: {
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
      },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Comments Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: "100%",
    height: 240,
    marginBottom: 16,
    resizeMode: "cover",
  },
});

export default CommentsScreen;
