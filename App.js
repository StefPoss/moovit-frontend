import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    Cocomat: require("./assets/fonts/cocomat-pro-regular.ttf"),
    Manrope: require("./assets/fonts/Manrope-VariableFont.ttf"),
  });

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "Cocomat", fontSize: 24 }}>
        Open up App.js to start working on your app!
      </Text>
      <Text style={{ fontFamily: "Manrope", fontSize: 24 }}>
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
