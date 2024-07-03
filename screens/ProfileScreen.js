import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { Entypo, Feather } from "@expo/vector-icons";
import MasonryList from "../components/MasonryList";
import pins from "../assets/data/pins";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icons}>
          <Feather name="share" size={24} color="black" style={styles.icon} />
          <Entypo
            name="dots-three-horizontal"
            size={24}
            color="black"
            style={styles.icon}
          />
        </View>
        <Image
          source={{
            uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/0.jpeg",
          }}
          style={styles.image}
        />
        <Text style={styles.title}>Ameyaw David</Text>
        <Text style={styles.subtitle}> 123 Followers | 534 Following</Text>
      </View>

      <MasonryList pins={pins} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  subtitle: {
    color: "#181818",
    fontWeight: "600",
    margin: 10,
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  image: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 200,
    marginVertical: 10,
  },
  icons: {
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 10,
  },
  icon: {
    padding: 10,
  },
});
