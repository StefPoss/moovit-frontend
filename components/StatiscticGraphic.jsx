
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";


export default function StatiscticGraphic(props) {
  

  const data = {
    labels: ['Temps de jeu', 'Sessions', 'XP'],
    datasets: [
      {
        data: [props.playTime, props.sessions, props.xp],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: 'black',
    backgroundGradientTo: 'black',
   
    decimalPlaces: 0,
    color: () => `rgb(255, 255, 255)`, // barres blanches
  labelColor: () => `rgb(255, 255, 255)`, // labels en blanc

    propsForBackgroundLines: {
      strokeWidth: 0,
    },
  };

  return (
    <View style={styles.container}>
      <BarChart
        style={styles.barChart}
        data={data}
        width={Dimensions.get("window").width * 0.9} //pour mettre la largeur à 90% et que ça soit responsive
        height={170}
        withVerticalLabels={true}
        withHorizontalLabels={false}
        withInnerLines={false}
        showValuesOnTopOfBars={true}
        fromZero={true}
        chartConfig={chartConfig}
        
       
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: 
  {
   
    
    
  
  },
  barChart: 
  {
    borderRadius: 15,
    marginRight: 5,

  },
});


