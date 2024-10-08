import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import pins from "../assets/data/pins";
import MasonryList from "../components/MasonryList";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import NavigationTabs from "../components/NavigationTabs";
import { useQuery } from "@tanstack/react-query";
import { getPins } from "../services/apiPins";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();

  const {
    isLoading,
    data: Pins,
    error,
  } = useQuery({
    queryKey: ["Pins"],
    queryFn: getPins,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000);

    // Cleanup the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />

      <MasonryList pins={Pins || pins} />
      <NavigationTabs />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
