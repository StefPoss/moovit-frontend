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
import { useState } from "react";
import PropTypes from "prop-types";

//a importé dans le terminal !!!  npx expo install react-native-safe-area-context

export default function LevelScreen(props) {
  const activity = useSelector((state) => state.activity.value);

 let levelsCards = activity?.map((e, i) => (
    <CardLevelClicable
      key={i+1}
      // num = {i}
      width="368"
      style={styles.activity}
      text={e.title}
      description={e.description}
      fontSize="12"
      backgroundColor="#C5C4D9"
      color="black"
      url={e.image}
      fill={false}
      linkTo="NewLevelScreen"
      // keyNum={keyNum}
    /> )); 

  const[lastLv,setLastLv]=useState(null)
  // const keyNum=(key)=>{
  //   console.log(key)
  //   setLastLv(key)
  // }
  // console.log(props);
  
  const topImg= "https://reactnative.dev/img/tiny_logo.png"
  const niv= lastLv
  const bgImage = "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747168977/projectFinDeBatch/front/images/activities/padel/padel-photo-005.avif"
  return (
    <SafeAreaProvider>
      {/* <SafeAreaView style={styles.container} edges={["top"]}>  cette balise est sesactivé car le rendu est inesthetique */} 
      <View style={styles.container}>
        <Image
          style={styles.topImg}
          source={{ uri: topImg }}
        />
        <Text style={styles.toptxt}>NIVEAU {niv}</Text>
        <View style={styles.midd}>
          <ImageBackground
            source={{uri: bgImage }}
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
    backgroundColor: "#FEF5F8",
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
    marginTop: -49,
    textAlign: "center",
    fontSize: 30,
    fontWeight: 600,
    color: "rgba(0, 0, 0, 0.52)",
    backgroundColor: "rgba(255, 255, 255, 0.62)",
    width: "100%",
  },
  image: {
zIndex:+50,
    height:'100%',
    width:'100%',
  },
  midd: {
    backgroundColor:"rgba(255, 255, 255, 0)",
    flex: 1,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
try:{    
    backgroundColor:"rgba(255, 255, 255, 0)",
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
  activity: {
    padding: "5",
  },
  bottomButton: {
    flexDirection: "row",
  },
});
