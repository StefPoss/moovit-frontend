import { View, Image, Text, ScrollView, StyleSheet } from "react-native";
import ActivityCard from "../../components/ActivityCard";
import CardLevelClicable from "../../components/CardLevelClicable";

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

//a importé dans le terminal !!!  npx expo install react-native-safe-area-context

export default function LevelScreen(props) {
  // <ActivityCard    //clickable
  //   text=""//texte a afficher dans le bouton
  //   width="150" //long du boutton
  //   height="150" //haut du boutton
  //   backgroundColor="#FCEACE" //gris du figma
  //   url="https://reactnative.dev/img/tiny_logo.png"//url de l'image
  //   color="black"//couleur de la font
  //   fontWeight="700"//fontsize
  // />;

  //  <StaticCard   //NON-clickable
  //     text="user" //texte a afficher dans le bouton
  //     textAlign="left" //affichage du text left/center/right
  //     width="340" //long du boutton
  //     height="70" //haut du boutton
  //     backgroundColor="lightgrey" //couleur du bg
  //     color="green"//couleur de la font
  //     fontWeight="700"//fontsize
  //      />

  //   FakeData=[{_id:objectid, title:string, description:string, image:'https://reactnative.dev/img/tiny_logo.png', level:sousdoc}]
  // const cards=FakeData.map(Data)=>{
  //   return <CardLevelClicable
  //      text = Data.title
  //      description = Data.description
  //      color="black"
  //      width="150" //long du boutton
  //      height="150" //haut du boutton
  //      backgroundColor="#FCEACE" //gris du figma
  //      url = Data.image
  //      fontWeight="700"
  //             />}

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.container}>
             <Image style={styles.topImg} source={{ uri:'https://reactnative.dev/img/tiny_logo.png'  }} />
          <ScrollView
            contentContainerStyle={{ padding: 5 }}
            horizontal={false} //permet le scroll horizontal
            showHorizontalScrollIndicator={false} //affiche une barre de scroll
            style={styles.scrollView}
          >
             <Image style={styles.CenterImg} source={{ uri:'https://reactnative.dev/img/tiny_logo.png' }} />
            {/* {CardLevelClicable} */}
            <CardLevelClicable
              text=""
              description=""
              color="black"
              width="150" //long du boutton
              height="150" //haut du boutton
              backgroundColor="#FCEACE" //gris du figma
              url="'https://reactnative.dev/img/tiny_logo.png'"
              fontWeight="700"
            />
          </ScrollView>
        </View>
      </SafeAreaView>
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
  topImg:{},
  CenterImg:{},
  
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
