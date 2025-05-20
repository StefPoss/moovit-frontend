import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font"; // Import du module Expo pour l'usage des fonts
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./Screens/Auth/Splash";
import Login from "./Screens/Auth/Login";
import SignUp from "./Screens/Auth/Signup";

const Stack = createNativeStackNavigator();

export default function App() {
  // Attention Android requiert le nom Exact des fonts - passage des fonts sur https://fontdrop.info/ pour avoir le nom reeal
  const [fontsLoaded] = useFonts({
    "CocomatPro-Regular": require("./assets/fonts/cocomat-pro-regular.ttf"), // Ajout des fonts (Modification du nom des polices pour compatibilité sur android)
    "Manrope-ExtraLight": require("./assets/fonts/Manrope-ExtraLight.ttf"), // Ajout des fonts (Modification du nom des polices pour compatibilité sur android)
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Splash} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

/*import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'CocomatPro-Regular': require('./assets/fonts/cocomat-pro-regular.ttf'),
    'Manrope-Extralight': require('./assets/fonts/Manrope-Extralight.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}*/
