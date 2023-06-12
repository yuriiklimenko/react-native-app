import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../assets/img/bg.jpg")}
      style={styles.backgroundImage}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.wrapperProfile}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                console.log("Log out");
                navigation.navigate("Login");
              }}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            {/* ---- */}
            <View style={styles.profileImageContainer}>
              <TouchableOpacity style={styles.uploadButton}></TouchableOpacity>
            </View>
            {/* ------- */}

            <Text style={styles.heading}>Name</Text>
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
    // marginBottom: 43,
    marginTop: 92,

    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },

  // ----img
  profileImageContainer: {
    alignItems: "center",
    position: "absolute",
    top: -50,
    left: 0,
    right: 0,
    zIndex: 2,
  },

  uploadButton: {
    width: 120,
    height: 120,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  logoutButton: {
    marginLeft: "auto",
    zIndex: 10,
  },
});
