import {
  ImageBackground,
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
// import ActivityCard from "../../components/ActivityCard";
import BarStep from "../components/BarStep";
import { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import CardLevelClicable from "../components/CardLevelClicable";
import { useSelector } from "react-redux";


//a importé dans le terminal !!!npm i react-native-circular-progress + npm i --save react-native-circular-progress react-native-svg// npx expo install react-native-reanimated + yarn add react-native-circular-progress-indicator + yarn add react-native-svg

export default function NewLevelScreen({ navigation }) {
  const [value, setValue] = useState(60);
    const topImg =
    "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747168977/projectFinDeBatch/front/images/activities/padel/padel-photo-005.avif";
  //"https://reactnative.dev/img/tiny_logo.png";
    const niv = 80
  // setValue(niv)
  const bgImage =
    "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747168977/projectFinDeBatch/front/images/activities/padel/padel-photo-005.avif";
  return (
    <SafeAreaProvider>
      {/* <SafeAreaView style={styles.container} edges={["top"]}>  cette balise est sesactivé car le rendu est inesthetique */}
      <View style={styles.container}>
        <View style={styles.top}>
          <ImageBackground
            source={{ uri: topImg }}
            resizeMode="cover"
            style={styles.topImg}
          >
            <BarStep value={niv} />
            <Text style={styles.toptxt}>NIVEAU {niv}</Text>
          </ImageBackground>
        </View>
        <View style={styles.midd}>
          <ImageBackground
            source={{ uri: bgImage }}
            resizeMode="cover"
            style={styles.image}
          >
            <ScrollView style={styles.scroll}>
              <CardLevelClicable
                width="368"
                height="150"
                backgroundColor="#F5f5f5"
                fontSize={20}
                text="entete "
                num="2"
                description="corpus libris..corpus libris..corpus libris.."
                linkTo="TabNavigator"
              />
            </ScrollView>
          </ImageBackground>
        </View>
      </View>
      {/* </SafeAreaView> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF5F8",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  top: {
    flex: 0,
    height: "40%",
    width: "100%",
    justifyContent: "flex-end",
    marginTop: "",
  },
  topImg: {
    zIndex: 0,
    // marginLeft: "-30%",
    marginTop: "%",
    width: "100%",
    height: "100%",
    marginTop: "",
  },
  half: {},

  toptxt: {
    zIndex: 99999,
    // marginTop:"55%",
    marginTop: "-41%",
    textAlign: "center",
    fontSize: 30,
    fontWeight: 600,
    color: "rgba(0, 0, 0, 0.52)",
    backgroundColor: "rgba(255, 255, 255, 0.62)",
    width: "100%",
  },

  midd: {
    zIndex: 99999,

    backgroundColor: "rgba(255, 255, 255, 0)",
    flex: 1,
    marginTop: "-12%",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  scroll: {
    backgroundColor: "#ffffff",
  },
  image: {
    zIndex: 99999,

    // zIndex: +50,
    height: "100%",
    width: "100%",
  },

  text: {
    color: "grey",
    fontSize: 20,
    marginLeft: -170,
  },
  topButton: {
    flex: 0,
    flexDirection: "row",
  },
  activity: {
    padding: "5",
  },
  bottomButton: {
    flexDirection: "row",
  },
});
