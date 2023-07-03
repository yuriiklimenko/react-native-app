import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { authLogout } from "../../redux/auth/authOperations";

import Post from "./Post";

import { selectUser } from "../../redux/auth/authSelectors";
import { selectPosts } from "../../redux/posts/postsSelectors";
import { getPosts } from "../../redux/posts/postsOperations";

const PostsScreen = () => {
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

      headerTitle: "Публікації",

      headerRight: () => (
        <View style={{ paddingRight: 10 }}>
          <Feather
            name="log-out"
            size={24}
            color="#BDBDBD"
            style={styles.logoutIcon}
            onPress={() => {
              dispatch(authLogout());
            }}
          />
        </View>
      ),
    });
  }, [navigation]);

  const { userName, userEmail, avatar } = useSelector(selectUser);

  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.mainScreenWrapper}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={styles.avatarImg}
            source={{ uri: avatar ? avatar : null }}
          />
          <View>
            <Text style={styles.avatarName}>{userName}</Text>
            <Text style={styles.avatarEmail}>{userEmail}</Text>
          </View>
        </View>
      </View>
      <FlatList
        style={{ paddingHorizontal: 16 }}
        data={posts}
        keyExtractor={(post) => post.idPost}
        renderItem={(post) => (
          <View style={{ marginBottom: 32 }}>
            <Post post={post} fromScreen="posts" />
          </View>
        )}
      />
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  mainScreenWrapper: {
    paddingVertical: 32,
    paddingHorizontal: 16,
  },

  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginRight: 8,
  },
  avatarName: {
    fontFamily: "Roboto-Bold",
    fontSize: 15,
    lineHeight: 17,
    color: "#212121",
    marginBottom: 4,
  },
  avatarEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 15,
    color: "rgba(33, 33, 33, 0.8)",
  },
});
