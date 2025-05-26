import { View, Text, ScrollView, StyleSheet } from "react-native";
import ActivityCard from "../../components/ActivityCard";
import StaticCard from "../../components/StaticCard";
import {
  SafeAreaView,
  SafeAreaProvider,
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
            text="user"
            textAlign="left"
            width="340" 
            height="70" 
            backgroundColor="lightgrey" 
            color="green"
          />
          <StaticCard
            color="black"
            fontWeight="700"
            text="amel"
            width="340" 
            height="75" 
            backgroundColor="#C5C4D9" 
            url="https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747169059/projectFinDeBatch/front/images/activities/natation/natation-photo-003.avif"
          />
          <Text style={styles.text}>Training Now</Text>
          <View style={styles.topButton}>
            <ScrollView
              contentContainerStyle={{ padding: 5 }}
              horizontal={true} //permet le scroll horizontal
              showHorizontalScrollIndicator={false} //affiche une barre de scroll
              style={styles.scrollView}
            >
              <ActivityCard
                style={styles.activity}

                text="nico"
                color="yellow"
              />
              <ActivityCard
                style={styles.activity}
                text="Sport"
                backgroundColor="#C5C4D9" //gris du figma
                color="yellow"

                url="https://res.cloudinary.com/deuhttaaq/image/upload/f_auto,q_auto/v1747169059/projectFinDeBatch/front/images/activities/natation/natation-photo-003.avif"
              />
              <ActivityCard
                style={styles.activity}
                text="Amel"
                backgroundColor="#E9FEE1" //gris du figma
                url=""
              />
            </ScrollView>
          </View>
          <StaticCard
            width="340" //long du boutton
            height="150" //haut du boutton
            backgroundColor="#EF5F8" 
            color="white"
            text="statistic"
            textAlign="left"
          />
          <View style={styles.bottomButton}>

            <ActivityCard style={styles.activity} text="Amel" url="" />

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

    backgroundColor: "#FEF5F8",
    justifyContent: "center",
    alignItems: "center",
    width:"100%",

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
  },
  activity: {
    padding: "5",
  },
  bottomButton: {
    flexDirection: "row",
  },
});
