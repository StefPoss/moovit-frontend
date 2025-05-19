import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font"; // Import du module Expo pour l'usage des fonts
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  // Attention Android requiert le nom Exact des fonts - passage des fonts sur https://fontdrop.info/ pour avoir le nom reeal
  const [fontsLoaded] = useFonts({
    "CocomatPro-Regular": require("./assets/fonts/cocomat-pro-regular.ttf"), // Ajout des fonts (Modification du nom des polices pour compatibilité sur android)
    "Manrope-ExtraLight": require("./assets/fonts/Manrope-ExtraLight.ttf"), // Ajout des fonts (Modification du nom des polices pour compatibilité sur android)
  });

  return (
    <View style={styles.container}>
      {/* Test des polices  */}
      <Text style={{ fontFamily: "CocomatPro-Regular", fontSize: 24 }}>
        Open up App.js to start working on your app!
      </Text>
      <Text style={{ fontFamily: "Manrope-ExtraLight", fontSize: 24 }}>
        Open up App.js to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
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
