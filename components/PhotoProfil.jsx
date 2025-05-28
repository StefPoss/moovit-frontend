import React from "react"
import { Image, View, StyleSheet } from "react-native"

function PhotoProfil(props) {
  // Log pour checker URL à chaque render
  console.log("PhotoProfil props.photoUrl =", props.photoUrl)
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: props.photoUrl }} // On passe l’URL reçue en props, quelle que la source (API ou défaut)
        style={styles.image}
        // On logue si jamais l’image charge mal ou l’URL est pétée
        onError={(e) => console.log("Erreur chargement image :", e.nativeEvent)}
      />
    </View>
  )
}
export default PhotoProfil

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
    resizeMode: "cover",
  },
})
