import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import AreaChartExample from './src/area-chart';
// import BarChart from './src/bar-chart/bar-chart';
// import { Circle } from './src/svg-example/circle';
import Pie from './d3/example/pie';
import RnPath from './rn-svg/path';
import AnimatedPath from './rn-svg/animated-path';

export default function App() {
  console.log('=-=--');
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <StatusBar style="auto" />
      {/* <AreaChartExample /> */}
      {/* <BarChart /> */}
      {/* <Circle /> */}
      {/* <Pie /> */}
      {/* <AnimatedPath
        animate={true}
        animateDuration={1110}
        animationDuration={300}
        d={
          'M91.92388155425121,-91.92388155425114A130,130,0,0,1,130,5.773159728050814e-14L106,4.707345624410664e-14A106,106,0,0,0,74.95331880577406,-74.953318805774Z'
        }
        fill={'#8B1A4B'}
        stroke={'#8B1A4B'}
        strokeWidth={1}
      /> */}
      {/* <RnPath /> */}
      <AnimatedPath/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
