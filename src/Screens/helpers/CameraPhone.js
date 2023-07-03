import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, ImageBackground } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImageManipulator from "expo-image-manipulator";
import { Loading } from "../helpers/Loading";

import { SavePhotoIcon, FlipIcon, GoBack } from "../../../assets/icons";
import { StyleSheet } from "react-native";

import { changeAvatar } from "../../redux/auth/authOperations";
import { storage } from "../../firebase/config";

import { postsSlice } from "../../redux/posts/postsSlice";

const CameraPhone = ({ route }) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const fromScreen = route.params.fromScreen;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      const locationStatus = await Location.requestForegroundPermissionsAsync();
      if (status === "granted" && locationStatus.status === "granted") {
        setHasPermission(true);
      } else {
        console.log("error permision");
      }
    })();
  }, []);

  const makePhoto = async () => {
    setLoading(true);
    const { uri } = await cameraRef.takePictureAsync();

    await MediaLibrary.createAssetAsync(uri);
    const location = await Location.getCurrentPositionAsync();

    setLoading(false);
    setLocation(location.coords);
    setPhoto(uri);
  };
  // ---------------------------------------------------

  const uploadPhotoToServer = async () => {
    const { uri } = await ImageManipulator.manipulateAsync(
      photo,
      [{ resize: { width: 700 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );

    const res = await fetch(uri);

    const file = await res.blob();

    const uniqueId = Date.now().toString();

    const storageRef =
      fromScreen === "createPost"
        ? ref(storage, `postsImages/post_${uniqueId}`)
        : ref(storage, `avatarPhoto/avatar_${uniqueId}`);

    try {
      await uploadBytes(storageRef, file);

      const processedPhoto = await getDownloadURL(storageRef);

      return processedPhoto;
    } catch (error) {
      console.log(error);
    }
  };
  // ---------------------------------------------------

  const savePhoto = async () => {
    const downloadedPhoto = await uploadPhotoToServer();
    //   ---------------------------------
    if (fromScreen === "createPost") {
      dispatch(
        postsSlice.actions.updatePicture({
          picture: downloadedPhoto,
          latitude: location.latitude,
          longitude: location.longitude,
        })
      );
    } else dispatch(changeAvatar(downloadedPhoto));
    // --------------

    switch (fromScreen) {
      case "registration":
        navigation.navigate("Registration", { photoUri: downloadedPhoto });
        break;
      case "profile":
        navigation.navigate("Profile", { photoUri: downloadedPhoto });
        break;
      case "createPost":
        navigation.navigate("CreatePost");
        break;
      default:
        break;
    }
  };
  // =====================================================================

  return (
    <>
      {loading && (
        <Loading loading={loading} title="Секундочку. Роблю фото..." />
      )}
      {/* ----- */}
      <View style={{ flex: 1 }}>
        {hasPermission ? (
          // ----------------------------------
          <Camera
            style={{ flex: 1 }}
            ref={(ref) => {
              setCameraRef(ref);
            }}
          >
            {photo && (
              <View style={styles.previewPhotoWrapper}>
                <ImageBackground
                  source={{ uri: photo }}
                  style={styles.previewPhoto}
                ></ImageBackground>
              </View>
            )}

            <View style={styles.photoView}>
              <TouchableOpacity
                style={{ ...styles.othersBtn, left: 60 }}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <FlipIcon />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cameraBtnWrapper}
                onPress={makePhoto}
              >
                <View style={styles.cameraBtnOut}>
                  <View style={styles.cameraBtnInner}></View>
                </View>
              </TouchableOpacity>

              {/* ========  */}
              {photo && (
                <TouchableOpacity
                  style={{ ...styles.othersBtn, right: 60 }}
                  onPress={savePhoto}
                >
                  <SavePhotoIcon />
                </TouchableOpacity>
              )}
              {/* ======== */}

              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  zIndex: 1,
                }}
                onPress={() => navigation.goBack()}
              >
                <GoBack />
              </TouchableOpacity>
            </View>
          </Camera>
        ) : (
          // ----------------------------------
          <View></View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  cameraBtnWrapper: {
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
  },
  cameraBtnOut: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraBtnInner: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
  },
  othersBtn: {
    position: "absolute",
    bottom: 26,
  },
  previewPhotoWrapper: {
    position: "absolute",

    top: "20%",
    alignSelf: "center",
    width: "92%",
    height: "45%",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  previewPhoto: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  previewPhotoDate: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default CameraPhone;
