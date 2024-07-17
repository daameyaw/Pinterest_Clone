import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import NavigationTabs from "../components/NavigationTabs";
import { getSearch } from "../services/apiPins";
import { useQuery } from "@tanstack/react-query";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  // function handleSearch() {
  //   navigation.navigate("search");
  //   const {
  //     isLoading,
  //     data: Pins,
  //     error,
  //   } = useQuery({
  //     queryKey: ["Search"],
  //     queryFn: getSearch(searchQuery),
  //   });
  // }

  // const {
  //   isLoading,
  //   data: Pins,
  //   error,
  // } = useQuery({
  //   queryKey: ["Search"],
  //   queryFn: getSearch(searchQuery),
  // });

  // console.log(Pins?.length);

  // Function to handle search input change

  // Render each dreamboard item in the FlatList
  // const renderDreamboardItem = ({ item }) => (
  //   <View style={styles.dreamboardItem}>
  //     <Text>{item.name}</Text>
  //   </View>
  // );

  function navigateToSearchedScreen(query) {
    console.log(query);
    navigation.navigate("SearchResultScreen", { query: query });
  }

  // if (isLoading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#000" />
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <Text>{error}</Text>
  //     </View>
  //   );
  // }

  return (
    <SafeAreaView style={styles.container}>
      <>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.searchcontainer}
          onPress={() => navigation.navigate("search")}
        >
          <View style={styles.search}>
            <View>
              <AntDesign name="search1" size={24} color="gray" />
            </View>
            <Text style={styles.searchText}>Search</Text>
          </View>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollView}>
          {/* Ideas for you Section */}
          <Text style={styles.sectionTitle}>Ideas for you</Text>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigateToSearchedScreen("Site_Design")}
              style={styles.card}
            >
              <ImageBackground
                source={require("../assets/mainImages/siteDesign.jpg")}
                style={styles.cardImage}
              >
                <Text style={styles.cardText}>Site design</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigateToSearchedScreen("Cute_Icons")}
              style={styles.card}
            >
              <ImageBackground
                source={require("../assets/mainImages/cuteIcons.jpg")}
                style={styles.cardImage}
              >
                <Text style={styles.cardText}>Cute Animals</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          {/* Popular on Pinterest Section */}
          <Text style={styles.sectionTitle}>Popular on DreamBoard</Text>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigateToSearchedScreen("Wallpapers")}
              style={styles.card}
            >
              <ImageBackground
                source={require("../assets/mainImages/wallpapers.jpg")}
                style={styles.cardImage}
              >
                <Text style={styles.cardText}>Wallpapers</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigateToSearchedScreen("Fashion")}
              style={styles.card}
            >
              <ImageBackground
                source={require("../assets/mainImages/fashion.jpg")}
                style={styles.cardImage}
              >
                <Text style={styles.cardText}>Fashion</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigateToSearchedScreen("Games")}
              style={styles.card}
            >
              <ImageBackground
                source={require("../assets/mainImages/games.jpg")}
                style={styles.cardImage}
              >
                <Text style={styles.cardText}>Games</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigateToSearchedScreen("Flyer_Design")}
              style={styles.card}
            >
              <ImageBackground
                source={require("../assets/mainImages/flyerDesign.jpg")}
                style={styles.cardImage}
              >
                <Text style={styles.cardText}>Flyer Design</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigateToSearchedScreen("House_Exterior")}
              style={styles.card}
            >
              <ImageBackground
                source={require("../assets/mainImages/houseExterior.jpg")}
                style={styles.cardImage}
              >
                <Text style={styles.cardText}>House Exterior</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigateToSearchedScreen("Photography_Camera")}
              style={styles.card}
            >
              <ImageBackground
                source={require("../assets/mainImages/photo.jpg")}
                style={styles.cardImage}
              >
                <Text style={styles.cardText}>Photography Camera</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <NavigationTabs />
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchContainer: {
    // padding: 10,
    // backgroundColor: "#F5F5F5",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 25,
    margin: 10,
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 5,
    fontSize: 16,
    color: "grey",
    flex: 1,
    color: "gray",
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
  searchInput: {},
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
  searchInput: {
    flex: 1,
    color: "#fff",
    marginLeft: 10,
    marginRight: 10,
  },
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
  searchcontainer: {
    backgroundColor: "white",
    marginTop: 8,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    // borderWidth: 1,
    // borderColor: "#ddd",
    borderRadius: 15,
    // backgroundColor: "#f1f2f6",
  },
  searchText: {
    marginLeft: 14,
    color: "#908E9B",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SearchScreen;
