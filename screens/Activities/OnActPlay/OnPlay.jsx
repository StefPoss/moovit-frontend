import React, { useState, useCallback } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import InstructionCard from "../../../components/InstructionCard";
import activities from "../../../data/activities_sample.json";

export default function OnPlay({ numLevel, onDone }) {
  const [playing, setPlaying] = useState(false);

  const subLevels = activities?.levels?.[0]?.subLevels || [];
  const subLevel = subLevels[numLevel] || {};
  const {
    image: imgback,
    mediaUrl,
    timing,
    title,
    description,
    tipOfThePro,
  } = subLevel;

  const extractYouTubeID = (url) => {
    try {
      return new URL(url).searchParams.get("v");
    } catch {
      return null;
    }
  };

  const videoId = extractYouTubeID(mediaUrl);

  const onStateChange = useCallback(
    (state) => {
      if (state === "ended") {
        setPlaying(false);
        if (typeof onDone === "function") {
          onDone();
        }
      }
    },
    [onDone]
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
            timing={timing}
            title1={activities.title}
            title2={activities.levels[0].title}
            title3={title}
            desc={description}
            tip={tipOfThePro}
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
