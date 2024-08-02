import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import MasonryList from "../components/MasonryList";
import LikeButton from "../components/LikeButton";
import GamesPins from "../assets/data/GamesPins";
import { useDispatch, useSelector } from "react-redux";
import { addFollow, getProfile, unfollow } from "../reducers/appReducer";
import { getRandoms } from "../services/apiPins";
import { useQuery } from "@tanstack/react-query";
// import RNFetchBlob from "rn-fetch-blob";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"; // import * as Permissions from "expo-permissions";

const requestPermissions = async () => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Permission Denied",
      "You need to grant media library permissions to use this feature."
    );
    return false;
  }
  return true;
};

const downloadImage = async (url) => {
  try {
    const { uri } = await FileSystem.downloadAsync(
      url,
      FileSystem.documentDirectory + "downloaded_image.jpg"
    );
    return uri;
  } catch (error) {
    console.error(error);
    Alert.alert("Download Failed", "Failed to download the image.");
    return null;
  }
};
const saveToLibrary = async (uri) => {
  try {
    const asset = await MediaLibrary.createAssetAsync(uri);
    await MediaLibrary.createAlbumAsync("Download", asset, false);
    Alert.alert("Success", "Image saved to media library!");
  } catch (error) {
    console.error(error);
    Alert.alert("Save Failed", "Failed to save the image to media library.");
  }
};
const onShare = async (link) => {
  try {
    const result = await Share.share({
      message: "Look at this... 👀",
      url: "https://www.pinterest.com/",
      title: "Share with your friends...😊",
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};
const placeholderImage = require("../assets/empty2.jpg");

const PinScreen2 = () => {
  const {
    isLoading,
    data: Pins,
    error,
  } = useQuery({
    queryKey: ["Randoms"],
    queryFn: getRandoms,
  });

  const [ratio, setratio] = useState(1);
  const [follow, setfollow] = useState();
  const [save, setsave] = useState();
  const [imageUri, setImageUri] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetRef = useRef(null);
  const textInputRef = useRef(null);
  const profile = useSelector(getProfile);
  const [comment, setComment] = useState("");

  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const client_id = "yLNUmzJFwd77yleiSU9sIj78fRAb7GyrAF2p1pCh80w";

  const dispatch = useDispatch();
  const pin = route.params?.pin;

  const pinId = route.params?.id;
  // const pin = pins.find((p) => p.id === pinId);

  useEffect(() => {
    if (pin?.image) {
      Image.getSize(pin.image, (width, height) => setratio(width / height));
    }
  }, [pin?.image]);

  function goBack() {
    navigation.goBack();
  }

  if (!pin) {
    return <Text>Pin not found</Text>;
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: "black", paddingTop: insets.top }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // style={{ flex: 1 }}
      >
        <ScrollView style={styles.root}>
          <View className=" border-gray-100 ">
            <Image
              source={{ uri: pin.image }}
              style={[styles.image, { aspectRatio: ratio }]}
            />
            <View className="p-3 gap-3">
              <View className="w-12 h-12  rounded-full">
                <Image
                  className="w-full h-full rounded-full"
                  source={profile ? { uri: profile } : placeholderImage}
                />
              </View>

              <Text style={styles.title}>{pin.title}</Text>
              <Text style={styles.description}>{pin.description}</Text>

              <View>
                <Text>{}</Text>
              </View>
            </View>
          </View>
          <View className="py-0 pb-2 px-0 flex-row justify-around items-center">
            <View className="flex-row gap-2">
              <View>
                <TouchableOpacity
                  className="bg-[#f5b352]"
                  style={{
                    padding: 15,
                    paddingHorizontal: 20,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    Saved
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={() => onShare(pin.link)}>
                <FontAwesome6 name="share" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="border-t-[1px] border-gray-100 ">
            <Text className="font-bold text-xl text-left p-5 pb-2">
              More to explore
            </Text>
            <MasonryList ind={10} pins={Pins} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Pressable
        onPress={goBack}
        style={[styles.backBtn, { top: insets.top + 20 }]}
      >
        <Ionicons name={"chevron-back"} size={35} color={"white"} />
      </Pressable>
    </SafeAreaView>
  );
};

export default PinScreen2;

const styles = StyleSheet.create({
  root: {
    height: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 35,
  },
  description: {
    fontSize: 20,
    fontWeight: "300",
    lineHeight: 35,
  },
  heartBtn: {
    color: "red",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  backBtn: { position: "absolute", left: 10 },
  Btn: { position: "absolute", top: 30 },
  rightBtn: { position: "absolute", right: 10 },
});
