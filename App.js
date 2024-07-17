// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./Stacks/TabNavigator";
import StackNavigator from "./Stacks/StackNavigator";
import { Provider } from "react-redux";
import { store } from "./store";
import Toast, { BaseToast } from "react-native-toast-message";
// import { onAuthStateChanged } from "firebase/auth";
// import { FIREBASE_AUTH } from "./FirebaseConfig";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "./screens/StartScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUp from "./screens/SignUp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      position="top"
      style={{ borderLeftColor: "black" }}
      contentContainerStyle={{ paddingHorizontal: 45, borderRadius: 40 }}
      text1Style={{
        fontSize: 20,
        fontWeight: "400",
        paddingVertical: 5,
      }}
      topOffset={140}
    />
  ),
};
function App() {
  const [user, setUser] = React.useState(null);

  // React.useEffect(() => {
  //   onAuthStateChanged(FIREBASE_AUTH, (user) => {
  //     setUser(user);
  //   });
  // }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
          <Toast config={toastConfig} />
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;

{
  /* <Toast
position="top"
style={{
  borderLeftColor: "black", // Set the border left color to black
  borderLeftWidth: 5, // Ensure there is a border width, adjust as needed
  backgroundColor: "white", // Optional: set a background color for better visibility
  borderRadius: 100, // Optional: add border radius for styling
  margin: 10,
}} // Optional: add margin for spacing            contentContainerStyle={{ padding: 15 }}
text1Style={{
  fontSize: 20,
  fontWeight: "400",
  paddingVertical: 5,
}}
text2Style={{
  fontSize: 16,
  paddingBottom: 10,
}}
topOffset={90}
/> */
}
