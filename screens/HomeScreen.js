import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import pins from "../assets/data/pins";
import MasonryList from "../components/MasonryList";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  function handleCreatePin() {
    navigation.navigate("CreatePins");
  }
  function handleProfile() {
    navigation.navigate("ProfileScreen");
  }

  return (
    <>
      <MasonryList pins={pins} />
      <SafeAreaView>
        <View className=" pt-6  flex-row px-10 justify-around">
          <View className="justify-center items-center">
            <FontAwesome name="home" color="black" size={25} />
          </View>
          <View className="justify-center items-center">
            <FontAwesome name="search" color="black" size={25} />
          </View>
          <TouchableOpacity
            onPress={handleCreatePin}
            className="justify-center items-center"
          >
            <FontAwesome name="plus" color="black" size={25} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleProfile}
            className="justify-center items-center"
          >
            <Feather name="user" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
