import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import ActivityCard from "../../components/ActivityCard";
import StaticCard from "../../components/StaticCard";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import Tabnavigation from "../../components/Tabnavigation"; // ajout tabnavigation barre avec les icones

//a importé dans le terminal !!!  npx expo install react-native-safe-area-context

export default function DashBoard(props) {
  <ActivityCard
    text=""
    width="150" //long du boutton
    height="150" //haut du boutton
    backgroundColor="#FCEACE" //gris du figma
    url="https://reactnative.dev/img/tiny_logo.png"
    color="black"
    fontWeight="700"
  />;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.container}>
          <StaticCard
            title="user"
            width="340" //long du boutton
            height="70" //haut du boutton
            backgroundColor="#FEF5F8" //gris du figma
            textColor="blue"
          />
          <StaticCard
            title="amel"
            width="340" //long du boutton
            height="75" //haut du boutton
            backgroundColor="black" //gris du figma
            textColor="white"
          />
          <Text style={styles.text}>Training Now</Text>
          <View style={styles.topButton}>
            <ScrollView
              contentContainerStyle={{ padding: 5 }}
              horizontal={true} //permet le scroll horizontal
              // showHorizontalScrollIndicator={false} //affiche une barre de scroll
              style={styles.scrollView}
            >
              <ActivityCard style={styles.activity} text="nico" />
              <ActivityCard
                style={styles.activity}
                text="dhfjghkhghlhljimij"
                backgroundColor="#C5C4D9" //gris du figma
                color="red"
                url="https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747169059/projectFinDeBatch/front/images/activities/natation/natation-photo-003.avif"
              />
              <ActivityCard
                style={styles.activity}
                text="amel"
                backgroundColor="#E9FEE1" //gris du figma
                url=""
              />
            </ScrollView>
          </View>
          <StaticCard
            width="340" //long du boutton
            height="150" //haut du boutton
            backgroundColor="#FEF5F8" //gris du figma
          />
          <View style={styles.bottomButton}>
            <ActivityCard style={styles.activity} text="amel" url="" />
            <StaticCard
              width="200" //long du boutton
              height="150" //haut du boutton
              backgroundColor="#C5C4D9" //gris du figma
            />
          </View>
        </View>
        {/* Intégration de la Tabnavigation ici à modifier */}
        <Tabnavigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    // justifyContent: "center",
    alignItems: "center",
    // overflow:'visible',
    width: "100%",
    height: "100%",
  },
  text: {
    color: "grey",
    fontSize: 20,
    marginLeft: -170,
  },
  topButton: {
    flex: 0,
    flexDirection: "row",
    // overflow: "scroll",
    // flexWrap: "Wrap",
    // flexWrap: "Wrap",
    // borderWidth: 2,
    // width:"100%",
    // height:"100%",
    // justifyContent: "center",
    // alignItems: "center",
  },
  activity: {
    padding: "5",
  },
  bottomButton: {
    flexDirection: "row",
  },
});
