import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function ChatBubble({ role, text, onSpeech }) {
  return (
    <View
      style={[
        styles.chatItem,
        role === "user" ? styles.userChatItem : styles.modelChatItem,
      ]}
    >
      <Text style={styles.chatText}>{text}</Text>
      {role === "model" && (
        <TouchableOpacity onPress={onSpeech} style={styles.speakerIcon}>
          <Feather name="volume-2" size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chatItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
    position: "relative",
  },
  userChatItem: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
  },
  modelChatItem: {
    alignSelf: "flex-start",
    backgroundColor: "#000",
  },
  chatText: {
    fontSize: 16,
    color: "#fff",
  },
  speakerIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
});
