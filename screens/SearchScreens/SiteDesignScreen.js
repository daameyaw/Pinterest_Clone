import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MasonryList from "../../components/MasonryList";
import NavigationTabs from "../../components/NavigationTabs";

export default function SiteDesignScreen({ name, pins }) {
  const navigation = useNavigation();
  return (
    <>
      <ScrollView contentContainerStyle={{ backgroundColor: "white" }}>
        <View className="bg-white my-8">
          <View className="  bg-white flex-row items-center gap-5 my-1 mr-5 ml-[0.5px]">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="ml-2"
            >
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1"
              activeOpacity={0.5}
              style={styles.searchcontainer}
              onPress={() => navigation.navigate("search")}
            >
              <View style={styles.search}>
                <View>
                  {/* <AntDesign name="search1" size={24} color="gray" /> */}
                </View>
                <Text style={styles.searchText}>Search</Text>
              </View>
            </TouchableOpacity>
          </View>

          <MasonryList pins={pins} />
        </View>
      </ScrollView>
      <NavigationTabs />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  searchBar: {
    height: 40,
    paddingHorizontal: 20,
  },
  filterContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  filter: {
    backgroundColor: "#f4f4f4",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
  },
  filterText: {
    color: "#333",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  iconContainer: {
    backgroundColor: "#ff9aa2",
    borderRadius: 10,
    width: "48%",
    padding: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  icon: {
    marginBottom: 10,
  },
  iconLabel: {
    color: "white",
    textAlign: "center",
  },
  searchcontainer: {
    backgroundColor: "white",
    // marginTop: 8,
    // marginBottom: 15,
    // marginLeft: 10,
    // marginRight: 10,
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
