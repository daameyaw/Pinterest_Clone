import React from "react";
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import SettingSwitch from "../components/SettingSwitch";

export default function SocialScreen() {
  return (
    <SafeAreaView style={Platform.OS === "android" && { marginTop: 45 }}>
      <Header title="Social permissions and activity" />
      <View className="p-4">
        <Text className="text-lg text-gray-700 font-semibold">
          Manage how your profile can be viewed on and off DreamBoard
        </Text>

        <Text style={styles.sectionTitle}>Comments</Text>
        <SettingSwitch
          state={true}
          text="Allow comments on your Pins"
          info="Comments will be turned on by default for your new and existing Pins "
        />
        <SettingSwitch
          text="Filter comments on my Pins"
          info="Hide comments from everyone on Pins you created that contain specific words"
        />
        <SettingSwitch
          text="Filter comments on other's Pins"
          info="Hide comments from other's Pins that contain specific words"
        />

        <Text style={styles.sectionTitle}>Shopping recommendations</Text>
        <SettingSwitch
          text="Show similar products"
          info="People can shop for products similar to what's shown in this Pin usinng visual search"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    paddingVertical: 15,
    paddingBottom: 5,
    fontSize: 16,
  },
});
