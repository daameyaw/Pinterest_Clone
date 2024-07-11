import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EditHeader({ title }) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <AntDesign
        onPress={() => navigation.goBack()}
        name="arrowleft"
        size={24}
        color="black"
      />
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity
        className="ml-auto"
        style={{
          backgroundColor: "#E0E0E0",
          padding: 15,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
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
});
