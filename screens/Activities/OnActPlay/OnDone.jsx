import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Text,
} from "react-native";
import CardAct from "../../../components/CardAct";

export default function OnDone({ navigation }) {
  return (
    <SafeAreaView>
      <View style={styles.contain}>
        <View>
          <CardAct
            height={100}
            width={"100%"}
            color={"grey"}
            text={"Page de ONDONE"}
          />
        </View>
        <View>
          <Text>Page de ONDONE</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  contain: {
    display: "flex",
    borderWidth: 3,
    height: "100%",
    justifyContent: "space-around",
  },
});
