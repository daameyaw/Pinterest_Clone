import { useNavigation } from "@react-navigation/native";
import React, { Component, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("david@gmail.com");
  const [password, setPassword] = useState("lhbaf");

  function goBack() {
    navigation.goBack();
  }

  const handleLogin = () => {
    if (!email || !password) {
      console.log("Email and password are required.");
      return;
    }
    // Handle login logic here
    console.log("Logging in with:", { email, password });
    navigation.navigate("Pins", { password, email });
  };
  return (
    <SafeAreaView>
      <View className="flex-row items-center justify-center">
        <TouchableOpacity onPress={goBack} className="p-5">
          <Icon name="close" size={30} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold flex-1 -ml-10 text-center ">
          Log in
        </Text>
      </View>
      <View className="p-6">
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCompleteType="email"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          autoCompleteType="password"
        />
      </View>
      <View className="px-4 py-4">
        <TouchableOpacity
          disabled={!email || !password}
          onPress={handleLogin}
          style={{
            backgroundColor: !email || !password ? "gray" : "red",
            paddingVertical: 12,
            borderRadius: 5,
            alignItems: "center",
            paddingHorizontal: 64,
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: "red",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
