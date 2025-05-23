import activities from "../../data/activities_sample.json";
import react from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Button,
  Alert,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import ActivityCard from "../../components/ActivityCard";
import CardComp from "../../components/Card";

export default function OnPlay({ navigation }) {
  const [playing, setPlaying] = useState(false);
  const [numLevel, setNumLevel] = useState(0);

  const extractYouTubeID = (url) => new URL(url).searchParams.get("v");
  const level = activities.levels[0].subLevels[numLevel];
  const videoUrl = level.mediaUrl;
  const videoId = extractYouTubeID(videoUrl);
  const title = level.title;

  console.log(title);

  console.log("videoId:", videoId);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={60}
      >
        <View style={{ padding: 16 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              style={styles.btn}
              title="Précédent"
              onPress={() => setNumLevel(numLevel - 1)}
            />
            <TouchableOpacity
              style={styles.btn}
              title="Suivant"
              onPress={() => setNumLevel(numLevel + 1)}
            />
          </View>

          <YoutubePlayer
            height={300}
            play={playing}
            videoId={videoId}
            onChangeState={(state) => console.log(state)}
          />
          <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
        </View>
        <View>
          <ActivityCard text={"caca"} />
          <CardComp color={"red"} text={"Bonjour"} height={100} width={100} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "black",
    width: 50,
    height: 30,
    top: -40,
  },
});
