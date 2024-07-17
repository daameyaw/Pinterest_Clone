import { AntDesign, Feather, FontAwesome, Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component, useState } from "react";
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
  PlatformColor,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  setUserEmail,
  setUserName,
  setUserPassword,
} from "../reducers/appReducer";
import { StatusBar } from "expo-status-bar";

const auth = FIREBASE_AUTH;

export default function LoginScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  function goBack() {
    navigation.goBack();
  }

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      alert("Sign Up Success");
      dispatch(setUserName(name));
      dispatch(setUserEmail(email));
      dispatch(setUserPassword(password));
      navigation.replace("Pins");
    } catch (error) {
      alert("Sign in failed " + error.message);
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
      className="flex-1 bg-black"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.select({ ios: 60, android: 80 })}
    >
      <ScrollView>
        <StatusBar style="dark" />
        <View>
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
          <View className="p-6 ">
            {/* <Text className="text-3xl w-96 mb-16">Sign in,Start Dreaming</Text> */}

            <View className="mb-5">
              <View style={styles.searchContainer}>
                <View style={styles.icon}>
                  <FontAwesome name="user" size={20} color="#f5b352" />
                </View>
                <TextInput
                  className="  rounded-xl  placeholder:text-md text-gray-400"
                  value={name}
                  onChangeText={setName}
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
                  <Fontisto name="email" size={20} color="#f5b352" />
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
                  <Feather name="lock" size={20} color="#f5b352" />
                </View>
                <TextInput
                  className=" text-black  rounded-xl  placeholder:text-md"
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
                onPress={signUp}
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
                  Sign up
                </Text>
              </TouchableOpacity>
            )}
            <Text className="text-center mt-7 text-[15px]">
              Already have an account?
              <Text
                onPress={() => navigation.navigate("Login")}
                className="italic text-[17px] text-[#f5b352]"
              >
                Log in
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
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
    borderColor: "#ffd100",
    borderWidth: 1,
    // paddingHorizontal: 10,
    // paddingVertical: 25,
    marginBottom: 20,
    borderRadius: 5,
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
    borderWidth: 0.5,
    // borderRadius: 0,
    borderColor: "#d1d1d1",
    // backgroundColor: "#f1f2f6",
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
