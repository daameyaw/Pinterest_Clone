import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import MasonryList from "../components/MasonryList";
import LikeButton from "../components/LikeButton";
import GamesPins from "../assets/data/GamesPins";
import { useDispatch } from "react-redux";
import { addFollow, unfollow } from "../reducers/appReducer";
import { getRandoms } from "../services/apiPins";
import { useQuery } from "@tanstack/react-query";

const PinScreen = () => {
  const {
    isLoading,
    data: Pins,
    error,
  } = useQuery({
    queryKey: ["Randoms"],
    queryFn: getRandoms,
  });

  console.log(Pins?.length);

  const [ratio, setratio] = useState(1);
  const [follow, setfollow] = useState();
  const [save, setsave] = useState();
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

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

  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <StatusBar style="light" />
      <ScrollView style={styles.root}>
        <View className="border-b-[1px] border-gray-100 ">
          <Image
            source={{ uri: pin.image }}
            style={[styles.image, { aspectRatio: ratio }]}
          />
          <Text style={styles.title}>{pin.title}</Text>

          <View className="flex-row justify-between px-1 gap-5 items-center mb-4">
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
              <View className="flex-row justify-between items-center   shadow-md">
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
          </View>
        </View>
        <View className="p-3">
          <View className="flex-row justify-between p-5">
            <Text className="font-bold text-lg"></Text>
            <View className="flex-row justify-center items-center gap-3 ">
              <Text className="text-lg font-bold">{pin.likes} </Text>
              <LikeButton size={24} />
              {/* <Pressable style={styles.heartBtn} onPress={onLike}>
                <AntDesign name="hearto" size={24} color="black" />
              </Pressable> */}
            </View>
          </View>
          {/* <View style={{ margin: 10, marginHorizontal: 20 }}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#E0E0E0",
                borderRadius: 20,
                width: "100%", // Decreased width to 90%
                padding: 13,
                paddingHorizontal: 15,
                marginBottom: 10,
                fontWeight: "bold", // Added bold font weight
                textAlign: "left",
              }}
              placeholder="Add a comment..."
            />
          </View> */}
        </View>

        <View className="border-t-[1px] border-gray-100 ">
          <Text className="font-bold text-xl text-left p-5 pb-2">
            More to explore
          </Text>
          <MasonryList ind={10} pins={Pins} />
        </View>
      </ScrollView>

      <Pressable
        onPress={goBack}
        style={[styles.backBtn, { top: insets.top + 20 }]}
      >
        <Ionicons name={"chevron-back"} size={35} color={"white"} />
      </Pressable>
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
});
