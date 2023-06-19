import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";

import * as Location from "expo-location";

// ----------

const CreatePostsScreen = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [location, setLocation] = useState("");

  const [photoTitle, setPhotoTitle] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const cameraRef = useRef(null);
  const title = "Створити публікацію";
  const navigation = useNavigation();

  const [posts, setPosts] = useState([]);
  // =================================================================

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");

      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
  };

  const takePhoto = async () => {
    if (cameraRef.current && isCameraReady) {
      let { status } = await Camera.requestCameraPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission denied");
        return;
      }

      try {
        let photo = await cameraRef.current.takePictureAsync();
        console.log(photo.uri);
        setPhoto(photo);
      } catch (error) {
        console.log("Error taking photo", error);
      }
    }
  };

  const addPost = (post) => {
    setPosts([...posts, post]);
  };

  const publishPost = () => {
    const post = {
      title: photoTitle,
      latitude: latitude,
      longitude: longitude,
      photo: photo ? photo.uri : null,
    };

    addPost(post);

    setPhoto(null);
    setPhotoTitle("");
    setLatitude(null);
    setLongitude(null);
  };

  // ------------------

  useEffect(() => {
    requestLocationPermission();
  }, []);
  useEffect(() => {
    takePhoto();
  }, []);

  useEffect(() => {
    navigation.navigate("Posts", { getParams: navigation.getParams, posts });
  }, [posts]);

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

  // -----------------------
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={cameraRef}
        onCameraReady={() => setIsCameraReady(true)}
      >
        <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
          <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </Camera>

      <Text style={styles.placeholderText}>Завантажте фото</Text>
      {/* --------------- */}
      <TextInput
        style={styles.input}
        placeholder="Назва..."
        value={photoTitle}
        onChangeText={setPhotoTitle}
      />
      <View style={styles.locationInputContainer}>
        <Feather
          name="map-pin"
          size={20}
          color="#707070"
          style={styles.locationIcon}
        />

        <TextInput
          style={styles.locationInput}
          placeholder="Місцевість"
          value={location}
          onChangeText={setLocation}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.publishButton,
          {
            backgroundColor: photo && photoTitle ? "#FF6C00" : "#F6F6F6",
          },
        ]}
        onPress={publishPost}
        disabled={!photo || !photoTitle || !location}
      >
        <Text style={styles.publishButtonText}>Опублікувати</Text>
      </TouchableOpacity>

      <View style={styles.centerContainer}>
        <TouchableOpacity style={styles.trashIconContainer}>
          <Feather name="trash-2" size={24} color="#DADADA" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
  },
  camera: {
    width: "100%",
    height: 240,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontFamily: "Roboto-Regular",
    fontWeight: 400,
    fontSize: 16,
    color: "#BDBDBD",
    marginBottom: 48,
  },
  input: {
    fontFamily: "Roboto-Regular",
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontSize: 16,
    marginBottom: 32,
  },

  locationInputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  locationIcon: {
    marginRight: 8,
    color: "#BDBDBD",
  },
  locationInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  publishButton: {
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 32,
    borderRadius: 100,
  },
  publishButtonText: {
    fontFamily: "Roboto-Regular",
    fontWeight: 400,
    fontSize: 16,
    color: "#FFF",
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

  snapContainer: {
    justifyContent: "center",
    alignItems: "center",

    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#FFF",
  },
});

export default CreatePostsScreen;
