import React from "react";

import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Comment from "./Comment";
import { SendIcon } from "../../../assets/icons";

import {
  uploadComments,
  getCommentsByPostId,
} from "../../redux/posts/postsOperations";
import { selectComments } from "../../redux/posts/postsSelectors";

const CommentsScreen = ({ route }) => {
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
      headerTitle: "Коментарі",
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

  const [text, setChangeText] = useState(null);
  const [isActiveInput, setIsActiveInput] = useState(false);
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);

  const { idPost, picture } = route.params;

  useEffect(() => {
    dispatch(getCommentsByPostId(idPost));
  }, [dispatch]);

  const handleComment = () => {
    if (!text || text.length < 5 || text.length > 100) {
      console.log("Коментар повинен містити від 5 до 100 символів.");
      return;
    }

    const newComment = {
      idComment: Date.now().toString(),
      textComment: text.trim(),
      dateComment: Date.now(),
      idPost,
    };

    dispatch(uploadComments(newComment));
    dispatch(getCommentsByPostId(idPost));

    setChangeText("");
  };

  return (
    <>
      <View style={styles.commentWrapper}>
        <Image style={styles.commentIcon} source={{ uri: picture }} />
        <FlatList
          style={{ marginTop: 8 }}
          data={comments}
          keyExtractor={(comment) => comment.idComment}
          renderItem={(comment) => <Comment comment={comment} />}
        />
        <View style={{ paddingVertical: 16, justifyContent: "center" }}>
          <TextInput
            style={{
              ...styles.inputStyle,
              borderColor: isActiveInput ? "#FF6C00" : "#E8E8E8",
            }}
            placeholder="Коментувати..."
            placeholderTextColor="#BDBDBD"
            value={text}
            onFocus={() => setIsActiveInput(true)}
            onEndEditing={() => setIsActiveInput(false)}
            onChangeText={setChangeText}
          />
          <TouchableOpacity
            style={{ position: "absolute", right: 8 }}
            onPress={handleComment}
          >
            <SendIcon />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  commentWrapper: {
    flex: 1,
    padding: 16,

    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: "#FFF",
  },

  commentIcon: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },

  inputStyle: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    paddingLeft: 16,
    paddingRight: 50,
  },
});

export default CommentsScreen;
