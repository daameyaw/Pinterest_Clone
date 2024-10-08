import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import LikeButton from "./LikeButton";

const Pin2 = ({ pin }) => {
  const [ratio, setratio] = useState(1);
  function onLike() {}
  const { id, image, title } = pin;

  const navigation = useNavigation();

  useEffect(() => {
    if (image) {
      Image.getSize(image, (width, height) => setratio(width / height));
    }
  }, [image]);

  function goToPinPage() {
    navigation.navigate("PinScreen2", { id, pin });
  }

  return (
    <Pressable onPress={goToPinPage} style={styles.pin}>
      <View>
        <Image
          source={{
            uri: image,
          }}
          style={[styles.image, { aspectRatio: ratio }]}
        />
        <LikeButton size={16} absolute={true} />
        {/* {liked ? (
          <Pressable style={styles.heartBtn} onPress={onLike}>
            <AntDesign name="heart" size={24} color="red" />
          </Pressable>
        ) : (
          <Pressable style={styles.heartBtn} onPress={onLike}>
            <AntDesign name="hearto" size={16} color="black" />
          </Pressable>
        )} */}
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </Pressable>
  );
};

export default Pin2;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    borderRadius: 10,
  },
  pin: {
    width: "100%",
    padding: 4,
  },
  title: {
    fontSize: 12,
    lineHeight: 22,
    fontWeight: "600",
    margin: 5,
    color: "#181818",
  },
});
