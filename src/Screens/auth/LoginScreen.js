import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { authLogin } from "../../redux/auth/authOperations";

import { useDispatch } from "react-redux";

const LoginScreen = () => {
  const [password, setPassword] = useState("");
  const [userEmail, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // ------------------------------------

  const handleLogIn = () => {
    dispatch(authLogin({ userEmail, password })).then((res) => {
      const isErrorLogin = res.user;
      if (!isErrorLogin) {
        console.log("Login Error", res);
        return;
      } else {
        setEmail("");
        setPassword("");
        navigation.navigate("Home");
      }
    });
  };
  // -----------
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ImageBackground
      source={require("../../../assets/img/bg.jpg")}
      style={styles.backgroundImage}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.registrationForm}>
            <Text style={styles.heading}>Увійти</Text>

            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "position"}
            >
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                placeholder="Адреса електронної пошти"
                value={userEmail}
                onChangeText={setEmail}
              />
              {/* ---- */}
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.inputPass}
                  placeholder="Пароль"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />

                <TouchableOpacity
                  style={styles.showPasswordButton}
                  onPress={toggleShowPassword}
                >
                  <Text style={styles.showPasswordText}>
                    {showPassword ? "Сховати" : "Показати"}
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
            {/* ---- */}
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogIn}>
              <Text style={styles.loginBtnText}>Увійти</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Registration")}
            >
              <Text style={styles.loginLinkText}>
                Немає акаунту? Зареєструватися
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },

  registrationForm: {
    position: "relative",
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 32,

    height: "70%",
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
    marginBottom: 43,
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },

  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
    height: 50,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },

  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },

  inputPass: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
  },

  showPasswordButton: {
    marginLeft: "auto",
    padding: 8,
    borderRadius: 8,
  },

  showPasswordText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
  },

  loginBtn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    padding: 16,
    marginTop: 43,
  },

  loginBtnText: {
    fontFamily: "Roboto-Regular",
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },

  loginLinkText: {
    fontFamily: "Roboto-Regular",
    marginTop: 18,
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
});
export default LoginScreen;
