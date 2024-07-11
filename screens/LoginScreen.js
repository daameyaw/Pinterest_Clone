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
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUserEmail, setUserPassword } from "../reducers/appReducer";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const dispatch = useDispatch();
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
        <View className="p-6">
          {/* <Text className="text-3xl w-96 mb-16">Sign in,Start Dreaming</Text> */}
          <Text className="ml-2 text-xl" style={styles.label}>
            Username
          </Text>

          <View className="absolute top-[35px] left-[40px] ">
            <FontAwesome name="user" size={20} color="#ffba08" />
          </View>
          <TextInput
            className="border-yellow-300 border-2 rounded-2xl pl-12 placeholder:text-md text-gray-400"
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
            placeholder="Name"
            keyboardType="text"
            autoCapitalize="none"
            autoCompleteType="email"
          />

          <Text className="ml-2 text-xl" style={styles.label}>
            Email
          </Text>
          <View className="absolute top-[63px] left-[40px] ">
            <Fontisto name="email" size={20} color="#ffba08" />
          </View>
          <TextInput
            className="rounded-2xl border-2 pl-12 placeholder:text-md"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCompleteType="email"
          />
          <Text className="ml-2 text-xl" style={styles.label}>
            Password
          </Text>
          <View className="absolute top-[153px] left-[40px] ">
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
              onPress={handleLogin}
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
                Log In
              </Text>
            </TouchableOpacity>
          )}
          <Text className="text-center mt-7 text-[15px]">
            Don't have an account?{" "}
            <Text
              onPress={() => navigation.replace("SignUp")}
              className="italic text-[17px]"
            >
              Sign up
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
});
