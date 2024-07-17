import React from "react";
import { Platform, SafeAreaView, Text, View } from "react-native";
import Header from "../components/Header";
import SettingGen from "../components/SettingGen";
import { useSelector } from "react-redux";
import {
  getUserBDate,
  getUserCountry,
  getUserGender,
  getUserMail,
} from "../reducers/appReducer";

export default function PersonalInfo() {
  const bDate = useSelector(getUserBDate);
  const country = useSelector(getUserCountry);
  const gender = useSelector(getUserGender);
  return (
    <SafeAreaView style={Platform.OS === "android" && { marginTop: 35 }}>
      <Header title="Personal information" />
      <View className="p-4">
        <Text className="text-lg text-gray-400 font-semibold">
          Edit your basic personal info to improve recommendations. This
          information is private and won't appear publicly
        </Text>

        <SettingGen text="Date of Birth" screenName="Dob" info={bDate} />
        <SettingGen text="Gender" screenName="Gender" info={gender} />
        <SettingGen
          text="Country/region"
          screenName="Countries"
          info={country}
        />
        <SettingGen text="Language" info="English (US)" next={2} />
      </View>
    </SafeAreaView>
  );
}
