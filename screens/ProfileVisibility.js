import React from "react";
import { Platform, SafeAreaView, Text, View } from "react-native";
import Header from "../components/Header";
import SettingSwitch from "../components/SettingSwitch";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileVisibility() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ paddingTop: insets.top }}>
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
