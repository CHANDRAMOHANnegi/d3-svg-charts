import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Chart from './src/chart';
import AreaChartExample from './src/area-chart';
import BarChart from './src/bar-chart/bar-chart';
import { Circle } from './src/svg-example/circle';

export default function App() {
  console.log('=-=--');
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      {/* <Chart /> */}
      {/* <AreaChartExample /> */}
      <BarChart />
      <Circle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ß',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
