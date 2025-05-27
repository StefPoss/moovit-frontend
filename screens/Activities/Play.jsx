import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import OnPlay from "./OnActPlay/OnPlay";
import OnDone from "./OnActPlay/OnDone";
import OnProgress from "./OnActPlay/OnProgress";

import activities from "../../data/activities_sample.json";
import { addUserToStore } from "../../reducers/userSlice";
import Button from "../../components/Buttons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function Play({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      addUserToStore({
        token: "123abc",
        photoUrl: "https://example.com/photo.jpg",
        username: "Sami",
        admin: true,
        sportPlayed: "Padel",
        xp: "1000",
        level: "3",
      })
    );
  }, []);

  const user = useSelector((state) => state.user?.value?.username ?? "Invité");
  const sportPlayed = useSelector(
    (state) => state.user?.value?.sportPlayed ?? "Loading"
  );

  const [levelStatus, setLevelStatus] = useState(0);
  const [numLevel, setNumLevel] = useState(0);
  const [bigLevel, setBigLevel] = useState(0);

  const subLevels = activities?.levels?.[bigLevel]?.subLevels[numLevel] || {};
  const tabLevel = ["onPlay", "onDone", "onProgress"];
  const totalLevels = activities.levels[bigLevel].subLevels.length;
  const levelxp = subLevels.xp;
  const timing = subLevels.timing;
  const pourcent = Math.floor((100 * numLevel) / totalLevels);

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
      <OnPlay numLevel={numLevel} setNumLevel={setNumLevel} timing={timing} />
    );
  } else if (tabLevel[levelStatus] === "onDone") {
    toDisp = (
      <OnDone
        user={user}
        timing={timing * 3600}
        xp={levelxp}
        onPress={moinstate}
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
        levelplus={activities.levels[bigLevel + 1]?.title ?? "Niveau final"}
        levelmoins={activities.levels[bigLevel].title}
        pourcent={pourcent}
        onPress={moinstate}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => moinstate()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Button
          title="Continuer"
          onPress={plusstate}
          type="primary"
          style={styles.continueBtn}
        />
      </View>

      <View style={styles.container}>{toDisp}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F3F3F3",
    justifyContent: "center",
    alignItems: "center",
  },
  continueBtn: {
    width: 120,
  },
  container: {
    flex: 1,
  },
});
