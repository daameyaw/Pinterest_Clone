// RadioButton.js
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const RadioButton = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity
      className="py-4"
      onPress={onPress}
      style={styles.radioButtonContainer}
    >
      <Text
        className="flex-1 text-lg font-bold"
        style={styles.radioButtonLabel}
      >
        {label}
      </Text>
      <View
        style={[styles.radioButton, selected && styles.radioButtonSelected]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    backgroundColor: "#000",
  },
  radioButtonLabel: {
    marginLeft: 10,
  },
});

export default RadioButton;
