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

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

//a importé dans le terminal !!!  npx expo install react-native-safe-area-context

export default function LevelScreen(props) {
  //   FakeData=[{_id:objectid, title:string, description:string, image:'https://reactnative.dev/img/tiny_logo.png', level:sousdoc}]
  // const cards=FakeData.map(Data)=>{
  //   return <CardLevelClicable
  //      text = Data.title
  //      description = Data.description
  //      color="black"
  //      color="black"
  //      width="370" //long du boutton
  //      height="140" //haut du boutton
  //      backgroundColor="#FCEACE" //gris du figma
  //      url = Data.image
  //      fontWeight="700"
  //             />}
  const topImg = "https://reactnative.dev/img/tiny_logo.png";
  const niv = "1";
  const bgImage =
    "https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747168977/projectFinDeBatch/front/images/activities/padel/padel-photo-005.avif";
  return (
    <SafeAreaProvider>
      {/* <SafeAreaView style={styles.container} edges={["top"]}>  cette balise est sesactivé car le rendu est inesthetique */}
      <View style={styles.container}>
        <Image style={styles.topImg} source={{ uri: topImg }} />
        <Text style={styles.toptxt}>NIVEAU {niv}</Text>
        <View style={styles.midd}>
          <ImageBackground
            source={{ uri: bgImage }}
            resizeMode="cover"
            style={styles.image}
          >
            <ScrollView>
              {/* {CardLevelClicable} */}

              <CardLevelClicable
                style={styles.try}
                text="titre"
                description="description..."
                color="black"
                width="370" //long du boutton
                height="140" //haut du boutton
                backgroundColor="#FCEACE" //gris du figma
                url="https://reactnative.dev/img/tiny_logo.png"
                fontWeight="700"
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
    zIndex: +50,
    height: "100%",
    width: "100%",
  },
  midd: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    flex: 1,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
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
  activity: {
    padding: "5",
  },
  bottomButton: {
    flexDirection: "row",
  },
});
