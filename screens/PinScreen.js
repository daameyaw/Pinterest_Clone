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
      url: link,
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

const PinScreen = () => {
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

  const handleComments = () => {
    setIsOpen(true);
    bottomSheetRef.current?.expand(); // Expand the bottom sheet
  };

  const handleClose = () => {
    setIsOpen(false);
    bottomSheetRef.current?.close(); // Close the bottom sheet
    // Keyboard.dismiss(); // Dismiss the keyboard
  };

  function uploadComment(text) {
    setComment("");
    Toast.show({
      type: "success",
      text1: `✅`,
    });

    pin.comments.push(comment);
    setIsOpen(false);
    bottomSheetRef.current?.close(); // Close the bottom sheet
  }

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        textInputRef.current?.focus(); // Focus the TextInput after the bottom sheet expands
      }, 500); // Delay to ensure the sheet is fully expanded
    }
  }, [isOpen]);

  const followToast = () => {
    Toast.show({
      type: "success",
      text2: `Following ${pin.owner}`,
    });
  };

  if (!pin) {
    return <Text>Pin not found</Text>;
  }

  function onFollow() {
    setfollow(!follow);
    if (!follow) {
      dispatch(addFollow());

      Toast.show({
        type: "success",
        text1: `Following ${pin.owner}`,
      });
    }
    if (follow) {
      dispatch(unfollow());
      Toast.show({
        type: "success",
        text1: `Unfollowing ${pin.owner}`,
      });
    }
  }

  function onSave() {
    setsave(!save);
    if (!save) {
      Toast.show({
        type: "success",
        text1: `Saved`,
      });
    }
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

  //  /photos/:id/download

  // const downloadImage = async () => {
  //   try {
  //     const res = await RNFetchBlob.fetch(
  //       "GET",
  //       `https://api.unsplash.com/photos/${pin.id}/download`,

  //       {
  //         Authorization: client_id,
  //         // more headers  ..
  //       }
  //     );

  //     const status = res.info().status;

  //     if (status === 200) {
  //       // the conversion is done in native code
  //       const base64Str = res.base64();
  //       // the following conversions are done in js, it's SYNC
  //       const text = res.text();
  //       const json = res.json();
  //     } else {
  //       // handle other status codes
  //       console.log(`Error: Status code ${status}`);
  //     }
  //   } catch (error) {
  //     // error handling
  //     console.error("Error:", error);
  //   }
  // };

  //DOWNLOADING IMAGES
  // const [isdownloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    // setDownloading(true);
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) return;

      const uri = await downloadImage(pin.image);
      if (uri) {
        await saveToLibrary(uri);
        setImageUri(uri);
      }
    } catch {
      console.error("Error downloading image");
    } finally {
      // setDownloading(false);
    }
  };

  // const [comments, setComments] = useState(["Beautiful", "Nice❤️❤️"]);

  //BOTTOME SHEET

  return (
    <SafeAreaView style={{ backgroundColor: "black", paddingTop: insets.top }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // style={{ flex: 1 }}
      >
        <ScrollView style={styles.root}>
          <View className="border-b-[1px] border-gray-100 ">
            <Image
              source={{ uri: pin.image }}
              style={[styles.image, { aspectRatio: ratio }]}
            />
            <Text style={styles.title}>{pin.title}</Text>

            <View className="flex-row justify-between px-4 gap-5 items-center mb-4">
              <View className="flex-row gap-2 ml-4 justify-center items-center">
                <Image
                  source={{ uri: pin.ownerImage }}
                  style={{ borderRadius: 50, width: 50, height: 50 }}
                />
                <View className="">
                  <Text className="text-xl font-bold">{pin.owner}</Text>
                  <Text>{pin.followers} followers</Text>
                </View>
              </View>
              <View className="flex-row justify-center items-center gap-2">
                <TouchableOpacity
                  onPress={onFollow}
                  style={{
                    backgroundColor: "black",
                    padding: 15,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {follow ? "Following" : "Follow"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="py-3 px-0 flex-row justify-around items-center">
            <View>
              <TouchableOpacity onPress={handleDownload}>
                <Feather name="download" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View className="flex-row gap-2">
              <View>
                <TouchableOpacity
                  onPress={onSave}
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
                    {save ? "Saved" : "Save"}
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
          <View className="p-1">
            {pin.comments.length === 0 ? (
              <View className="flex-row justify-between py-5 px-3 items-center">
                <TouchableOpacity>
                  <Text className="font-bold text-[17px]">
                    What do you think?
                  </Text>
                </TouchableOpacity>
                <View className="flex-row justify-center items-center gap-3 ">
                  <Text className="text-lg font-bold">{pin.likes}K</Text>
                  <LikeButton size={24} />
                  {/* <Pressable style={styles.heartBtn} onPress={onLike}>
                <AntDesign name="hearto" size={24} color="black" />
              </Pressable> */}
                </View>
              </View>
            ) : (
              <View className="flex-row justify-between py-5 pb-2 px-3 items-center">
                <TouchableOpacity>
                  <Text className="font-bold text-[17px]">
                    {pin.comments.length} comments
                  </Text>
                </TouchableOpacity>
                <View className="flex-row justify-center items-center gap-3 ">
                  <Text className="text-lg font-bold">{pin.likes}K</Text>
                  <LikeButton size={24} />
                  {/* <Pressable style={styles.heartBtn} onPress={onLike}>
    <AntDesign name="hearto" size={24} color="black" />
  </Pressable> */}
                </View>
              </View>
            )}
            {/* Comments */}
            {pin.comments.length > 0 && (
              <View className="py-2 pb-0 px-2 flex-row items-center">
                <View className="w-12 h-12  rounded-full">
                  <Image
                    className="w-full h-full rounded-full"
                    source={profile ? { uri: profile } : placeholderImage}
                  />
                </View>
                <View>
                  <View className="px-3 ">
                    <View className="gap-2 justify-center">
                      <Text className="text-[16px]">
                        {pin.comments[0]}...
                        <Text
                          onPress={handleComments}
                          className="font-bold text-[15px]"
                        >
                          view all
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}

            <View className="pt-3" style={{ margin: 10, marginHorizontal: 20 }}>
              <TouchableOpacity>
                <TextInput
                  onFocus={handleComments}
                  style={{
                    borderWidth: 2,
                    borderColor: "#E0E0E0",
                    borderRadius: 20,
                    // width: "90%", // Decreased width to 90%
                    padding: 12,
                    paddingHorizontal: 15,
                    marginBottom: 10,
                    fontWeight: "bold", // Added bold font weight
                    textAlign: "left",
                  }}
                  placeholder="Add  the first comment"
                />
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
      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // Initially collapsed
        snapPoints={["50%", "90%"]} // Adjust as needed
        onClose={handleClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View className="flex-1">
              <View className="p-3  ">
                <View className="flex-row border-b-2 justify-between items-center px-1">
                  <View>
                    <Text className="font-bold text-[17px]">
                      {pin.comments.length} comments
                    </Text>
                  </View>
                  <View className="p-3">
                    <TouchableOpacity onPress={handleClose}>
                      <FontAwesome
                        name="arrow-circle-o-down"
                        size={27}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View className=" flex-1">
                {pin.comments.length > 0 ? (
                  pin.comments.map((comment) => (
                    <View className="p-4 ">
                      <View className="">
                        <View className="flex-row gap-3 items-center">
                          <View className="w-12 h-12  rounded-full">
                            <Image
                              className="w-full h-full rounded-full"
                              source={
                                profile ? { uri: profile } : placeholderImage
                              }
                            />
                          </View>
                          <View className="space-y-1">
                            <View>
                              <Text className="font-bold text-[15px]">
                                David
                              </Text>
                            </View>
                            <View>
                              <Text>{comment}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))
                ) : (
                  <View className="flex-1   items-center justify-center text-center">
                    <Text>
                      Share a feedback ask a question or give a high five
                    </Text>
                  </View>
                )}
              </View>

              <View className=" mx-4 mb-6 flex-row justify-between items-center bg-white border-2 rounded-full">
                <View>
                  <TextInput
                    value={comment}
                    onChangeText={setComment}
                    style={{
                      padding: 12,
                      paddingHorizontal: 15,
                      marginBottom: 10,
                      // Added bold font weight
                      textAlign: "left",
                      fontSize: 16,
                    }}
                    placeholder="Add a comment "
                  />
                </View>
                <View className="mr-4">
                  <TouchableOpacity onPress={uploadComment}>
                    <FontAwesome
                      name="arrow-circle-up"
                      size={30}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default PinScreen;

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
    margin: 10,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
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
