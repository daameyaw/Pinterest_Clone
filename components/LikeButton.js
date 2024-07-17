import React, { Component, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

function LikeButton({ size, absolute }) {
  const [liked, setLiked] = useState(false);

  function onLike() {
    setLiked(!liked);
    if (!liked) {
      Toast.show({
        type: "success",
        text1: `Liked`,
      });
    }

    // onLike(); // simulate like actionP
  }

  return (
    <>
      {liked ? (
        <Pressable
          className="justify-center items-center ml-2 text-center -mb-2"
          style={absolute && [styles.heartBtn]}
          onPress={onLike}
        >
          <AntDesign name="heart" size={size} color="#f5b352" />
        </Pressable>
      ) : (
        <Pressable
          className="justify-center items-center ml-2 text-center -mb-2"
          style={absolute && styles.heartBtn}
          onPress={onLike}
        >
          <AntDesign name="hearto" size={size} color="black" />
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  heartBtn: {
    backgroundColor: "#D3CFD4",
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 5,
    borderRadius: 50,
  },
});

export default LikeButton;
