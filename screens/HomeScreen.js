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
import NavigationTabs from "../components/NavigationTabs";
export default function HomeScreen() {
  return (
    <>
      <MasonryList pins={pins} />
      <NavigationTabs />
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
