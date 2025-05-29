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
import { AnimatedCircularProgress } from "react-native-circular-progress";
import activities from "../../../data/activities_sample.json";

export default function OnPlay({ infos, title }) {
  const { image, mediaUrl, description, tipOfThePro, timing } = infos;

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
        <View style={styles.headerRow}>
          <View style={styles.mainCard}>
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.challengeText}>{description}</Text>
          </View>

          <TouchableOpacity style={styles.timerCard} onPress={toggleTimer}>
            <AnimatedCircularProgress
              size={90}
              width={8}
              fill={(secondsLeft / (timing * 60)) * 100}
              tintColor="#FF9900"
              backgroundColor="#fff"
              duration={1000}
              rotation={0}
              style={{ marginBottom: 10 }}
            >
              {() => (
                <Text style={styles.timeCount}>{formatTime(secondsLeft)}</Text>
              )}
            </AnimatedCircularProgress>
            <Text style={styles.timerText}>
              {isRunning ? "Pause" : "Start"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.videoCard}>
          {videoId ? (
            <YoutubePlayer
              height={200}
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
  headerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  mainCard: {
    width: "60%",
    backgroundColor: "#f7f6ff",
    padding: 14,
    borderRadius: 24,
    marginRight: 12,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
  },
  challengeText: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
  timerCard: {
    width: 110,
    height: 150,

    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: "auto",
    padding: "auto",
  },
  timerText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  timeCount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  videoCard: {
    width: "100%",
    height: 300,
    backgroundColor: "#eee",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 20,
  },
  tipBox: {
    padding: 14,
    borderRadius: 16,
  },
  tipText: {
    fontSize: 15,
    color: "#222",
    textAlign: "center",
  },
});
