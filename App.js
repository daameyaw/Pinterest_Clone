// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./Stacks/TabNavigator";
import StackNavigator from "./Stacks/StackNavigator";
import { Provider } from "react-redux";
import { store } from "./store";
import Toast from "react-native-toast-message";

function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
        <Toast
          position="bottom"
          style={{ borderLeftColor: "pink" }}
          contentContainerStyle={{ padding: 15 }}
          text1Style={{
            fontSize: 20,
            fontWeight: "400",
            paddingVertical: 5,
          }}
          text2Style={{
            fontSize: 16,
            paddingBottom: 10,
          }}
          bottomOffset={90}
        />
      </Provider>
    </>
  );
}

export default App;
