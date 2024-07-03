import { useState } from "react";
import {
  Button,
  Image,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function CreatePin() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  function onSubmit() {}

  return (
    <KeyboardAvoidingView style={styles.Kcontainer} behavior="position">
      <ScrollView>
        <View style={styles.container}>
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && (
            <>
              <Image source={{ uri: image }} style={styles.image} />
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Title.."
                style={styles.input}
              />
              <Button title="Submit" onPress={onSubmit} />
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  Kcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 5,
    width: "100%",
    borderRadius: 5,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    marginVertical: 10,
    borderRadius: 5,
  },
});
