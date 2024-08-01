import { useState } from "react";
import {
  Button,
  Image,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import NavigationTabs from "../components/NavigationTabs";
import Header from "../components/Header";
import SettingsGeneric from "../components/SettingsGeneric";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, setPins } from "../reducers/appReducer";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

export default function CreatePin() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  const navigation = useNavigation();
  const profile = useSelector(getProfile);
  const dispatch = useDispatch();
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleTitleChange = (text) => {
    setTitle(text);
    setIsChanged(true);
    // Add any additional logic here
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
    setIsChanged(true);
    // Add any additional logic here
  };

  function onSubmit() {
    const newPin = {
      id: Math.floor(Math.random() * 1000000), // Change to a whole number
      title,
      description,
      image,
      ownerImage: profile ? profile : "",
      comments: [],
    };
    dispatch(setPins(newPin));

    Toast.show({
      type: "success",
      text1: `Pin created successfully`,
    });

    navigation.navigate("ProfileScreen");
  }

  return (
    <>
      <View className="mt-[50px]">
        <Header title="Create a Pin" />
      </View>
      <KeyboardAvoidingView
        style={styles.Kcontainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={Platform.select({ ios: 60, android: 80 })}
      >
        <ScrollView>
          <View style={styles.container}>
            <Button
              title="Pick an image from camera roll"
              onPress={pickImage}
            />
            {image && (
              <>
                <View className="justify-center items-center p-10">
                  <Image source={{ uri: image }} style={styles.image} />
                </View>
                <View className="p-4 mb-3">
                  <View>
                    <Text className="font-bold mb-3">Title</Text>
                    <TextInput
                      className="border-none  border-gray-700 mb-8   placeholder:text-xl   font-bold"
                      value={title}
                      onChangeText={handleTitleChange}
                      placeholder="Tell everyone what your Pin is about"
                      style={styles.input}
                    />
                  </View>
                  <View>
                    <Text className="font-bold mb-3">Description</Text>
                    <TextInput
                      className="border-none  border-gray-700 mb-8  placeholder:text-xl   font-bold"
                      value={description}
                      onChangeText={handleDescriptionChange}
                      placeholder="Add a description to your Pin"
                      style={styles.input}
                    />
                  </View>
                  <SettingsGeneric
                    // padding={15}
                    text="Advanced Settings"
                    screenName="AdvancedSettings"
                  />

                  <View className="items-center rounded-full text-white mt-3  ">
                    <TouchableOpacity
                      onPress={onSubmit}
                      style={{
                        width: "30%",
                        paddingVertical: 25,
                        // paddingHorizontal: 4,
                        backgroundColor: !isChanged ? "#E0E0E0" : "black",
                        borderRadius: 100,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        className=""
                        style={[
                          { fontSize: 16, fontWeight: "bold" },
                          !isChanged ? { color: "black" } : { color: "white" },
                        ]}
                      >
                        Create Pin
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <NavigationTabs />
    </>
  );
}

const styles = StyleSheet.create({
  Kcontainer: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // padding: 10,
  },

  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // padding: 10,
  },
  input: {
    width: "100%",
  },
  image: {
    width: "65%",
    aspectRatio: 1,
    marginVertical: 10,
    borderRadius: 15,
  },
});
