import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import SettingSwitch from "../components/SettingSwitch";

export default function AdvancedSettingsScreen() {
  return (
    <SafeAreaView>
      <View className="p-4">
        <Header title="Advanced settings" />
        <Text style={styles.sectionTitle}>Engagement settings</Text>

        <SettingSwitch
          state={true}
          text="Allow comments"
          //   info="Comments will be turned on by default for your new and existing Pins "
        />

        <Text style={styles.sectionTitle}>Shopping recommendations</Text>

        <SettingSwitch
          state={true}
          text="Show similar products"
          info="Comments will be turned on by default for your new and existing Pins "
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
