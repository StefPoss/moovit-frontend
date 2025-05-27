import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Ionicons } from "@expo/vector-icons";
import activities from "../../../data/activities_sample.json";

export default function OnPlay({ infos }) {
  const { image, title, mediaUrl, description, tipOfThePro, timing } = infos;

  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(timing * 60);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef(null);

  const extractYouTubeID = (url) => {
    try {
      return new URL(url).searchParams.get("v");
    } catch {
      return null;
    }
  };

  const videoId = extractYouTubeID(mediaUrl);

  useEffect(() => {
    setSecondsLeft(timing * 60);
  }, [timing]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const onVideoEnd = useCallback(() => {
    setPlaying(false);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.squareCard}>
            {videoId ? (
              <YoutubePlayer
                height={90}
                width={"100%"}
                videoId={videoId}
                play={playing}
                onChangeState={(state) => state === "ended" && onVideoEnd()}
                initialPlayerParams={{
                  modestbranding: true,
                  rel: 0,
                  controls: 1,
                }}
              />
            ) : (
              <Ionicons name="logo-youtube" size={40} color="black" />
            )}
          </View>

          <TouchableOpacity
            style={styles.squareCardtimer}
            onPress={toggleTimer}
          >
            <Text style={styles.timerText}>
              {isRunning ? "Pause" : "Timer"}
            </Text>
            <Text style={styles.timeCount}>{formatTime(secondsLeft)}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mainCard}>
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.challengeText}>{description}</Text>
        </View>

        <View style={styles.tipBox}>
          <Text style={styles.tipText}>{tipOfThePro}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F3F3F3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  squareCard: {
    backgroundColor: "#eee",
    width: "58%",
    height: 200,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  squareCardtimer: {
    backgroundColor: "#FCEACE",
    width: "38%",
    height: 200,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  timerText: {
    fontSize: 18,
    fontWeight: "500",
  },
  timeCount: {
    fontSize: 20,
    marginTop: 4,
    fontWeight: "bold",
  },
  mainCard: {
    backgroundColor: "#f7f6ff",
    padding: 20,
    borderRadius: 24,
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 260,
    borderRadius: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "lowercase",
  },
  challengeText: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  tipBox: {
    backgroundColor: "#cbc4e9",
    padding: 14,
    borderRadius: 20,
  },
  tipText: {
    fontSize: 15,
    color: "#222",
  },
});
