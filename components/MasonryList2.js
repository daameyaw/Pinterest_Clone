import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Pin from "./Pin";
import pins from "../assets/data/pins";
import Pin2 from "./Pin2";

const MasonryList2 = ({ pins, ind }) => {
  return (
    <ScrollView contentContainerStyle={{ backgroundColor: "white" }}>
      <View
        style={[styles.container, ind ? { marginTop: 1 } : { marginTop: 29 }]}
      >
        {/* FIRST COLUMN */}
        <View style={{ flex: 1 }}>
          {pins
            .filter((item, index) => index % 2 === 0)
            .map((pin) => (
              <Pin2 pin={pin} key={pin.id} />
            ))}
        </View>
        {/* SECOND COLUMN */}
        <View style={{ flex: 1 }}>
          {pins
            .filter((item, index) => index % 2 === 1)
            .map((pin) => (
              <Pin2 pin={pin} key={pin.id} />
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default MasonryList2;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: "white",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
