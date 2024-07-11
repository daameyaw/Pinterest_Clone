import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function SettingsGeneric({ text, screenName, padding }) {
  const navigation = useNavigation();

  function goToScreen(screenName) {
    navigation.navigate(screenName);
  }
  return (
    <TouchableOpacity
      onPress={() => goToScreen(screenName)}
      style={[styles.item, padding && { paddingHorizontal: padding }]}
    >
      <Text style={styles.itemText}>{text}</Text>
      <AntDesign className="p-4" name="right" size={19} color="black" />
    </TouchableOpacity>
  );
}

export default SettingsGeneric;

const styles = StyleSheet.create({
  itemText: {
    flex: 1,
    fontSize: 19,
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
});
