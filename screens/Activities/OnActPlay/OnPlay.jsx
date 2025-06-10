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
import { LinearGradient } from "expo-linear-gradient";

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

  const toggleTimer = () => setIsRunning((prev) => !prev);
  const onVideoEnd = useCallback(() => setPlaying(false), []);
  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <LinearGradient
      colors={["#FFFFFF", "#a394d7", "#FFFFFF"]}
      style={styles.safe}
    >
      <SafeAreaView style={{ flex: 1 }}>
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
              <Text style={styles.timerLabel}>Timer</Text>
              <AnimatedCircularProgress
                size={90}
                width={8}
                fill={(secondsLeft / (timing * 60)) * 100}
                tintColor="#facc15"
                backgroundColor="#e5e7eb"
                duration={1000}
                rotation={0}
                style={{ marginBottom: 10 }}
              >
                {() => (
                  <Text style={styles.timeCount}>
                    {formatTime(secondsLeft)}
                  </Text>
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
              <Ionicons name="logo-youtube" size={40} color="#1f2937" />
            )}
          </View>

          <View style={styles.tipBox}>
            <Text style={styles.tipTitle}>Tip of the Pro</Text>
            <Text style={styles.tipText}>{tipOfThePro}</Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainCard: {
    width: "60%",
    backgroundColor: "#F5F5F5",

    padding: 16,
    borderRadius: 24,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
    color: "#1f2937",
  },
  challengeText: {
    fontSize: 13,
    textAlign: "center",
    color: "#4b5563",
    lineHeight: 18,
  },
  timerCard: {
    width: 110,
    height: 180,
    margin: "auto",
    // backgroundColor: "#FCEACE",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  timerLabel: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
    color: "#1f2937",
  },
  timerText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
  },
  timeCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  videoCard: {
    width: "100%",
    height: 220,
    backgroundColor: "transparent",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  tipBox: {
    padding: 16,
    backgroundColor: "#EEEEEE",
    borderRadius: 16,

    marginTop: 10,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "blck",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tipText: {
    fontSize: 15,
    color: "black",
    textAlign: "center",
    fontStyle: "italic",
  },
});
