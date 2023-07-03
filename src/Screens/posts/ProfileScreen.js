import { useEffect } from "react";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { authLogout } from "../../redux/auth/authOperations";
import Avatar from "../helpers/Avatar";
import Post from "./Post";

import { selectUser } from "../../redux/auth/authSelectors";
import { selectPosts } from "../../redux/posts/postsSelectors";
import { getPosts } from "../../redux/posts/postsOperations";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const { userName } = useSelector(selectUser);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <ImageBackground
      source={require("../../../assets/img/bg.jpg")}
      style={styles.backgroundImage}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.wrapperProfile}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                dispatch(authLogout());
              }}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>

            <Avatar fromScreen="profile" />

            <Text style={styles.heading}>{userName}</Text>

            <FlatList
              data={posts}
              keyExtractor={(post) => post.idPost}
              renderItem={(post) => (
                <View style={{ marginBottom: 32 }}>
                  <Post post={post} fromScreen="profile" />
                </View>
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },

  wrapperProfile: {
    position: "relative",
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 22,

    height: "80%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  heading: {
    fontFamily: "Roboto-Medium",
    marginTop: 60,
    marginBottom: 32,

    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },

  logoutButton: {
    marginLeft: "auto",
    zIndex: 10,
  },
});
