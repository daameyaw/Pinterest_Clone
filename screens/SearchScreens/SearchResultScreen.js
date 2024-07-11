import { useRoute } from "@react-navigation/native";
import React, { Component } from "react";
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

export default function SearchResultScreen() {
  const route = useRoute();
  const query = route.params?.query;

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
