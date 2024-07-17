import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function StartScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />
      <View className=" flex-1   p-10 mb-64">
        <Image
          resizeMode="contain"
          source={require("../assets/Home.jpg")}
          style={styles.cardImage}
        />
        <View className="items-center">
          <Text className="text-[#f5b352]  -mt-24  text-3xl font-bold ">
            CRAFT YOUR DREAMS
          </Text>
        </View>
        <View className="text-white items-center   ">
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            className="rounded-xl -mt-2"
            style={{
              width: "80%",
              alignSelf: "center",
              paddingVertical: 12,
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <Text
              style={{
                fontSize: 22,
                textAlign: "center",
                color: "black",
              }}
            >
              Log in
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.replace("SignUp")}
            className="mt-6"
          >
            <Text className="text-white text-lg">Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardImage: {
    width: "100%",
    height: "100%",

    // filter: "grayscale(50%)",
    // filter: "drop-shadow(8px 8px 10px gray)",
    // opacity: 0.5,
  },
});
