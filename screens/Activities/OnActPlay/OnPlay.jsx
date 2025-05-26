import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import InstructionCard from "../../../components/InstructionCard";
import activities from "../../../data/activities_sample.json";

export default function OnPlay(props) {
  const [playing, setPlaying] = useState(false);
  const subLevels = activities?.levels?.[0]?.subLevels || [];
  const subLevel = subLevels[props.numLevel] || {};
  const imgback = subLevel.image;

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
    <ImageBackground
      source={{ uri: imgback }}
      style={styles.background}
      resizeMode="cover"
    >
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  ins: {
    marginTop: 70,
    marginBottom: 70,
  },
});
