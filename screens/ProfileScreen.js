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
  getCreatedPins,
  getProfile,
  getUserFollowers,
  getUserFollowing,
  getUserName,
} from "../reducers/appReducer";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LikedPins from "./LikedPins";
import CreatedPins from "./CreatedPins";
import MasonryList2 from "../components/MasonryList2";

const placeholderImage = require("../assets/empty2.jpg");

export default function ProfileScreen() {
  const userName = useSelector(getUserName);

  const followers = useSelector(getUserFollowers);
  const createdPins = useSelector(getCreatedPins);
  const following = useSelector(getUserFollowing);
  const Stack = createNativeStackNavigator();

  const profile = useSelector(getProfile);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  function goBack() {
    navigation.goBack();
  }

  function goToSettings() {
    navigation.replace("SettingsScreen");
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <>
        <ScrollView style={Platform.OS === "android" && { marginTop: 5 }}>
          <StatusBar style="dark" />
          <View style={styles.header}>
            <View style={styles.icons}></View>
            <Image
              source={profile ? { uri: profile } : placeholderImage}
              style={styles.image}
            />
            <Text style={styles.title}>{userName}</Text>
            <Text style={styles.subtitle}>
              {followers} Followers | {following} Following
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
              style={{
                backgroundColor: "black",
                padding: 15,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity onPress={() => navigation.navigate("Liked")}>
            <Text>Liked</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Created")}>
            <Text>Created</Text>
          </TouchableOpacity>
 */}
          {/* <View>
            <Stack.Navigator>
              <Stack.Screen
                name="Liked"
                component={LikedPins}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Created"
                component={CreatedPins}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </View> */}
          <View className="text-center items-center  mt-7 pb-1  border-b-2 mx-auto ">
            <Text className="text-lg font-bold">Created by you</Text>
          </View>
          <View className="flex-1 ">
            <View className=" flex-1 ">
              {createdPins.length === 0 ? (
                <View className="items-center justify-center pt-[100px] w-full h-full  ">
                  <Image
                    style={{ width: 250, height: 250 }}
                    source={require("../assets/empty.png")}
                  />
                  {/* <View className="items-center justify-center">
                    <Text className="items-center text-lg font-extrabold">
                      No pins found.
                    </Text>
                  </View> */}
                </View>
              ) : (
                <MasonryList2 pins={createdPins} />
              )}
            </View>
          </View>

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
    flex: 1,
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
