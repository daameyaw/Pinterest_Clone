import React, { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

function SettingSwitch({ text, info = " ", padding, state = false }) {
  const [isEnabled, setIsEnabled] = useState(state);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View>
      <TouchableOpacity style={[styles.item]}>
        <Text style={styles.itemText}>{text}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#000000" }}
          thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ width: 50, height: 30 }}
        />
      </TouchableOpacity>
      <Text className="text-gray-500 text-lg w-[75%] ">{info}</Text>
    </View>
  );
}

export default SettingSwitch;

const styles = StyleSheet.create({
  itemText: {
    flex: 1,
    fontSize: 19,
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 5,
  },
});
