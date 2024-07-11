import React from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";

export default function EmailScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="bg-white ">
        <Header />
        <View className="p-4">
          <Text className="text-md text-lg mb-2">Email Address</Text>
          <TextInput
            defaultValue="davidameyaw@gmail.com"
            style={{
              backgroundColor: "white",
              fontSize: 20,
              fontWeight: "bold",
            }}
          />
          <View className="text-center mt-3">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="justify-center bg-red-600"
              style={{
                width: "30%",
                padding: 15,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                className="text-center"
                style={{ fontSize: 16, fontWeight: "bold" }}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
