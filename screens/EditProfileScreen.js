import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import Header from "../components/Header";
import {
  getAbout,
  getId,
  getProfile,
  getUserName,
  setProfile,
  setProfileAbout,
  setProfileName,
  setUserName,
} from "../reducers/appReducer";
import { useDispatch, useSelector } from "react-redux";
import SettingSwitch from "../components/SettingSwitch";
import EditHeader from "../components/EditProfileHeader";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  SimpleLineIcons,
} from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";

const placeholderImage = require("../assets/empty2.jpg");

export default function EditProfileScreen() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const userName = useSelector(getUserName);
  const Userabout = useSelector(getAbout);
  const [isChanged, setIsChanged] = useState(false);
  const [image, setImage] = useState();
  const profile = useSelector(getProfile);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  console.log(userName);
  function closeEditing() {
    if (isChanged === false) return;

    dispatch(setProfile(image));

    Toast.show({
      type: "success",
      text1: `Edit Successful`,
    });
    navigation.goBack();
  }

  function controlModal() {
    setModalVisible(!modalVisible);
    setIsChanged(true);
  }

  const handleNameChange = (text) => {
    setName(text);
    setIsChanged(true);
    dispatch(setProfileName(text));
    // Add any additional logic here
  };

  const handleAboutChange = (text) => {
    setAbout(text);
    setIsChanged(true);
    dispatch(setProfileAbout(text));

    // Add any additional logic here
  };

  const [modalVisible, setModalVisible] = useState(false);

  const upLoadImage = async (mode) => {
    try {
      let result = {};
      if (mode === "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspectRatio: [1, 1],
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspectRatio: [1, 1],
          quality: 1,
        });
      }
      if (!result.canceled) {
        //save image
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      alert("Error uploading image");
      setModalVisible(false);
    }
  };

  const removeImage = async () => {
    try {
      saveImage(null);
    } catch ({ message }) {
      alert(message);
    }
  };

  const saveImage = async (image) => {
    try {
      setImage(image);
      setModalVisible(false);
    } catch (error) {
      throw error;
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, Platform.OS === "android" && { marginTop: 35 }]}
      keyboardVerticalOffset={Platform.select({ ios: 60, android: 80 })}
    >
      <View className="bg-white">
        <View style={styles.header}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={24}
            color="black"
          />
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity
            onPress={() => closeEditing()}
            className="ml-auto"
            style={{
              backgroundColor: !isChanged ? "#E0E0E0" : "black",
              padding: 15,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: !isChanged ? "black" : "white",
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.innerContainer}>
          <Text style={styles.infoText}>
            Keep your personal details private. Information you add here is
            visible to anyone who can view your profile
          </Text>
          <View className="flex-col justify-center gap-4" style={styles.header}>
            {/* <View style={styles.icons}></View> */}
            <View className=" ">
              {/* condition1 ? value1 : condition2 ? value2 : value3
               */}
              <Image
                source={
                  image
                    ? { uri: image }
                    : profile
                    ? { uri: profile }
                    : placeholderImage
                }
                style={styles.image}
              />
            </View>
          </View>
          <TouchableOpacity
            className="w-[110px] items-center mx-auto justify-center"
            onPress={() => controlModal()}
            style={styles.editButton}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            className="placeholder:font-bold text-black"
            style={[styles.textInput, styles.textXL]}
            value={name}
            onChangeText={handleNameChange}
            defaultValue={userName}
            // placeholder={userName}
          />
          <Text style={styles.inputLabel}>About</Text>
          <TextInput
            style={[styles.textInput, styles.textXL]}
            value={about}
            onChangeText={handleAboutChange}
            placeholder="Tell us about your self"
            defaultValue={Userabout}
          />
          <SettingSwitch
            text="Show all Pins"
            // info="When your profile is private, only the people you approve can your profile, Pins,
            //   board, followers and following lists "
          />
        </View>
        {/* modal */}
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View className="flex-row gap-8 mb-7 items-center justify-center">
                  <TouchableOpacity onPress={() => upLoadImage()}>
                    <Entypo name="camera" size={35} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => upLoadImage("gallery")}>
                    <SimpleLineIcons name="picture" size={35} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeImage()}>
                    <FontAwesome name="trash-o" size={35} color="black" />
                  </TouchableOpacity>
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        {/* //MODAL END */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  innerContainer: {
    padding: 16,
  },
  textXL: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textInput: {
    height: 40,
    borderColor: "transparent",
    borderWidth: 0,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: "#E0E0E0",
    padding: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 150,
    aspectRatio: 1,
    borderRadius: 200,
    marginVertical: 10,
    resizeMode: "contain",
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 5,
  },
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
  headerRight: {
    width: 24,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    paddingHorizontal: 55,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
