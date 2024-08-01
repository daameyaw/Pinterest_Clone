import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { getPins } from "../services/apiPins";
import { setPins } from "../reducers/appReducer";
import { useDispatch } from "react-redux";

function WelcomeScreen() {
  const navigation = useNavigation();
  function handleSignUp() {
    navigation.navigate("SignUp");
  }
  function handleLogIn() {
    navigation.navigate("Login");
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <View className="text-center justify-center items-center space-y-6 mb-6">
        <Image
          className="w-24 h-24 p-18 bg-red-300 rounded-full"
          source={require("../assets/favicon.png")}
        />
        <Text className="font-bold text-3xl">Welcome to Pinterest</Text>
      </View>
      <View className="space-y-4">
        <TouchableOpacity
          onPress={handleSignUp}
          className="bg-red-700 p-4 px-32 rounded-full"
        >
          <Text className="text-white text-lg">Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogIn}
          className="bg-gray-200 p-4 px-32 rounded-full"
        >
          <Text className="text-black text-lg">Log In</Text>
        </TouchableOpacity>
      </View>
      <View className="p-8  text-center">
        <Text className="text-xs w-72">
          By continuing,you agree to DreamBorad's{" "}
          <Text className="font-bold">Terms of Serivces</Text> and acknowledge
          that you've read our{" "}
          <Text className="font-bold">Privacy Policy.</Text>{" "}
        </Text>
      </View>
    </View>
  );
}

export default WelcomeScreen;
