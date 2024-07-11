import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import SettingsGeneric from "../components/SettingsGeneric";
import SettingSwitch from "../components/SettingSwitch";

export default function AccountScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Header title="Account Management" />

      <View className="p-4">
        <Text className="text-lg text-gray-700 font-semibold">
          Make changes to your personal information or account type
        </Text>

        <Text className="font-semibold py-4" style={styles.sectionTitle}>
          Settings
        </Text>

        <SettingsGeneric
          text="Personal Information"
          screenName="PersonalInfo"
        />
        <SettingsGeneric text="Email Address" screenName="Email" />
        <SettingsGeneric text="Password" screenName="PasswordScreen" />

        <SettingSwitch
          text="App sounds"
          info="Turn on for sounds from the DreamBoard app"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 17,
  },
});
