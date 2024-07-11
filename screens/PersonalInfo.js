import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import Header from "../components/Header";
import SettingGen from "../components/SettingGen";

export default function PersonalInfo() {
  return (
    <SafeAreaView>
      <Header title="Personal information" />
      <View className="p-4">
        <Text className="text-lg text-gray-400 font-semibold">
          Edit your basic personal info to improve recommendations. This
          information is private and won't appear publicly
        </Text>

        <SettingGen text="Date of Birth" info="5 Nov 2004" />
        <SettingGen text="Gender" screenName="Gender" info="Male" />
        <SettingGen text="Country/region" info="Ghana" />
        <SettingGen text="Language" info="English (US)" />
      </View>
    </SafeAreaView>
  );
}
