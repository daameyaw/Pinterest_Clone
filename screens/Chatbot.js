import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { isSpeakingAsync, speak, stop } from "expo-speech";
import ChatBubble from "../components/ChatBubble";

export default function Chatbot() {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

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
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: updatedChat,
        }
      );
      console.log("Gemini Pro API Response:", response.data);

      const modelResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (modelResponse) {
        //Add model response
        const updatedChatWithModel = [
          updatedChat,
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.select({ ios: 60, android: 80 })}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Gemini Chatbot</Text>
        <FlatList
          data={chat}
          renderItem={renderChatItem}
          keyExtractor={(itemm, index) => index.toString()}
          contentContainerStyle={styles.chatContainer}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message"
            placeholderTextColor="#aaa"
            value={userInput}
            onChangeText={setUserInput}
          />
          <TouchableOpacity style={styles.button} onPress={handleUserInput}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
        {loading && <ActivityIndicator style={styles.loading} color="#333" />}
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    marginTop: 40,
    textAlign: "center",
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
    marginRight: 10,
    padding: 8,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 25,
    color: "#333",
    backgroundColor: "#fff",
  },
  button: {
    padding: 10,
    backgroundColor: "#007AFF",
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
});
