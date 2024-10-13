import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import MasonryList from "../../components/MasonryList";
// import pins from "../../assets/data/pins";
import { AntDesign } from "@expo/vector-icons";
import { getPins, getSearch } from "../../services/apiPins";
import { useQuery } from "@tanstack/react-query";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SearchPinsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pins, setPins] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [focused, setFocused] = useState(true);

  const handleSearchInputChange = (query) => {
    setSearchQuery(query);
  };

  const fetchPins = useCallback(async (query) => {
    if (query.trim() === "") return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/collections?query=${query}&per_page=30&client_id=yLNUmzJFwd77yleiSU9sIj78fRAb7GyrAF2p1pCh80w`
      );
      const result = await response.json();
      const data = result.results;
      if (data) {
        const formattedData = data.map((photo) => {
          return {
            id: photo.id,
            likes: photo.cover_photo.likes,
            title: photo.title || "",
            owner: photo.user.username,
            ownerImage: photo.user.profile_image.small,
            image: photo.cover_photo.urls.regular,
            comments: [],
          };
        });
        setPins(formattedData);
      }
    } catch (error) {
      setError(`Failed to fetch pins: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPins(searchQuery);
  }, [fetchPins]);

  const handleSearch = () => {
    fetchPins(searchQuery);
    setFocused(false);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }
  // const insets = useSafeAreaInsets();

  return (
    <>
      <SafeAreaView
        // style={{ paddingTop: insets.top }}
        className="flex-1 bg-white"
      >
        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={24} color="black" />

          <TextInput
            autoFocus={focused}
            className=""
            onSubmitEditing={handleSearch}
            style={styles.searchInput}
            placeholder="Search DreamBoard"
            value={searchQuery}
            onChangeText={handleSearchInputChange}
          />
        </View>
        {pins.length === 0 ? (
          <View className="items-center justify-center  w-full h-full   ">
            <Image
              style={{ width: 250, height: 350 }}
              source={require("../../assets/search.jpg")}
            />
            <View className="items-center justify-center">
              <Text className="items-center text-lg font-extrabold">
                No pins found.
              </Text>
            </View>
          </View>
        ) : (
          <MasonryList pins={pins} />
        )}

        <MasonryList pins={pins} />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  searchContainer: {
    // padding: 10,
    // backgroundColor: "#F5F5F5",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 25,
    margin: 10,
  },
  searchcontainer: {
    // backgroundColor: "white",
    marginTop: 8,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 10,
    // backgroundColor: "black",
    borderRadius: 5,
    fontSize: 16,
    flex: 1,
    color: "#333",
    marginLeft: 10,
    marginRight: 10,
  },
  dreamboardItem: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {},
  timeText: {
    color: "#fff",
    fontSize: 16,
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 25,
    margin: 10,
  },
  // searchInput: {
  //   flex: 1,
  //   color: "#fff",
  //   marginLeft: 10,
  //   marginRight: 10,
  // },
  scrollView: {
    paddingHorizontal: 10,
  },
  sectionTitle: {
    color: "black",
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  card: {
    width: "48%",
    height: 94,
    borderRadius: 14,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    filter: "grayscale(50%)",
    filter: "brightness(0%)",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    filter: "grayscale(50%)",
    // filter: "drop-shadow(8px 8px 10px gray)",
    // opacity: 0.5,
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    // backgroundColor: "rgba(0,0,0,0.5)",
    // padding: 5,
    // borderRadius: 5,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#f1f2f6",
  },
  searchText: {
    marginLeft: 5,
    color: "gray",
    fontSize: 16,
    fontWeight: "400",
  },
});
