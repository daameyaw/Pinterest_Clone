import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import MasonryList from "../components/MasonryList";
import pins from "../assets/data/pins";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
//eslint-disable-next-line
import NavigationTabs from "../components/NavigationTabs";
import {
  getProfile,
  getUserFollowers,
  getUserFollowing,
  getUserName,
} from "../reducers/appReducer";
import { useSelector } from "react-redux";

const placeholderImage = require("../assets/empty2.jpg");

export default function ProfileScreen() {
  const userName = useSelector(getUserName);

  const followers = useSelector(getUserFollowers);

  const following = useSelector(getUserFollowing);

  const profile = useSelector(getProfile);
  console.log(profile);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  function goBack() {
    navigation.goBack();
  }

  function goToSettings() {
    navigation.navigate("SettingsScreen");
  }

  return (
    <SafeAreaView style={styles.container}>
      <>
        <ScrollView>
          <StatusBar style="dark" />
          <View style={styles.header}>
            <View style={styles.icons}></View>
            <Image
              source={profile ? { uri: profile } : placeholderImage}
              style={styles.image}
            />
            <Text style={styles.title}>{userName}</Text>
            <Text style={styles.subtitle}>
              {" "}
              {followers} Followers | {following} Following
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
              style={{
                backgroundColor: "#E0E0E0",
                padding: 15,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>

          <MasonryList pins={pins} />
          <Pressable
            onPress={goBack}
            style={[styles.backBtn, { top: 16, padding: 5 }]}
          >
            <Ionicons name={"chevron-back"} size={35} color={"black"} />
          </Pressable>
          <Pressable
            onPress={goToSettings}
            style={[styles.settings, { top: 16, padding: 5 }]}
          >
            <Feather name="settings" size={24} color="black" />
          </Pressable>
        </ScrollView>
      </>
      {/* <NavigationTabs /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
  backBtn: { position: "absolute", left: 10 },
  settings: { position: "absolute", right: 13 },
  subtitle: {
    color: "#181818",
    fontWeight: "600",
    margin: 10,
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  image: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 200,
    marginVertical: 10,
  },
  icons: {
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 10,
    marginBottom: 30,
  },
  icon: {
    padding: 10,
  },
  platform: {},
});
