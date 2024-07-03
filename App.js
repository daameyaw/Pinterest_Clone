// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./Stacks/TabNavigator";
import StackNavigator from "./Stacks/StackNavigator";

function App() {
  return (
    <>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </>
  );
}

export default App;
