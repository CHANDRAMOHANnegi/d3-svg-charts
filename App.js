import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Chart from "./charts";
import RnSVG from "./rn-svg";

export default function App() {
  console.log("=-=--");
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <StatusBar style="auto" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flex: 1,
          // alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RnSVG />
        <Chart />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    // alignItems: "center",
    justifyContent: "center",
  },
});
