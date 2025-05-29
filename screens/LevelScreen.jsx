import {
  ImageBackground,
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
// import ActivityCard from "../../components/ActivityCard";
import CardLevelClicable from "../components/CardLevelClicable";
import { useSelector } from "react-redux";

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { API_URL } from "@env";

//a importé dans le terminal !!!  npx expo install react-native-safe-area-context

export default function LevelScreen(props) {
  const activity = useSelector((state) => state.activity.value);
  const user = useSelector((state) => state.user.value);
  const [allActivity, setAllActivity] = useState([]);

  // let levelsCards = activity?.map((e, i) => (
  //   <CardLevelClicable
  //     key={i}
  //     // num = {i}
  //     width="368"
  //     style={styles.activity}
  //     text={e.title}
  //     description={e.description}
  //     fontSize={13}
  //     backgroundColor="#C5C4D9"
  //     color="black"
  //     url={e.image}
  //     fill={false}
  //     linkTo="NewLevelScreen"
  //   />
  // ));

  function fetchActivityData() {
    // console.log(user.sportPlayed);

    return fetch(`${API_URL}/api/users/getsport`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sport: user.sportPlayed,
      }),
    })
      .then((r) => r.json())
      .then((dataSport) => {
        if (dataSport.result) {
          let activityArray = [];
          for (let act of dataSport.data.levels) {
            activityArray.push(act);
          }

          setAllActivity(activityArray);
        }
      });
  }

  let levelsCards = allActivity?.map((e, i) => {
    // let bgCol;
    //   i === 0 || i === 3 || i === 6 || i === 9
    //   ? (bgCol = "#eeeef5")
    //   : i === 1 || i === 4 || i === 7 || i === 10
    //   ? (bgCol = "#ac9cc4")
    //   : i === 2 || i === 5 || i === 8 || i === 11
    //   ? (bgCol = "#ffecce")
    //   : (bgCol = "#C5C4D9");

    return (
      <CardLevelClicable
        key={i}
        // num = {i}
        width="100%"
        style={styles.activity}
        text={e.title}
        description={e.description}
        fontSize={13}
        backgroundColor={"#F5f5f5"}
        color="black"
        url={e.image}
        fill={false}
        linkTo="NewLevelScreen"
        subLevelSent={e.subLevels}
      />
    );
  });

  const topImg =
    "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747168945/projectFinDeBatch/front/images/activities/padel/padel-photo-020.avif";
  // "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1748380203/projectFinDeBatch/front/images/activities/activities-padel-01_mw10dt.png";
  const niv = "";
  const bgImage = ""; //"https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747168977/projectFinDeBatch/front/images/activities/padel/padel-photo-005.avif"

  // 1er appel : charge le dashboard au premier render
  useEffect(() => {
    fetchActivityData();
    //console.log("activity subLevels ",activity.length);
  }, []);
  return (
    <SafeAreaProvider>
      {/* <SafeAreaView style={styles.container} edges={["top"]}>  cette balise est sesactivé car le rendu est inesthetique */}
      <View style={styles.container}>
        <Image style={styles.topImg} source={{ uri: topImg }} />
        <Text style={styles.toptxt}>Niveaux {niv}</Text>
        <View style={styles.midd}>
          <ImageBackground
            source={{ uri: bgImage }}
            resizeMode="cover"
            style={styles.image}
          >
            <ScrollView>
              {levelsCards}
              {/* <CardLevelClicable
            style={styles.try}
            text="titre"
            description="description..."
            color="black"
            width="370" //long du boutton
            height="140" //haut du boutton
             backgroundColor="#FCEACE" //gris du figma
            url="https://reactnative.dev/img/tiny_logo.png"
            fontWeight="700"
            linkTo="NewLevelScreen"
            
          /> */}
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
    // backgroundColor: "#FEF5F8",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  topImg: {
    width: "100%",
    height: "35%",
  },
  toptxt: {
    marginTop: "-39%",
    paddingBottom: "30%",
    textAlign: "center",
    fontSize: 30,
    fontWeight: 600,
    color: "rgb(255, 255, 255)",
    // backgroundColor: "rgba(255, 255, 255, 0.62)",
    width: "100%",
    fontFamily: "CocomatPro-Regular",
  },
  image: {
    zIndex: +50,
    height: "100%",
    width: "100%",
  },
  midd: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  try: {
    backgroundColor: "rgba(255, 255, 255, 0)",
  },

  CenterImg: {
    width: "10",
    height: "10",
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
  activity: {},
  bottomButton: {
    flexDirection: "row",
  },
});
