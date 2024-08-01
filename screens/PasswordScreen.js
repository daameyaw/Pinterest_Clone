import { AntDesign, Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { getUserPassword } from "../reducers/appReducer";

export default function PasswordScreen() {
  const userPassword = useSelector(getUserPassword);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [isCurrentWrong, setCurrentWrong] = useState(false);
  const [isNewPasswordWrong, setNewPasswordWrong] = useState(false);
  const [isConfirmPasswordWrong, setConfirmPasswordWrong] = useState(false);
  const insets = useSafeAreaInsets();

  const handlePasswordChange = (text) => {
    if (password !== userPassword) {
      setCurrentWrong(true);
    }
    setPassword(text);
  };

  const handleNewPasswordChange = (text) => {
    setNewPassword(text);
  };

  function handleConfirmPassword(text) {
    setConfirmPassword(text);
    if (newPassword !== confirmPassword) {
      setConfirmPasswordWrong(true);
    } else {
      setIsChanged(true);
    }
  }

  return (
    <SafeAreaView
      className="bg-white flex-1"
      style={{ paddingTop: insets.top }}
    >
      <View className="bg-white">
        <View style={styles.header}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={24}
            color="black"
          />
          <Text style={styles.headerTitle}>Change password</Text>
          <TouchableOpacity
            disabled={!isChanged}
            className="ml-auto"
            style={{
              backgroundColor: isChanged ? "black" : "#E0E0E0",
              padding: 15,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={[{ color: "white", fontSize: 16, fontWeight: "bold" }]}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>
        <View className="p-4">
          <View className="mb-10">
            <Text className="text-md font-bold text-[16px] mb-2">
              Current password
              {isCurrentWrong && (
                <Text className="text-sm pl-2 text-red-500">
                  (Current password wrong)
                </Text>
              )}
            </Text>
            <View className="flex-row justify-between items-center">
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={handlePasswordChange}
                style={{
                  backgroundColor: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              />
              <View>
                <Entypo name="eye" size={24} color="black" />
              </View>
            </View>
          </View>
          <View className="mb-12">
            <Text className="text-md font-bold text-[16px] mb-2">
              New password
            </Text>
            <View className="flex-row justify-between items-center">
              <TextInput
                placeholder="Add"
                value={newPassword}
                onChangeText={handleNewPasswordChange}
                style={{
                  backgroundColor: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              />
              <View>
                <Entypo name="eye" size={24} color="black" />
              </View>
            </View>
          </View>
          <View className="mb-4">
            <Text className="text-md font-bold text-[16px] mb-2">
              Confirm new password
              {isConfirmPasswordWrong && (
                <Text className="text-sm ml-2 text-red-500">
                  (Not matching with the new password)
                </Text>
              )}
            </Text>
            <View className="flex-row justify-between items-center">
              <TextInput
                placeholder="Add"
                value={confirmPassword}
                onChangeText={handleConfirmPassword}
                style={{
                  backgroundColor: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              />
              <View>
                <Entypo name="eye" size={24} color="black" />
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 21,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
});
