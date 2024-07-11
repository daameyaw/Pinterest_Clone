import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
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
      <ImageBackground
        resizeMode="center"
        source={require("../assets/Home.jpg")}
        style={styles.cardImage}
      />
      <Text className="text-white py-5 text-2xl font-bold absolute bottom-[250px] left-[75px]">
        CRAFT YOUR DREAMS
      </Text>
      <View className="text-white items-center  absolute bottom-[150px] left-[145px]">
        <TouchableOpacity
          onPress={() => navigation.replace("Login")}
          className="rounded-xl"
          style={{
            width: "270%",
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
          className="mt-4"
        >
          <Text className="text-white text-lg">Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    filter: "grayscale(50%)",
    // filter: "drop-shadow(8px 8px 10px gray)",
    // opacity: 0.5,
  },
});
