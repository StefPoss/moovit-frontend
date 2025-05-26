import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

const CardAct = (props) => {
  return (
    <View
      style={[
        styles.CardContain,
        {
          backgroundColor: props.color,
          width: props.width,
          height: props.height,
        },
      ]}
    >
      <Text style={styles.txtCard}>{props.text}</Text>
    </View>
  );
};
export default CardAct;

const styles = StyleSheet.create({
  txtCard: {
    fontFamily: "ManropeSemiBold",
    fontSize: 20,
    fontWeight: "2000",
    color: "black",
    textAlign: "center",
  },
  CardContain: {
    width: "100%",
    paddingHorizontal: 30,
    marginHorizontal: "auto",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
  },
});
