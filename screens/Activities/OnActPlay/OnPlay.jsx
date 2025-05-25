import React, { useState, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import InstructionCard from "../../../components/InstructionCard";
import activities from "../../../data/activities_sample.json";

export default function OnPlay(props) {
  const [playing, setPlaying] = useState(false);
  const subLevels = activities?.levels?.[0]?.subLevels || [];
  const subLevel = subLevels[props.numLevel] || {};

  const extractYouTubeID = (url) => {
    try {
      return new URL(url).searchParams.get("v");
    } catch {
      return null;
    }
  };

  const videoId = extractYouTubeID(subLevel.mediaUrl);

  const onStateChange = useCallback(
    (state) => {
      if (state === "ended") {
        setPlaying(false);
        if (props.onDone && typeof props.onDone === "function") {
          props.onDone();
        }
      }
    },
    [props.onDone]
  );

  return (
    <View style={styles.container}>
      {videoId && (
        <YoutubePlayer
          height={230}
          play={playing}
          videoId={videoId}
          onChangeState={onStateChange}
          initialPlayerParams={{
            modestbranding: true,
            rel: 0,
            controls: 1,
          }}
        />
      )}

      <View style={styles.ins}>
        <InstructionCard
          timing={subLevel.timing}
          title1={activities.title}
          title2={activities.levels[0].title}
          title3={subLevel.title}
          desc={subLevel.description}
          tip={subLevel.tipOfThePro}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ins: {
    marginTop: 70,
    marginBottom: 70,
  },
  container: {
    flex: 1,
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  btn: {
    backgroundColor: "black",
    width: 80,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
