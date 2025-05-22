import React from "react";
import {View, Text,ScrollView, StyleSheet } from "react-native";
import ActivityCard from "../../components/ActivityCard";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

//a importé dans le terminal !!!  npx expo install react-native-safe-area-context

export default function LoginScreen(props) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView 
        contentContainerStyle={{padding:5}}
        horizontal={true}
        showHorizontalScrollIndicator={true}
        style={styles.scrollView}>
          <View style={styles.container}>
            <Text style={styles.text}>DashBoard</Text>
            <View style={styles.topButton}>
              <ActivityCard style={styles.activity} text={"???"} />
              <ActivityCard style={styles.activity} text={"steph"} />
              <ActivityCard style={styles.activity} text={"amel"} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    // justifyContent: "center",
    // alignItems: "center",
    // overflow:'visible',
    width: 400,
    height: "100%",
  },
  text: {
    color: "blue",
    fontSize: 24,
  },
  topButton: {
    flex: 1,
    flexDirection: "row",
    overflow: "scroll",
    // flexWrap: "Wrap",
    flexWrap: "Wrap",
    //borderWidth: 2,
    // width:"100%",
    // height:"100%",
    // justifyContent: "center",
    // alignItems: "center",
  },
  activity: {
    padding: "5",
  },
});
