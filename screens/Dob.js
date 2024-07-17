import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch } from "react-redux";
import { setUserBdate } from "../reducers/appReducer";
import Toast from "react-native-toast-message";
export default function Dob() {
  const insets = useSafeAreaInsets();
  const [date, setDate] = useState(new Date());

  const dispatch = useDispatch();
  const [mode, setMode] = useState("date");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  function updateDob() {
    const dateConvert = new Date(date);

    // Options for formatting the date
    const options = { day: "numeric", month: "short", year: "numeric" };

    // Format the date
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      dateConvert
    );
    console.log(formattedDate);

    Toast.show({
      type: "success",
      text1: `Date of Birth Updated`,
    });

    dispatch(setUserBdate(formattedDate));
  }
  return (
    <SafeAreaView style={{ paddingTop: insets.top }}>
      <Header title="Date of birth" />

      <View className="p-4">
        <Text className="text-black text-lg mb-5">
          To help keep DreamBoard safe, we now require your date of birth. We
          won't share this information without your permission.
        </Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
        <View className="items-center mt-5">
          <TouchableOpacity
            onPress={updateDob}
            style={{
              width: "70%",
              backgroundColor: "#E0E0E0",
              padding: 15,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
