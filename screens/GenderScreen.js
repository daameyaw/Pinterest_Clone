import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { setUserGender } from "../reducers/appReducer";

const GenderScreen = () => {
  const [selectedGender, setSelectedGender] = useState("");
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    dispatch(setUserGender(gender));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Select Gender" />
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === "Male" && styles.selectedButton,
          ]}
          onPress={() => handleGenderSelect("Male")}
        >
          <Text
            style={[
              styles.text,
              selectedGender === "Male" && styles.selectedText,
            ]}
          >
            Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === "Female" && styles.selectedButton,
          ]}
          onPress={() => handleGenderSelect("Female")}
        >
          <Text
            style={[
              styles.text,
              selectedGender === "Female" && styles.selectedText,
            ]}
          >
            Female
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === "Other" && styles.selectedButton,
          ]}
          onPress={() => handleGenderSelect("Other")}
        >
          <Text
            style={[
              styles.text,
              selectedGender === "Other" && styles.selectedText,
            ]}
          >
            Other
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  genderButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: "black",
  },
  selectedText: {
    color: "white",
  },
  text: {
    fontSize: 18,
  },
});

export default GenderScreen;
