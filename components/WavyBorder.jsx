/*
import React, { useEffect } from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withRepeat,
} from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function WavyBorder() {
  const wavePhase = useSharedValue(0);

  useEffect(() => {
    wavePhase.value = withRepeat(
      withTiming(2 * Math.PI, { duration: 2000 }),
      -1,
      false
    );
  }, []);

  const animatedProps = useAnimatedProps(() => {
    const width = 300;
    const height = 40;
    const amplitude = 10;
    const frequency = 2;
    const phase = wavePhase.value;
    const step = 5;
    let path = `M0 ${height / 2}`;
    for (let x = 0; x <= width; x += step) {
      const y =
        height / 2 +
        amplitude * Math.sin((x / width) * frequency * 2 * Math.PI + phase);
      path += ` L${x} ${y}`;
    }

    return { d: path };
  });

  return (
    <View style={{ height: 100, justifyContent: "flex-end" }}>
      <Svg height="40" width="300">
        <AnimatedPath
          animatedProps={animatedProps}
          fill="none"
          stroke="blue"
          strokeWidth="3"
        />
      </Svg>
    </View>
  );
}

*/

import React, { useEffect } from "react";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withRepeat,
} from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function WavyBorder({ width = 300 }) {
  const wavePhase = useSharedValue(0);

  useEffect(() => {
    wavePhase.value = withRepeat(
      withTiming(2 * Math.PI, { duration: 2000 }),
      -1,
      false
    );
  }, []);

  const animatedProps = useAnimatedProps(() => {
    const height = 40;
    const amplitude = 10;
    const frequency = 2;
    const phase = wavePhase.value;
    const step = 5;
    let path = `M0 ${height / 2}`;
    for (let x = 0; x <= width; x += step) {
      const y =
        height / 2 +
        amplitude * Math.sin((x / width) * frequency * 2 * Math.PI + phase);
      path += ` L${x} ${y}`;
    }

    return { d: path };
  });

  return (
    <Svg height="40" width={width}>
      <AnimatedPath
        animatedProps={animatedProps}
        fill="none"
        stroke="#BDA1FF"
        strokeWidth="2"
      />
    </Svg>
  );
}
