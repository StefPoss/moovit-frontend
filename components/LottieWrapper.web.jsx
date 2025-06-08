// Composant Lottie pour le Web uniquement (PWA)
// Utilise lottie-react
// Affiche un fallback si l'import échoue (ex: en dev ou anim absente)

import React from "react"
import { Text } from "react-native"
import LottieReact from "lottie-react"

export default function LottieWrapper({ source, ...props }) {
  try {
    return <LottieReact animationData={source} {...props} />
  } catch (error) {
    console.warn("⚠️ Lottie web import failed:", error.message)

    return (
      <Text style={{ color: "red", fontSize: 14, textAlign: "center" }}>
        🔄 Animation non disponible
      </Text>
    )
  }
}
