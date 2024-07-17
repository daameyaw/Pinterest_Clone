import { useRoute } from "@react-navigation/native";
import React, { Component, useEffect, useState } from "react";
import SiteDesignScreen from "./SiteDesignScreen";
import pins from "../../assets/data/pins";
import siteDesignPins from "../../assets/data/siteDesignPins";
import cuteIconsPins from "../../assets/data/cuteIconsPins";
import CameraPins from "../../assets/data/CameraPins";
import FashionPins from "../../assets/data/Fashion.Pins";
import FlyerDesignPins from "../../assets/data/FlyerDesignPins";
import WallpaperPins from "../../assets/data/WallpaperPins";
import GamesPins from "../../assets/data/GamesPins";
import HousePins from "../../assets/data/HousePins";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function SearchResultScreen() {
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const query = route.params?.query;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000);

    // Cleanup the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // const name = `${query.replaceAll("_", " ")}`;

  if (query === "Site_Design") {
    return <SiteDesignScreen name="Site Design" pins={siteDesignPins} />;
  }
  if (query === "Cute_Icons") {
    return <SiteDesignScreen name="Cute Icons" pins={cuteIconsPins} />;
  }
  if (query === "Wallpapers") {
    return <SiteDesignScreen name="Wallpapers" pins={WallpaperPins} />;
  }
  if (query === "Fashion") {
    return <SiteDesignScreen name="Fashion" pins={FashionPins} />;
  }
  if (query === "Games") {
    return <SiteDesignScreen name="Games" pins={GamesPins} />;
  }
  if (query === "Flyer_Design") {
    return <SiteDesignScreen name="Flyer Design" pins={FlyerDesignPins} />;
  }
  if (query === "House_Exterior") {
    return <SiteDesignScreen name="House Exterior" pins={HousePins} />;
  }
  if (query === "Photography_Camera") {
    return <SiteDesignScreen name="Photography Camera" pins={CameraPins} />;
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
