import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const PostsScreen = () => {
  const title = "Публікації";
  const navigation = useNavigation();

  const route = useRoute();
  const posts = route.params.posts;

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

  const handleCommentPress = () => {
    navigation.navigate("Comments");
  };

  const handleLocationPress = (post) => {
    navigation.navigate("Map", {
      latitude: post.latitude,
      longitude: post.longitude,
    });
  };

  return (
    <View style={styles.container}>
      {posts.map((post, index) => (
        <View style={styles.post} key={index}>
          <View style={styles.imageContainer}>
            <Text>Картинка</Text>
          </View>

          <Text style={styles.title}>{post.title}</Text>

          <View style={styles.infoContainer}>
            <TouchableOpacity onPress={handleCommentPress}>
              <Feather name="message-circle" size={18} color="#212121" />
            </TouchableOpacity>
            <Text style={styles.commentCount}>0</Text>
            <TouchableOpacity onPress={() => handleLocationPress(post)}>
              <View style={styles.locationContainer}>
                <Feather name="map-pin" size={18} color="#212121" />
                <Text style={styles.location}>{post.latitude}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 16,
  },
  header: {
    fontFamily: "Roboto-Medium",
    fontSize: 18,
    marginBottom: 16,
  },
  post: {
    width: 343,
    height: 299,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
  },
  imageContainer: {
    width: "100%",
    height: 240,
    marginBottom: 8,
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentCount: {
    marginLeft: 4,
    marginRight: 12,
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    color: "#212121",
  },

  locationContainer: {
    marginLeft: 4,
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
  },

  location: {
    fontFamily: "Roboto-Regular",
    marginLeft: 6,
    fontSize: 14,
    color: "#212121",
  },
});

export default PostsScreen;
