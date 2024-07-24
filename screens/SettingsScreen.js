import { AntDesign } from "@expo/vector-icons";
import React, { Component } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SettingsGeneric from "../components/SettingsGeneric";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { getProfile, getUserName } from "../reducers/appReducer";
import { useSelector } from "react-redux";
const placeholderImage = require("../assets/empty2.jpg");

export default function SettingsScreen() {
  const profile = useSelector(getProfile);

  const userName = useSelector(getUserName);

  const navigation = useNavigation();

  function logOut() {}
  return (
    <SafeAreaView style={Platform.OS === "android" && { marginTop: 45 }}>
      <ScrollView>
        {/* Header */}
        <Header title="Your Account" />
        {/* Profile Section */}
        <TouchableOpacity
          onPress={() => navigation.navigate("ProfileScreen")}
          style={styles.profileSection}
        >
          <Image
            source={profile ? { uri: profile } : placeholderImage}
            style={styles.profileImage}
          />
          <View style={styles.profileText}>
            <Text style={styles.profileName}>{userName}</Text>
            <Text style={styles.profileAction}>View profile</Text>
          </View>
          <AntDesign className="p-4" name="right" size={19} color="black" />
        </TouchableOpacity>

        {/* Settings Section */}
        <Text style={styles.sectionTitle}>Settings</Text>

        <SettingsGeneric
          padding={15}
          text="Account management"
          screenName="Account"
        />
        <SettingsGeneric
          padding={15}
          text="Profile visibility"
          screenName="ProfileVisibility"
        />
        <SettingsGeneric
          padding={15}
          screenName="Social"
          text="Social permissions and activity"
        />
        <SettingsGeneric
          screenName="Privacy"
          padding={15}
          text="Privacy and data"
        />

        {/* Login Section */}
        <TouchableOpacity onPress={() => FIREBASE_AUTH.signOut()}>
          <Text style={styles.sectionTitle}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="p-[15px]"
          onPress={() => navigation.navigate("Login")}
          style={[styles.item]}
        >
          <Text style={styles.itemText}>Log out</Text>
          <View className="flex-row gap-2 items-center text-gray-200"></View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 21,
    fontWeight: "bold",
  },
  headerRight: {
    width: 24,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileText: {
    marginLeft: 15,
    flex: 1,
  },
  profileName: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 5,
  },
  profileAction: {
    color: "gray",
    fontSize: 16,
  },
  sectionTitle: {
    padding: 15,
    fontSize: 17,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    flex: 1,
    fontSize: 19,
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  navProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
