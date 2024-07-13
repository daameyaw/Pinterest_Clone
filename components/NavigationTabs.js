import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native";

export default function NavigationTabs() {
  const navigation = useNavigation();
  function handleCreatePin() {
    navigation.navigate("CreatePins");
  }
  function handleProfile() {
    navigation.navigate("ProfileScreen");
  }

  function handleSearch() {
    navigation.navigate("SearchScreen");
  }
  function handleHome() {
    console.log("Home");
    navigation.navigate("Pins");
  }
  function handleChat() {
    navigation.navigate("ChatAI");
  }

  return (
    <SafeAreaView>
      <View
        style={Platform.OS === "android" && { paddingBottom: 25 }}
        className=" pt-6   flex-row px-10 justify-around"
      >
        <TouchableOpacity
          onPress={handleHome}
          className="justify-center items-center"
        >
          <FontAwesome name="home" color="black" size={25} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSearch}
          className="justify-center items-center"
        >
          <FontAwesome name="search" color="black" size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCreatePin}
          className="justify-center items-center"
        >
          <FontAwesome name="plus" color="black" size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleChat}
          className="justify-center items-center"
        >
          <Ionicons name="sparkles-sharp" size={25} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleProfile}
          className="justify-center items-center"
        >
          <Feather name="user" size={25} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
//eslint-disable-next-line

const styles = StyleSheet.create({
  nav: {
    paddingBottom: Platform.OS === "android" && 10,
  },
});
