import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { CameraIcon, MapPinIcon, TrashIcon } from "../../../assets/icons";

import {
  uploadPostToServer,
  getPosts,
} from "../../redux/posts/postsOperations";

import { selectPictureData } from "../../redux/posts/postsSelectors";

const initialValue = {
  title: null,
  descriptionLocation: null,

  picture: null,

  latitude: null,
  longitude: null,

  countComments: 0,
};

// ----------

const CreatePostsScreen = () => {
  const [value, setValue] = useState(initialValue);
  const [isActiveBtn, setIsActiveBtn] = useState(false);

  const navigation = useNavigation();
  const { picture, latitude, longitude } = useSelector(selectPictureData);
  const dispatch = useDispatch();

  useEffect(() => {
    setValue({ ...value, picture, latitude, longitude });
  }, [picture, latitude, longitude]);

  useEffect(() => {
    if (value.title && value.descriptionLocation && value.picture) {
      setIsActiveBtn(true);
    } else setIsActiveBtn(false);
  }, [value.title, value.descriptionLocation, value.picture]);
  // --------------------------

  const handleChangeInput = (name, value) => {
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  // ------------------------------------------

  const publishPost = () => {
    dispatch(uploadPostToServer(value));
    dispatch(getPosts());
    setValue(initialValue);
    navigation.navigate("Posts");
  };

  // ------------------

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
      headerTitle: "Створити публікацію",
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

  // -----------------------
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainContainer}>
        <View>
          {!picture && (
            <>
              <TouchableOpacity
                style={styles.cameraBox}
                onPress={() => {
                  navigation.navigate("Camera", { fromScreen: "createPost" });
                }}
              >
                <View style={styles.cameraIcon}>
                  <CameraIcon />
                </View>
              </TouchableOpacity>
              <Text style={styles.textStyle}>Завантажте фото</Text>
            </>
          )}

          {picture && (
            <>
              <TouchableOpacity
                style={styles.cameraBox}
                onPress={() => {
                  navigation.navigate("Camera", { fromScreen: "createPost" });
                }}
              >
                <Image
                  style={{ height: 240, width: "100%", borderRadius: 8 }}
                  source={{ uri: picture }}
                />
                <View style={styles.cameraIcon}>
                  <CameraIcon />
                </View>
              </TouchableOpacity>
              <Text style={styles.textStyle}>Редагувати фото</Text>
            </>
          )}
        </View>
        {/* ------------------------ */}

        <View style={{ paddingTop: 32 }}>
          <TextInput
            style={styles.input}
            placeholder="Назва.."
            placeholderTextColor="#BDBDBD"
            value={value.title}
            onChangeText={(value) => handleChangeInput("title", value)}
          />
          {/* ---------------- */}

          <View style={{ justifyContent: "center" }}>
            <TextInput
              style={styles.inputLocation}
              placeholder="Місцевість"
              placeholderTextColor="#BDBDBD"
              value={value.descriptionLocation}
              onChangeText={(value) =>
                handleChangeInput("descriptionLocation", value)
              }
            />
            <MapPinIcon style={{ position: "absolute" }} />
          </View>
        </View>
        {/* ------------------------- */}

        <TouchableOpacity
          style={[
            styles.mainBtn,
            { backgroundColor: isActiveBtn ? "#FF6C00" : "#F6F6F6" },
          ]}
          disabled={!isActiveBtn}
          onPress={publishPost}
        >
          <Text style={styles.mainBtnTitle}>
            {isActiveBtn ? (
              <Text style={{ color: "#fff" }}>Опубліковати</Text>
            ) : (
              "Опубліковати"
            )}
          </Text>
        </TouchableOpacity>

        {/* ------------------------- */}
        <View style={styles.centerContainer}>
          <TouchableOpacity
            style={styles.trashIconContainer}
            onPress={() => setValue(initialValue)}
            disabled={!isActiveBtn}
          >
            <TrashIcon isActive={isActiveBtn} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "#FFF",
  },

  cameraBox: {
    height: 240,
    width: "100%",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 8,
  },

  cameraIcon: {
    position: "absolute",
    top: "40%",
    left: "42%",
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  mainBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginTop: 32,
    borderRadius: 100,
  },
  mainBtnTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },

  input: {
    marginBottom: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  inputLocation: {
    paddingLeft: 28,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  textStyle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  trashIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",

    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
});

export default CreatePostsScreen;
