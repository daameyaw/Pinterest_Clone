import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getUserMail, setUserEmail } from "../reducers/appReducer";
import Toast from "react-native-toast-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EmailScreen() {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation();
  const address = useSelector(getUserMail);
  const [email, setEmail] = useState(address);

  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const dispatch = useDispatch();

  function updateEmail() {
    Toast.show({
      type: "success",
      text1: `Email Address Updated`,
    });

    dispatch(setUserEmail(email));

    navigation.goBack();
  }

  return (
    <SafeAreaView
      style={{ paddingTop: insets.top }}
      className="bg-white flex-1"
    >
      <View className="bg-white ">
        <Header />
        <View className="p-4">
          <Text className="text-md text-lg mb-2">Email Address</Text>
          <TextInput
            value={email}
            defaultValue={email}
            onChangeText={handleEmailChange}
            style={{
              backgroundColor: "white",
              fontSize: 24,
              fontWeight: "bold",
            }}
          />
          <View className="text-center mt-3">
            <TouchableOpacity
              onPress={updateEmail}
              className="justify-center bg-black"
              style={{
                width: "30%",
                padding: 15,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                className="text-center text-white"
                style={{ fontSize: 16, fontWeight: "bold" }}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
