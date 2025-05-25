import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ImageBackground,
} from "react-native";
import OnPlay from "./OnActPlay/OnPlay";
import OnDone from "./OnActPlay/OnDone";
import OnProgress from "./OnActPlay/OnProgress";
import OnReward from "./OnActPlay/OnReward";
import ProgressBarComp from "../../components/ProgressBar";
import activities from "../../data/activities_sample.json";

export default function Play({ navigation }) {
  const [levelStatus, setLevelStatus] = useState(0);
  const [numLevel, setNumLevel] = useState(0);

  const subLevels = activities?.levels?.[0]?.subLevels || [];
  const imgback = subLevels[numLevel]?.image;
  const tabLevel = ["onPlay", "onDone", "onReward", "onProgress"];
  const totalLevels = subLevels.length;

  // Gestion du changement d'état (onPlay / onDone / ...)
  const plusstate = () => {
    if (levelStatus < tabLevel.length - 1) {
      setLevelStatus(levelStatus + 1);
    }
  };

  const moinstate = () => {
    if (levelStatus > 0) {
      setLevelStatus(levelStatus - 1);
    }
  };

  const moinslevel = () => {
    if (numLevel > 0) {
      setNumLevel(numLevel - 1);
    }
  };

  const pluslevel = () => {
    if (numLevel < totalLevels - 1) {
      setNumLevel(numLevel + 1);
    }
  };

  useEffect(() => {
    console.log("ÉTAPE :", tabLevel[levelStatus]);
  }, [levelStatus]);

  let toDisp;
  if (tabLevel[levelStatus] === "onPlay") {
    toDisp = (
      <OnPlay
        onDone={() => setLevelStatus(false)}
        numLevel={numLevel}
        setNumLevel={setNumLevel}
      />
    );
  } else if (tabLevel[levelStatus] === "onDone") {
    toDisp = <OnDone />;
  } else if (tabLevel[levelStatus] === "onReward") {
    toDisp = <OnReward />;
  } else if (tabLevel[levelStatus] === "onProgress") {
    toDisp = <OnProgress />;
  }

  return (
    <ImageBackground
      source={{ uri: imgback }}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.testHeader}>
          <TouchableOpacity style={styles.smallButton} onPress={moinstate}>
            <Text style={styles.btnText}>state-</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallButton} onPress={plusstate}>
            <Text style={styles.btnText}>state+</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallButton} onPress={moinslevel}>
            <Text style={styles.btnText}>level-</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallButton} onPress={pluslevel}>
            <Text style={styles.btnText}>level+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.overlay}>
          <View style={styles.container}>
            <View style={styles.content}>{toDisp}</View>
            <View style={{ alignItems: "center", marginBottom: 10 }}>
              <Text style={{ color: "white" }}>
                numLevel: {numLevel} / total: {subLevels.length}
              </Text>
            </View>
            <View style={styles.progree}>
              <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
                <ProgressBarComp count={numLevel} total={subLevels.length} />
              </View>
            </View>
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
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
  testHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc", // bande grise de test
    paddingVertical: 8,
    flexWrap: "wrap",
  },
  smallButton: {
    backgroundColor: "black",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginHorizontal: 6,
    marginVertical: 4,
  },
  btnText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // fond sombre semi-transparent
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  progress: {
    width: "100%",
    height: 10, // fixe visuellement la hauteur correcte
    borderRadius: 5,
  },
});
