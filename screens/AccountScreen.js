import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import SettingsGeneric from "../components/SettingsGeneric";
import SettingSwitch from "../components/SettingSwitch";
import { getUserMail } from "../reducers/appReducer";
import { useSelector } from "react-redux";
import SettingGen from "../components/SettingGen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AccountScreen() {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation();
  const email = useSelector(getUserMail);

  return (
    <SafeAreaView style={{ paddingTop: insets.top }}>
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

        <SettingsGeneric text="Email Address" screenName="Email" info={email} />
        {/* <SettingsGeneric text="Password" screenName="PasswordScreen" /> */}

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
