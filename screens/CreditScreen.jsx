import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function CreditScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.all}>
      {/* <ScrollView style={styles.container}> */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.backButton}></View>
      <View style={styles.body}>
        <View style={styles.heading}>
          <Text style={styles.center}>Staff by Alphabetic Order:</Text>
        </View>
        <View style={styles.center}>
          <Text style={styles.heading}>Amel"Sousmarin"</Text>
          <Text style={styles.heading}>Nico"Marcha Pas"</Text>
          <Text style={styles.heading}>Sami"Machine"</Text>
          <Text style={styles.heading}>Stephane"Buddy"</Text>
          <Text style={styles.heading}>Soufiane"Neo"</Text>
        </View>
        <View >
          <Text style={styles.center}>and</Text>
          <Text style={styles.heading}>Julien""</Text>
        </View>
      </View>

      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    all:{ 
        flex: 1,
        backgroundColor:'rgba(247, 216, 216, 0.53)',
    },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
    textAlign:"center",

    padding: 24,
  },
  backButton: {
    marginBottom: 16,
    alignSelf: "flex-start",
  },
center:{
    fontFamily: 'ManropeSemiBold',
    justifyContent: "center",
    alignItems:"center",
    textAlign:"center",
    fontSize: 20,
    fontWeight: "600",
    paddingBottom:"3%",
    color:'rgba(1, 1, 1, 0.78)',
},

    heading: {
    paddingVertical:"4%",
    fontFamily:"CocomatPro-Regular",
    color:'rgba(58, 60, 60, 0.83)',
    justifyContent: "center",
    alignItems:"center",
    textAlign:"center",
    fontSize: 29,
    fontWeight: "700",
    marginBottom: 4,
  },
  body: {

   },

});

