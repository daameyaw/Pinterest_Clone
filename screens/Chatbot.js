import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { isSpeakingAsync, speak, stop } from "expo-speech";
import ChatBubble from "../components/ChatBubble";
import Header from "../components/Header";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { getProfile } from "../reducers/appReducer";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const placeholderImage = require("../assets/empty2.jpg");

export default function Chatbot() {
  const profile = useSelector(getProfile);

  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  // style={{ paddingTop: insets.top }

  const API_KEY = "AIzaSyAKO5xm26DgKh0N_r74_12T4qhjB0VVDX8";

  const handleUserInput = async () => {
    //Add user input
    let updatedChat = [
      ...chat,
      {
        role: "user",
        parts: [{ text: userInput }],
      },
    ];

    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: updatedChat,
        }
      );

      const modelResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (modelResponse) {
        //Add model response
        const updatedChatWithModel = [
          ...updatedChat,
          {
            role: "model",
            parts: [{ text: modelResponse }],
          },
        ];
        setChat(updatedChatWithModel);
        setUserInput("");
      }
    } catch (error) {
      console.error("Error calling Gemini Pro API:", error);
      console.error("Error response:", error.response);
      setError("An error ocurred. Please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = async (text) => {
    if (isSpeaking) {
      stop();
      setIsSpeaking(false);
    } else {
      if (!(await isSpeakingAsync())) {
        speak(text);
        setIsSpeaking(true);
      }
    }
  };

  const renderChatItem = ({ item }) => (
    <ChatBubble
      role={item.role}
      text={item.parts[0].text}
      onSpeech={() => handleSpeech(item.parts[0].text)}
    />
  );

  return (
    <>
      <ImageBackground
        className="flex-1"
        style={styles.cardImage}
        source={require("../assets/ai4.jpg")}
        resizeMode="contain"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
          //   keyboardVerticalOffset={Platform.select({ ios: 60, android: 80 })}
        >
          <View style={[styles.container, { paddingTop: insets.top }]}>
            <View className="bg-white pb-3 border-b-[1px]  border-gray-200">
              <View className=" flex-row   items-center p-6 px-0 pb-2">
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  className="px-2"
                >
                  <Entypo name="chevron-left" size={38} color="black" />
                </TouchableOpacity>
                <View className="w-12 h-12  rounded-full">
                  <Image
                    className="w-full h-full rounded-full"
                    source={profile ? { uri: profile } : placeholderImage}
                  />
                </View>
                <Text className=" ml-5 text-xl font-bold">My AI</Text>
              </View>
            </View>
            <FlatList
              data={chat}
              renderItem={renderChatItem}
              keyExtractor={(itemm, index) => index.toString()}
              contentContainerStyle={styles.chatContainer}
            />
            {loading && (
              <ActivityIndicator style={styles.loading} color="#333" />
            )}

            <View
              className="bg-gray-100 p-7 pt-1 flex items-center gap-2"
              style={styles.inputContainer}
            >
              <TextInput
                className="bg-gray-300 text-lg text-left items-center px-3 pb-1 py-2"
                style={styles.input}
                placeholder="Chat"
                placeholderTextColor="#aaa"
                value={userInput}
                onChangeText={setUserInput}
              />
              <TouchableOpacity style={styles.button} onPress={handleUserInput}>
                <Ionicons name="send" size={24} color="#f5b352" />
              </TouchableOpacity>
            </View>
            {/* {error && <Text style={styles.error}>{error}</Text>} */}
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: "white",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    marginTop: 40,
    // textAlign: "center",
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignContent: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: "50",
    // marginRight: 10,
    // padding: 10,
    borderRadius: 25,
    color: "#333",
  },
  button: {
    padding: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  loading: {
    marginTop: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  cardImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    // alignItems: "center",
    filter: "grayscale(50%)",
    backgroundColor: "white",
    // filter: "drop-shadow(8px 8px 10px gray)",
    // opacity: 0.5,
  },
});
