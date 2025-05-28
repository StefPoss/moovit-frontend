import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import OnPlay from "./OnActPlay/OnPlay";
import OnDone from "./OnActPlay/OnDone";
import OnProgress from "./OnActPlay/OnProgress";

import { addUserToStore } from "../../reducers/userSlice";
import Button from "../../components/Buttons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function Play({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const activity = useSelector((state) => state.activity.value);
  const dispatch = useDispatch();
  const tabLevel = ["onPlay", "onDone", "onProgress"];
  const [levelStatus, setLevelStatus] = useState(0);

  const plusstate = () => {
    if (levelStatus < tabLevel.length - 1) {
      setLevelStatus(levelStatus + 1);
    } else {
      navigation.navigate("Dashboard");
      setLevelStatus(0);
    }
  };
  const moinstate = () => {
    if (levelStatus > 0) {
      setLevelStatus(levelStatus - 1);
    }
  };
  const totalSubLevels = activity.length;
  let currentLevel = [user.currentLevelID, user.currentSubLevelID];
  let nextLevel = [];

  if (currentLevel[1] == totalSubLevels) {
    nextLevel = [currentLevel[0] + 1, 1];
    currentLevel[1] = 0;
    currentLevel[0] = currentLevel[0] + 1;
  } else {
    nextLevel = [currentLevel[0], currentLevel[1] + 1];
  }

  console.log("---" + currentLevel);
  console.log;

  const [level, setLevel] = useState(currentLevel[0]);
  const [subLevel, setSubLevel] = useState(currentLevel[1]);
  const subLevelInfos = activity[subLevel];

  const timing = subLevelInfos.timing;
  const levelxp = subLevelInfos.xp;
  const titleSubLevel = subLevelInfos.title;
  const pourcent = Math.floor((100 * subLevel) / totalSubLevels);

  useEffect(() => {
    setLevel(currentLevel[0]);
    setSubLevel(currentLevel[1]);
  }, [user.currentLevelID, user.currentSubLevelID]);
  console.log(nextLevel);
  let toDisp;
  if (tabLevel[levelStatus] === "onPlay") {
    toDisp = <OnPlay infos={subLevelInfos} />;
  } else if (tabLevel[levelStatus] === "onDone") {
    toDisp = (
      <OnDone
        user={user.username}
        timing={timing}
        xp={levelxp}
        onPress={moinstate}
        sport={"Padel"}
      />
    );
  } else if (tabLevel[levelStatus] === "onProgress") {
    toDisp = (
      <OnProgress
        total={totalSubLevels}
        level={level}
        xp={levelxp}
        name={titleSubLevel}
        pourcent={pourcent}
        onPress={moinstate}
        token={user.token}
        sport={"Padel"}
        xpUpdated={levelxp + user.xp}
        updatelvl={nextLevel}
        renit={() => setLevelStatus(0)}
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
