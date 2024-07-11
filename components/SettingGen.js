import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function SettingGen({ text, info, screenName }) {
  const navigation = useNavigation();

  function goToScreen(screenName) {
    navigation.navigate(screenName);
  }

  return (
    <TouchableOpacity
      onPress={() => goToScreen(screenName)}
      style={styles.item}
    >
      <Text style={styles.itemText}>{text}</Text>
      <View className="flex-row gap-2 items-center text-gray-200">
        <Text className="text-gray-500">{info}</Text>

        <AntDesign className="p-4" name="right" size={19} color="black" />
      </View>
    </TouchableOpacity>
  );
}

export default SettingGen;

const styles = StyleSheet.create({
  itemText: {
    flex: 1,
    fontSize: 19,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
});
