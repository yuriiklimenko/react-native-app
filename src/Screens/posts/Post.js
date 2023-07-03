import PropTypes from "prop-types";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  MapPinIcon,
  MessageOffIcon,
  MessageOnIcon,
} from "../../../assets/icons";

const Post = ({ post, fromScreen }) => {
  const navigation = useNavigation();

  const {
    picture,
    title,
    descriptionLocation,
    latitude,
    longitude,
    countComments,
    idPost,
  } = post.item;

  const handleMapScreen = () => {
    navigation.navigate("Map", { latitude, longitude });
  };

  const handleCommentsScreen = () => {
    navigation.navigate("Comments", { picture, idPost });
  };

  return (
    <>
      <Image
        style={{ width: "100%", height: 240, borderRadius: 8 }}
        source={{ uri: picture }}
      />

      <Text style={styles.imgTitle}>{title}</Text>
      <View style={styles.infoWrapper}>
        <TouchableOpacity
          style={styles.commentWrapper}
          onPress={handleCommentsScreen}
        >
          {countComments ? <MessageOnIcon /> : <MessageOffIcon />}
          <Text
            style={{
              ...styles.textStyle,
              color: countComments ? "#212121" : "#BDBDBD",
            }}
          >
            {countComments}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoWrapper} onPress={handleMapScreen}>
          <MapPinIcon />
          <Text style={styles.locationStyle}>{descriptionLocation}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  imgTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    paddingVertical: 8,
  },
  infoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textStyle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 6,
  },
  locationStyle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
    marginLeft: 6,
  },
});

Post.propTypes = {
  post: PropTypes.object.isRequired,
  fromScreen: PropTypes.string,
};

export default Post;
