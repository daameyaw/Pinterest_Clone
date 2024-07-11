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
    <SafeAreaView>
      <>
        <View
          style={{
            marginTop: 50,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/Home.jpg")}
            style={{
              width: 120,
              height: 120,
              borderRadius: 70,
              resizeMode: "cover",
            }}
          />
        </View>
        <View className="p-6 mt-20">
          {/* <Text className="text-3xl w-96 mb-16">Sign in,Start Dreaming</Text> */}
          <View className="absolute top-[35px] left-[40px] ">
            <FontAwesome name="user" size={20} color="#ffba08" />
          </View>
          <TextInput
            className="border-yellow-300 border-2 rounded-2xl pl-12 placeholder:text-md text-gray-400"
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
            keyboardType="text"
            autoCapitalize="none"
            autoCompleteType="email"
          />
          <View className="absolute top-[93px] left-[40px] ">
            <Fontisto name="email" size={20} color="#ffba08" />
          </View>

          <TextInput
            className="border-yellow-300 border-2 rounded-2xl pl-12 placeholder:text-md text-gray-400"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCompleteType="email"
          />

          <View className="absolute top-[154px] left-[40px] ">
            <Feather name="lock" size={20} color="#ffba08" />
          </View>

          <TextInput
            className=" border-2  rounded-2xl pl-12 placeholder:text-md text-gray-400"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            autoCompleteType="password"
          />
        </View>
        <View className="px-4 py-4">
          {loading ? (
            <ActivityIndicator size="large" color="#edc531" />
          ) : (
            <TouchableOpacity
              className=" rounded-xl"
              disabled={!email || !password}
              onPress={signUp}
              style={{
                backgroundColor: !email || !password ? "gray" : "#edc531",
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
            Already have an account?{" "}
            <Text
              onPress={() => navigation.navigate("Login")}
              className="italic text-[17px]"
            >
              Log in
            </Text>
          </Text>
        </View>
      </>
    </SafeAreaView>
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
});
