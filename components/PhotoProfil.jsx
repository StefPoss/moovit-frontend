import React from "react";
import { Image, View, StyleSheet } from "react-native";

function PhotoProfil(props) {
  
  return (
    <View style={styles.container}>
        <Image
        source={{ uri: props.photoUrl }}
        style={styles.image}
      />

    </View>
  );
}
export default PhotoProfil;

const styles = StyleSheet.create({
    container: {
    width: 80,
    height: 80,
    borderRadius: 40,
    // borderWidth: 2,
    //borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    //resizeMode: "cover",
  },
  
});