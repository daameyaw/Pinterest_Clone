import React, { Component, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import { AntDesign } from "@expo/vector-icons";

function LikeButton({ size, absolute }) {
  const [liked, setLiked] = useState(false);

  function onLike() {
    setLiked(!liked);
    // onLike(); // simulate like action
  }

  return (
    <>
      {liked ? (
        <Pressable
          className="justify-center items-center ml-2 text-center -mb-2"
          style={absolute && [styles.heartBtn]}
          onPress={onLike}
        >
          <AntDesign name="heart" size={size} color="red" />
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