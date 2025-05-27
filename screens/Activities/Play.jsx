import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import OnPlay from "./OnActPlay/OnPlay";
import OnDone from "./OnActPlay/OnDone";
import OnProgress from "./OnActPlay/OnProgress";

import ProgressBarComp from "../../components/ProgressBar";
import activities from "../../data/activities_sample.json";
import { addUserToStore } from "../../reducers/userSlice";

export default function Play({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user?.value?.username ?? "Invité");
  const sportPlayed = useSelector(
    (state) => state.user?.value?.sportPlayed ?? "Loading"
  );
  console.log(user);
  const [levelStatus, setLevelStatus] = useState(0);
  const [numLevel, setNumLevel] = useState(0);
  const [bigLevel, setBigLevel] = useState(0);

  const subLevels = activities?.levels?.[0]?.subLevels[numLevel] || [];
  const tabLevel = ["onPlay", "onDone", "onProgress"];
  const totalLevels = activities.levels[bigLevel].subLevels.length;
  const levelxp = subLevels.xp;
  const timing = subLevels.timing;

  const pourcent = Math.floor((100 * numLevel) / totalLevels);

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
    toDisp = (
      <OnDone
        user={user}
        timing={timing}
        xp={levelxp}
        onPress={() => moinstate()}
        sport={sportPlayed}
      />
    );
  } else if (tabLevel[levelStatus] === "onProgress") {
    toDisp = (
      <OnProgress
        total={totalLevels}
        level={numLevel}
        xp={levelxp}
        name={subLevels.title}
        levelplus={activities.levels[bigLevel + 1].title}
        levelmoins={activities.levels[bigLevel].title}
        pourcent={pourcent}
        onPress={() => moinstate()}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.content}>{toDisp}</View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  testHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    top: -30,
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
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  levelInfo: {
    alignItems: "center",
    marginBottom: 10,
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
