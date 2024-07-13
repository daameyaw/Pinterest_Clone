// import { Feather } from "@expo/vector-icons";
// import React from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// export default function ChatBubble({ role, text, onSpeech }) {
//   return (
//     <View
//       style={[
//         styles.chatItem,
//         role === "user" ? styles.userChatItem : styles.modelChatItem,
//       ]}
//     >
//       <Text style={styles.chatText}>{text}</Text>
//       {role === "model" && (
//         <TouchableOpacity onPress={onSpeech} style={styles.speakerIcon}>
//           <Feather name="volume-2" size={24} color="#fff" />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   chatItem: {
//     marginBottom: 10,
//     padding: 10,
//     borderRadius: 10,
//     maxWidth: "70%",
//     position: "relative",
//   },
//   userChatItem: {
//     alignSelf: "flex-end",
//     backgroundColor: "#007AFF",
//   },
//   modelChatItem: {
//     alignSelf: "flex-start",
//     backgroundColor: "#000",
//   },
//   chatText: {
//     fontSize: 16,
//     color: "#fff",
//   },
//   speakerIcon: {
//     position: "absolute",
//     bottom: 5,
//     right: 5,
//   },
// });

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "react-native-vector-icons";

const ChatBubble = ({ role, text, imageUrl, onSpeech }) => {
  return (
    <View>
      <View
        style={[
          styles.chatItem,
          role === "user" ? styles.userChatItem : styles.modelChatItem,
        ]}
      >
        <Text style={role === "user" ? styles.userName : styles.botName}>
          {role === "user" ? "Me" : "My AI"}
        </Text>
        {/* {imageUrl && role === "user" && (
        <Image source={{ uri: imageUrl }} style={styles.chatImage} />
      )} */}
        <Text style={styles.chatText}>{text}</Text>
        {role === "model" && (
          <View style={styles.speakerIcon}>
            <TouchableOpacity onPress={onSpeech}>
              <Ionicons name="volume-high-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
    maxWidth: "70%",
    position: "relative",
  },
  userChatItem: {
    marginRight: 5,
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C5",
    borderRightWidth: 3,
    borderColor: "#2ecc71",
  },
  userView: {
    marginRight: 5,
  },
  modelView: {
    marginLeft: 5,
  },
  modelChatItem: {
    marginLeft: 5,

    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderLeftWidth: 3,
    borderColor: "red",
  },
  chatText: {
    fontSize: 16,
    color: "#333",
  },
  speakerIcon: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  chatImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  userName: {
    color: "#2ecc71",
    fontSize: 13,
    marginBottom: 4,
  },
  botName: {
    color: "red",
    fontSize: 13,
    marginBottom: 4,
  },
});

export default ChatBubble;
