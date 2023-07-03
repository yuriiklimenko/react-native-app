import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Image, View } from "react-native";
import { ref, deleteObject } from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";

import { AddAvatarIcon, RemoveAvatarIcon } from "../../../assets/icons";
import { selectAvatar } from "../../redux/auth/authSelectors";
import { storage } from "../../firebase/config";
import { changeAvatar } from "../../redux/auth/authOperations";
import { StyleSheet } from "react-native";

const Avatar = ({ fromScreen }) => {
  const [avatarUri, setAvatarUri] = useState(null);
  const avatarURL = useSelector(selectAvatar);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (avatarURL) {
      setAvatarUri(avatarURL);
    }
  }, [avatarURL]);

  const removeAvatar = async () => {
    const avatarRef = ref(storage, avatarURL);

    await deleteObject(avatarRef)
      .then(() => {
        dispatch(changeAvatar(""));
        setAvatarUri(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  // -----------
  return (
    <>
      {!avatarUri && (
        <TouchableOpacity
          style={styles.avatarBox}
          onPress={() => {
            navigation.navigate("Camera", { fromScreen });
          }}
        >
          <AddAvatarIcon style={styles.addIcon} />
        </TouchableOpacity>
      )}

      {/* ------------------------------------------- */}
      {avatarUri && (
        <View style={styles.avatarBox}>
          <Image style={styles.avatarStyle} source={{ uri: avatarUri }} />
          <TouchableOpacity onPress={removeAvatar}>
            <RemoveAvatarIcon style={styles.removeIcon} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  avatarBox: {
    // marginTop: -150,
    position: "absolute",
    top: -50,
    width: 120,
    height: 120,
    borderRadius: 16,
    alignSelf: "center",
    backgroundColor: "#F6F6F6",
  },
  avatarStyle: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  addIcon: {
    marginTop: 81,
    marginLeft: 107,
  },
  removeIcon: {
    marginTop: -45,
    marginLeft: 102,
  },
});

Avatar.propTypes = {
  photoUri: PropTypes.string,
  fromScreen: PropTypes.string.isRequired,
};

export default Avatar;
