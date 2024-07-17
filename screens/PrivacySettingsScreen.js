import React from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
import SettingSwitch from "../components/SettingSwitch";
import Toast from "react-native-toast-message";

export default function PrivacySettingsScreen() {
  function clearCache() {
    Toast.show({
      type: "success",
      text1: "Cache cleared",
    });
  }
  return (
    <SafeAreaView style={Platform.OS === "android" && { marginTop: 45 }}>
      <Header title="Privacy and data" />
      <ScrollView>
        <View className="p-4">
          <Text className="text-lg text-gray-700 font-semibold">
            Manage how your profile can be viewed on and off DreamBoard
          </Text>

          <Text style={styles.sectionTitle}>Ads personalization</Text>

          <SettingSwitch
            state={true}
            text="Use info from sites you visit"
            info="Allow DreamBoard to use data from sites you visit to improve ads on DreamBoard"
          />
          <SettingSwitch
            state={true}
            text="Use of partner info"
            info="Allow DreamBoard to use information from our partners to improve ads on DreamBoard"
          />
          <SettingSwitch
            state={true}
            text="Ads about DreamBoard"
            info="Allow DreamBoard to use your activity to improve the ads about DreamBoard
          you're shown on other sites or apps
                  "
          />
          <SettingSwitch
            state={true}
            text="Activity for ads reporting"
            info="Allow DreamBoard to share your activity for ads performance reporting"
          />
          <SettingSwitch
            state={true}
            text="Sharing info with partners"
            info="Allow DreamBoard to share your information and DreamBoard activity with partners to improve the third-party ads"
          />
        </View>

        <Text className="p-4 " style={styles.sectionTitle}>
          Cache
        </Text>

        <TouchableOpacity onPress={clearCache} className="p-4 mb-28">
          <Text style={styles.itemText}>Clear app cache</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    paddingVertical: 15,
    paddingBottom: 5,
    fontSize: 16,
  },
  itemText: {
    flex: 1,
    fontSize: 19,
    fontWeight: "bold",
  },
});
