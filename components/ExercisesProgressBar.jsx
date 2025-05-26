import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';





export default function ExercisesProgressBar(props) {
  return (
    <View style={styles.container}>

<AnimatedCircularProgress
        size={70}
        width={8}
        fill={props.value}        // Ici, 90%
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
        rotation={0}     // Angle de départ
        lineCap="round"
      >
        {
          (fill) => (
            <Text style={styles.progressText}>
              { `${Math.round(fill)}%` }
            </Text>
          )
        }
      </AnimatedCircularProgress>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  
  },
});