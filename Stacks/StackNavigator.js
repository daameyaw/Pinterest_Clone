import CreatePin from "../screens/CreatePin";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import PinScreen from "../screens/PinScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SignUp from "../screens/SignUp";
import WelcomeScreen from "../screens/WelcomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={WelcomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={{
        headerShown: false,
        presentation: "fullScreenModal",
      }}
    />
    <Stack.Screen
      name="PinScreen"
      component={PinScreen}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Pins"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name="CreatePins" component={CreatePin} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
  </Stack.Navigator>
);
export default StackNavigator;
