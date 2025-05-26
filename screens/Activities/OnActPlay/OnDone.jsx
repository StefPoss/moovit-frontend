import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import CardAct from "../../../components/CardAct";

export default function OnDone(props) {
  const [onSelect, setOnSelect] = useState("");

  return (
    <ImageBackground
      source={{ uri: props.uriImage }}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.contain}>
          <CardAct
            height={100}
            width={"100%"}
            color={"grey"}
            text={"Qu'as tu pensé de ta séance ?"}
          />
          <View style={styles.grpbtn}>
            {["Facile", "Juste Bien", "Trop dur"].map((label) => (
              <TouchableOpacity
                key={label}
                style={styles.smallButton}
                onPress={() => setOnSelect(label)}
              >
                <Text style={styles.btnText}>{label}</Text>
                {onSelect === label && <View style={styles.arrow} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  contain: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 100,
    paddingBottom: 300,
    paddingHorizontal: 16,
  },
  grpbtn: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btnText: {
    color: "white",
    fontSize: 20,
  },
  smallButton: {
    padding: 12,
    backgroundColor: "#888",
    borderRadius: 8,
    alignItems: "center",
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    alignSelf: "center",
    marginTop: 4,
  },
});
