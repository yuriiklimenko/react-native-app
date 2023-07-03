import PropTypes from "prop-types";
import { format } from "date-fns";
import { Image, View, Text, StyleSheet } from "react-native";

const Comment = ({ comment }) => {
  const isEven = comment.index % 2 === 0 ? true : false;

  const { textComment, dateComment } = comment.item;

  return (
    <View
      style={{
        paddingLeft: isEven ? 44 : 0,
        paddingRight: isEven ? 0 : 44,
        marginTop: 24,
      }}
    >
      <Image
        style={{
          ...styles.icon,
          alignSelf: isEven ? "flex-start" : "flex-end",
        }}
        source={require("../../../assets/img/user.png")}
      ></Image>
      <View
        style={{
          ...styles.commentContainer,
          borderTopRightRadius: isEven ? 8 : 0,
          borderTopLeftRadius: isEven ? 0 : 8,
        }}
      >
        <Text style={styles.commentText}>{textComment}</Text>
        <Text
          style={{
            ...styles.commentDate,
            alignSelf: isEven ? "flex-end" : "flex-start",
          }}
        >
          {format(dateComment, "PPpp")}
        </Text>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 28,
    borderRadius: 28,
    position: "absolute",
  },
  commentContainer: {
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  commentDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
    marginTop: 8,
  },
});

export default Comment;

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};
