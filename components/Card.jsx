import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

const CardComp = (props) => {
  return (
    <View
      style={[
        styles.CardContain,
        {
          backgroundColor: props.color,
          width: props.width,
          height: props.height,
        },
        // { borderColor: props.borderColor },
      ]}
    >
      <Text style={styles.txtCard}>{props.text}</Text>
    </View>
  );
};
export default CardComp;

const styles = StyleSheet.create({
  txtCard: {
    fontFamily: "ManropeSemiBold",
    fontSize: 20,
    fontWeight: "2000",
    marginTop: 60,
    marginBottom: 60,
    textAlign: "center",
  },
  CardContain: {
    width: "100%",
    paddingHorizontal: 30,
    marginHorizontal: "auto",
    borderRadius: 20,
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
