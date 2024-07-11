import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import Header from "../components/Header";
import SettingSwitch from "../components/SettingSwitch";

export default function ProfileVisibility() {
  return (
    <SafeAreaView>
      <Header title="Profile visibility" />
      <View className="p-4">
        <Text className="text-lg text-gray-700 font-semibold">
          Manage how your profile can be viewed on and off DreamBoard
        </Text>
        <SettingSwitch
          text="Private profile"
          info="When your profile is private, only the people you approve can your profile, Pins, 
              board, followers and following lists "
        />
        <SettingSwitch
          text="Search Privacy"
          info="Hide your profile and boards from search engines(e.g Google)"
        />
      </View>
    </SafeAreaView>
  );
}
