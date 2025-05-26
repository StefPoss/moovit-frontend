import React from "react"
import { View, Text, StyleSheet } from "react-native"
import CircularProgress from "react-native-circular-progress-indicator"

// Dimensions fixes en accord avec les cards du dashboard
const CARD_WIDTH = 340
const CARD_HEIGHT = 75
const CIRCLE_RADIUS = 21

// Composant purement visuel (redux ou fetch se feront dans le parent)
export default function ProgressBarCircular({
  // Titre du niveau courant ("Niveau 1", etc)
  levelTitle = "Niveau de progression",
  // Nb d'étapes déjà validées pour ce niveau
  completedSteps = 5,
  // Nb total d'étapes du niveau
  totalSteps = 20,
}) {
  // Calcul du pourcentage de complétion
  const percent = totalSteps
    ? Math.round((completedSteps / totalSteps) * 100)
    : 0

  return (
    <View style={[styles.card, { width: CARD_WIDTH, height: CARD_HEIGHT }]}>
      <View style={styles.leftBlock}>
        <Text style={styles.title}>{levelTitle}</Text>
        <Text style={styles.steps}>
          {completedSteps}/{totalSteps} exercices complétés
        </Text>
      </View>

      <View style={styles.rightBlock}>
        {/* Overlay pour centrer le texte dans le cercle */}
        <View style={styles.progressCircleContainer}>
          {/* Cercle de progression sans value centrale (texte en overlay) */}
          <CircularProgress
            value={percent}
            radius={CIRCLE_RADIUS}
            maxValue={100}
            activeStrokeColor="#a88afc"
            inActiveStrokeColor="#262626"
            activeStrokeWidth={4}
            inActiveStrokeWidth={4}
            progressValueColor="transparent" // Cache la value centrale par défaut
            title="" // On empêche la lib d'afficher son titr et on gère un affichage personnalisé plus bas dessous
            duration={1000}
          />
          {/* Texte centré au milieu du cercle */}
          <Text style={styles.percentText}>{percent}%</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 15,
    marginVertical: 12,
    marginHorizontal: 5, // espacement gauche = StaticCard
    paddingVertical: 8,
    paddingHorizontal: 14,
    margin: 5, // margin trouvé sur StaticCard
  },
  leftBlock: {
    flex: 1, // Texte à gauche
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 4,
  },
  steps: {
    color: "#fff",
    fontSize: 15,
    opacity: 0.85,
  },
  rightBlock: {
    width: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  progressCircleContainer: {
    width: CIRCLE_RADIUS * 2, // Pour avoir la même largeur/hauteur que le cercle
    height: CIRCLE_RADIUS * 2,
    alignItems: "center",
    justifyContent: "center",
    position: "relative", // pour avoir le texte en overlay au centre
  },
  percentText: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
    includeFontPadding: false,
  },
})
