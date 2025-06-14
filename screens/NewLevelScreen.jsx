import {
  ImageBackground,
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// import ActivityCard from "../../components/ActivityCard";
import BarStep from "../components/BarStep";
import { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import CardLevelClicable from "../components/CardLevelClicable";
import { useSelector } from "react-redux";

//a importé dans le terminal !!!npm i react-native-circular-progress + npm i --save react-native-circular-progress react-native-svg// npx expo install react-native-reanimated + yarn add react-native-circular-progress-indicator + yarn add react-native-svg

export default function NewLevelScreen({ route, navigation }) {
  const { leveling } = route.params;
 

  let sublevelsMapped = leveling.map((e, i) => {
    return (
      <CardLevelClicable
        key={i}
        width="100%"
        height="150"
        backgroundColor="#F5f5f5"
        fontSize={17}
        text={e.title}
        url={e.image}
        num={e.subLevelID}
        description={e.description}
        linkTo="TabNavigator"
        varNewLevel= {true}


        // subLevelSent={''}

        // linkTo="HistoryPlay"
        // linkTo="Dashboard"
      />
    );
  });

  // const [value, setValue] = useState(60);
  const topImg =
    "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747168960/projectFinDeBatch/front/images/activities/padel/padel-photo-013.avif";
  const niv = "";
  const bgImage =
    "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747168977/projectFinDeBatch/front/images/activities/padel/padel-photo-005.avif";
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.top}>
          <ImageBackground
            source={{ uri: topImg }}
            resizeMode="cover"
            style={styles.topImg}
          >
               <TouchableOpacity
            style={styles.touchableButton}
            onPress={() => navigation.goBack()}
          >
            <View style={styles.backButton}>
            <Ionicons name="arrow-back" size={35} color="white" />
            </View>
          </TouchableOpacity>
            {/* <BarStep value={niv} /> */}
            <Text style={styles.toptxt}>
              Laisse toi guider à travers les étapes de ce niveau {niv}
            </Text>
          </ImageBackground>
        </View>
        <View style={styles.midd}>
          <ImageBackground
            source={{ uri: bgImage }}
            resizeMode="cover"
            style={styles.image}
          >
            <ScrollView style={styles.scroll}>{sublevelsMapped}</ScrollView>
          </ImageBackground>
        </View>
      </View>
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
    height: "50%",
    width: "100%",
    marginTop: "-25%",
  },
  topImg: {
    zIndex: 0,
    width: "100%",
    height: "100%",
  },

  toptxt: {
    zIndex: 99999,
    marginTop: "40.5%",
    textAlign: "center",
    fontFamily: "ManropeBold",
    fontSize: 25,
    color: "rgba(255, 255, 255, 1)",
    width: "100%",
  },

  toptxt: {
    zIndex: 99999,
    marginTop: "40.5%",
    textAlign: "center",
    fontFamily: "ManropeBold",
    fontSize: 25,
    color: "rgba(255, 255, 255, 1)",
    width: "100%",
  },

  midd: {
    zIndex: 1,

    backgroundColor: "rgba(255, 255, 255, 0)",
    flex: 1,
    marginTop: "-12%",
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    width: "100%",
  },
  scroll: {
    backgroundColor: "#ffffff",
  },
  image: {
    zIndex: 99999,

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
  touchableButton:{
    marginTop: "35%",
    paddingBottom:"20%",
    marginBottom:"-160",

  },
  backButton:{
    marginBottom:"-160",
    borderRadius:7,
    backgroundColor: "rgba(72, 68, 68, 0.42)",
    width:"35"

},

});
