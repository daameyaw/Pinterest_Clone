import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import RadioButton from "../components/RadioButton";

export default function GenderScreen() {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ["Male", "Female"];
  return (
    <SafeAreaView>
      <View>
        <Header title="Gender" />
        <View className="p-4">
          <TouchableOpacity>
            {options.map((option, index) => (
              <RadioButton
                key={index}
                label={option}
                selected={selectedOption === option}
                onPress={() => setSelectedOption(option)}
              />
            ))}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
