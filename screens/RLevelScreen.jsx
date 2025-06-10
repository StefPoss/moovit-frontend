import {
  ImageBackground,
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { TouchableOpacity } from "react-native";

import CardLevelClicable from "../components/CardLevelClicable";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { API_URL } from "@env";

//a importé dans le terminal !!!  npx expo install react-native-safe-area-context

export default function RLevelScreen({ navigation }) {
  const activity = useSelector((state) => state.activity.value);
  const user = useSelector((state) => state.user.value);
  const [allActivity, setAllActivity] = useState([]);

  function fetchActivityData() {
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
    return (
      <CardLevelClicable
        key={i}
        width="100%"
        style={styles.activity}
        text={e.title}
        description={e.description}
        fontSize={13}
        backgroundColor={"#eaeaea"}
        color="black"
        url={e.image}
        fill={false}
        linkTo="NewLevelScreen"
        subLevelSent={e.subLevels}
      />
    );
  });

  const topImg =
    "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747168930/projectFinDeBatch/front/images/activities/padel/padel-photo-026.avif";
  const niv = "";
  const bgImage = "";
  useEffect(() => {
    fetchActivityData();
  }, []);
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
       
        <View style={styles.textBubble}>
          <Text style={styles.toptxt}>
            Explore tous les niveaux {"\n"}pour suivre ton évolution ! {niv}
          </Text>
        </View>
        </ImageBackground>
         </View>
        <View style={styles.midd}>
          <ScrollView style={styles.scroll}>{levelsCards}</ScrollView>
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

  midd: {
    zIndex: 1,

    backgroundColor: "rgba(255, 255, 255, 0)",
    flex: 1,
    marginTop: "-12%",
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    width: "100%",
    marginTop:"-30%",

  },
  scroll: {
    backgroundColor: "#ffffff",
    marginTop:"120",
    paddingTop:"0"
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

  