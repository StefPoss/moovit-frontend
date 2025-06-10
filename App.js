import NewRelic from "newrelic-react-native-agent";

import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Splash from "./screens/Auth/SplashScreen";
import Login from "./screens/Auth/LoginScreen";
import SignUp from "./screens/Auth/SignupScreen";
import onBoarding from "./screens/OnBoarding/OnBoardingForms";
import Dashboard from "./screens/Main/Dashboard";
import NewLevelScreen from "./screens/NewLevelScreen";
import CguScreen from "./screens/Auth/CGUScreen";
import Play from "./screens/Activities/Play";
import ProfileScreen from "./screens/Main/ProfileScreen";
import TestChartScreen from "./screens/TestChartScreen";
import CreditScreen from "./screens/CreditScreen";
import HistoryPlay from "./screens/Activities/HistoryPlay";
import RLevelScreen from "./screens/RLevelScreen";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userReducer from "./reducers/userSlice";
import activityReducer from "./reducers/activitySlice";
import onBoardingReducer from "./reducers/onBoardingSlice";
import { PaperProvider } from "react-native-paper";
import ForgotScreen from "./screens/Auth/ForgotScreen";

const rootReducer = combineReducers({
  user: userReducer,
  activity: activityReducer,
  onBoarding: onBoardingReducer,
});

const persistConfig = {
  key: "Moovit",
  storage: AsyncStorage,
  whitelist: ["user", "activity", "onBoarding"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Dashboard") {
            iconName = "home-outline";
          } else if (route.name === "RLevelScreen") {
            iconName = "list-outline"; 
          } else if (route.name === "ProfilScreen") {
            iconName = "person-outline";
          }
          return <Ionicons name={iconName} size={32} color={color} />;
        },
        tabBarActiveTintColor: "#785BFF",
        tabBarInactiveTintColor: "#222",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle:
          route.name === "LevelScreen"
            ? { display: "none" }
            : {
                backgroundColor: "#f9f9f9",
              },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="RLevelScreen" component={RLevelScreen} />
      <Tab.Screen name="ProfilScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  // Attention Android requiert le nom Exact des fonts - passage des fonts sur https://fontdrop.info/ pour avoir le nom reeal
  const [fontsLoaded] = useFonts({
    "CocomatPro-Regular": require("./assets/fonts/cocomat-pro-regular.ttf"), // Ajout des fonts (Modification du nom des polices pour compatibilité sur android)
    ManropeExtraLight: require("./assets/fonts/Manrope-ExtraLight.ttf"),
    ManropeLight: require("./assets/fonts/Manrope-Light.ttf"),
    ManropeRegular: require("./assets/fonts/Manrope-Regular.ttf"),
    ManropeMedium: require("./assets/fonts/Manrope-Medium.ttf"),
    ManropeSemiBold: require("./assets/fonts/Manrope-SemiBold.ttf"),
    ManropeBold: require("./assets/fonts/Manrope-Bold.ttf"),
    ManropeExtraBold: require("./assets/fonts/Manrope-ExtraBold.ttf"),
    MaterialCommunityIcons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf"),
    "Questrial-Regular": require("./assets/fonts/Questrial-Regular.ttf"), // police à télécharger
    // Ajout des fonts (Modification du nom des polices pour compatibilité sur android)
  });

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {/* <Stack.Screen name="TestChart" component={TestChartScreen} /> */}
              <Stack.Screen name="Welcome" component={Splash} />
              <Stack.Screen name="S'inscrire" component={SignUp} />
              <Stack.Screen name="Se connecter" component={Login} />
              <Stack.Screen name="onBoarding" component={onBoarding} />
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="cgu" component={CguScreen} />
              <Stack.Screen name="RLevelScreen" component={RLevelScreen} />
              <Stack.Screen name="NewLevelScreen" component={NewLevelScreen} />
              <Stack.Screen name="Play" component={Play} />
              <Stack.Screen name="HistoryPlay" component={HistoryPlay} />
              <Stack.Screen name="TabNavigator" component={TabNavigator} />
              <Stack.Screen name="Forgot" component={ForgotScreen} />
              <Stack.Screen name="CreditScreen" component={CreditScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
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
