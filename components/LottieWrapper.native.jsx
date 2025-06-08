// Composant Lottie pour Android/iOS uniquement
// Utilise lottie-react-native
// Pas chargé sur le web (grâce à .native.js)

import React from "react"
import LottieNative from "lottie-react-native"

export default function LottieWrapper({ source, ...props }) {
  return <LottieNative source={source} {...props} />
}
