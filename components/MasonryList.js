import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Pin from "./Pin";
import pins from "../assets/data/pins";

const MasonryList = ({ pins }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* FIRST COLUMN */}
        <View style={{ flex: 1 }}>
          {pins
            .filter((item, index) => index % 2 === 0)
            .map((pin) => (
              <Pin pin={pin} key={pin.id} />
            ))}
        </View>
        {/* SECOND COLUMN */}
        <View style={{ flex: 1 }}>
          {pins
            .filter((item, index) => index % 2 === 1)
            .map((pin) => (
              <Pin pin={pin} key={pin.id} />
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default MasonryList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: "white",
    marginTop: 29,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
