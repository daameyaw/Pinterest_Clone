import { AntDesign, Feather, FontAwesome, Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component, useState } from "react";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setPins, setUserEmail, setUserPassword } from "../reducers/appReducer";
import { getPins } from "../services/apiPins";
import { useQuery } from "@tanstack/react-query";

export default function LoginScreen() {
  const dispatch = useDispatch();
  // const {
  //   isLoading,
  //   data: Pins,
  //   error,
  // } = useQuery({
  //   queryKey: ["Pins"],
  //   queryFn: getPins,
  // });

  // console.log(isLoading);
  // console.log(error);
  // console.log(Pins);
  // dispatch(setPins(Pins));

  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  function goBack() {
    navigation.goBack();
  }

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert("Login successful");
      navigation.replace("Pins");
      dispatch(setUserName(userName));
      dispatch(setUserEmail(email));
      dispatch(setUserPassword(password));
    } catch (error) {
      console.log(error);
      // alert("Sign in failed " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleLogin = () => {
  //   if (!email || !password) {
  //     console.log("Email and password are required.");
  //     return;
  //   }
  //   // Handle login logic here
  //   console.log("Logging in with:", { email, password });
  //   navigation.navigate("Pins", { password, email });
  // };
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.select({ ios: 60, android: 80 })}
    >
      <>
        <View
          style={{
            marginTop: 150,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 90,
          }}
        >
          <Image
            source={require("../assets/Home.jpg")}
            style={{
              width: 220,
              height: 220,
              borderRadius: 150,
              resizeMode: "cover",
            }}
          />
        </View>
        <View className="p-6">
          {/* <Text className="text-3xl w-96 mb-16">Sign in,Start Dreaming</Text> */}

          <View className="mb-5">
            <View style={styles.searchContainer}>
              <View style={styles.icon}>
                <FontAwesome name="user" size={20} color="#ac6c15" />
              </View>
              <TextInput
                className="  rounded-xl  placeholder:text-md text-gray-400"
                value={userName}
                onChangeText={setUserName}
                placeholder="Name"
                keyboardType="text"
                autoCapitalize="none"
                autoCompleteType="email"
                style={styles.search}
              />
            </View>
          </View>

          <View className="mb-5">
            <View style={styles.searchContainer}>
              <View style={styles.icon}>
                <Fontisto name="email" size={20} color="#ac6c15" />
              </View>
              <TextInput
                className="  rounded-xl  placeholder:text-md text-gray-400"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCompleteType="email"
                style={styles.search}
              />
            </View>
          </View>

          <View>
            <View style={styles.searchContainer}>
              <View style={styles.icon}>
                <Feather name="lock" size={20} color="#ac6c15" />
              </View>
              <TextInput
                className="  rounded-xl  placeholder:text-md text-gray-400"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
                autoCompleteType="password"
                style={styles.search}
              />
            </View>
          </View>
        </View>
        <View className="px-4 py-4">
          {loading ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <TouchableOpacity
              className=" rounded-xl"
              disabled={!email || !password}
              onPress={handleLogin}
              style={{
                backgroundColor: !email || !password ? "gray" : "black",
                width: "70%",
                alignSelf: "center",
                paddingVertical: 12,
                justifyContent: "center",
              }}
            >
              <Text
                className="text-center"
                style={{ color: "white", fontSize: 22, fontWeight: "bold" }}
              >
                Log In
              </Text>
            </TouchableOpacity>
          )}
          <Text className="text-center mt-7 text-[15px]">
            Don't have an account?{" "}
            <Text
              onPress={() => navigation.replace("SignUp")}
              className="italic text-[17px] text-[#f5b352]"
            >
              Sign up
            </Text>
          </Text>
        </View>
      </>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    // paddingHorizontal: 10,
    // paddingVertical: 25,
    marginBottom: 20,
    borderRadius: 5,
    color: "black",
  },
  loginButton: {
    backgroundColor: "red",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 21,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  headerRight: {
    width: 24,
  },
  searchContainer: {
    // backgroundColor: "white",
    width: "100%",
    borderColor: "white",
    marginTop: 4,
    marginBottom: 20,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  search: {
    position: "absolute",
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    // borderColor: "#ddd",
    borderColor: "gray",
    backgroundColor: "#f1f2f6",
    padding: 12,
    fontSize: 16,
    paddingHorizontal: 40,
    color: "black",
    marginLeft: 10,
    zIndex: 0,
  },
  icon: {
    marginLeft: 10,
    zIndex: 1,
  },
});
