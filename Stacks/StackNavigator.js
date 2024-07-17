import CreatePin from "../screens/CreatePin";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import PinScreen from "../screens/PinScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import SiteDesignScreen from "../screens/SearchScreens/SiteDesignScreen";
import CuteIconsScreen from "../screens/SearchScreens/CuteIconsScreen";
import SignUp from "../screens/SignUp";
import WelcomeScreen from "../screens/WelcomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchResultScreen from "../screens/SearchScreens/SearchResultScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AccountScreen from "../screens/AccountScreen";
import PersonalInfo from "../screens/PersonalInfo";
import EmailScreen from "../screens/EmailScreen";
import PasswordScreen from "../screens/PasswordScreen";
import ProfileVisibility from "../screens/ProfileVisibility";
import SocialScreen from "../screens/SocialScreen";
import PrivacySettingsScreen from "../screens/PrivacySettingsScreen";
import GenderScreen from "../screens/GenderScreen";
import StartScreen from "../screens/StartScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import AdvancedSettingsScreen from "../screens/AdvancedSettingsScreen";
import Chatbot from "../screens/Chatbot";
import Dob from "../screens/Dob";
import CountiesScreen from "../screens/CountiesScreen";
import SearchPinsScreen from "../screens/SearchScreens/SearchPinsScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
    {/* <Stack.Screen
      name="Start"
      component={StartScreen}
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
      name="SignUp"
      component={SignUp}
      options={{
        headerShown: false,
      }}
    /> */}
    <Stack.Screen
      name="Pins"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="search"
      component={SearchPinsScreen}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="Home"
      component={WelcomeScreen}
      options={{
        headerShown: false,
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
      name="CreatePins"
      component={CreatePin}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{
        headerShown: false,
        cardStyle: { backgroundColor: "#fff" },
      }}
    />
    <Stack.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Site_Design"
      component={SiteDesignScreen}
      options={{
        headerShown: false,
        cardStyle: { backgroundColor: "#fff" },
      }}
    />
    <Stack.Screen
      name="Cute_Icons"
      component={CuteIconsScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SearchResultScreen"
      component={SearchResultScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SettingsScreen"
      component={SettingsScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Account"
      component={AccountScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="PersonalInfo"
      component={PersonalInfo}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Email"
      component={EmailScreen}
      options={{
        headerShown: false,
        cardStyle: { backgroundColor: "#fff" },
      }}
    />
    <Stack.Screen
      name="PasswordScreen"
      component={PasswordScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ProfileVisibility"
      component={ProfileVisibility}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Social"
      component={SocialScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Privacy"
      component={PrivacySettingsScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Gender"
      component={GenderScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        headerShown: false,
        presentation: "modal",
      }}
    />
    <Stack.Screen
      name="AdvancedSettings"
      component={AdvancedSettingsScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ChatAI"
      component={Chatbot}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Dob"
      component={Dob}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Countries"
      component={CountiesScreen}
      options={{
        headerShown: false,
      }}
    />

    {/* 
    <Stack.Screen
      name="Searc hScreen"
      component={SearchScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{
        headerShown: false,
      }}
    /> */}
  </Stack.Navigator>
);
export default StackNavigator;
