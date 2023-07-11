import * as d3 from "d3";
import { useState } from "react";
import { View, Text } from "react-native";

export default function App() {
  const [data, setData] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));

  console.log("===>]", data);

  function onMouseMove(event) {
    console.log(event);
    const [x, y] = d3.pointer(event);
    setData(data.slice(-200).concat(Math.atan2(x, y)));
  }

  return (
    <View onPointerMove={onMouseMove}>
      <Text>Hello</Text>
      {/* <LinePlot data={data} /> */}
    </View>
  );
}
