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

export default function OnReward({ navigation, xp }) {
  const textreward = `+${xp} XP gagnés , Rythme de dingue !`;
  return (
    <SafeAreaView>
      <View style={styles.contain}>
        <View>
          <CardAct
            height={100}
            width={"100%"}
            color={"white"}
            text={"FELICITATIONS !"}
          />
        </View>
        <View>
          <CardAct
            height={100}
            width={"100%"}
            color={"yellow"}
            text={textreward}
          />
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
