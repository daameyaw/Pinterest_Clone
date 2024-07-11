import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
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

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [dreamboards, setDreamboards] = useState([]);

  // Mock data for dreamboards
  const mockDreamboards = [
    { id: 1, name: "DreamBoard 1" },
    { id: 2, name: "DreamBoard 2" },
    { id: 3, name: "DreamBoard 3" },
    // Add more dreamboards as needed
  ];

  // Filter dreamboards based on search query
  const filteredDreamboards = dreamboards.filter((dreamboard) =>
    dreamboard.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle search input change
  const handleSearchInputChange = (query) => {
    setSearchQuery(query);
  };

  // Render each dreamboard item in the FlatList
  const renderDreamboardItem = ({ item }) => (
    <View style={styles.dreamboardItem}>
      <Text>{item.name}</Text>
    </View>
  );

  function navigateToSearchedScreen(query) {
    console.log(query);
    navigation.navigate("SearchResultScreen", { query: query });
    setSearchQuery("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <>
        {/* <View style={styles.searchContainer}>
          <AntDesign name="search1" size={24} color="black" />

          <TextInput
            style={styles.searchInput}
            placeholder="Search DreamBoard"
            value={searchQuery}
            onChangeText={handleSearchInputChange}
          />
        </View> */}
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
                <Text style={styles.cardText}>Cute Icons</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          {/* Popular on Pinterest Section */}
          <Text style={styles.sectionTitle}>Popular on Pinterest</Text>
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
});

export default SearchScreen;
