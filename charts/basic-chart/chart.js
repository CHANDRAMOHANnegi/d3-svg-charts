// @flow
import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Animated,
  TextInput,
} from "react-native";
import { Svg, Path, Defs, LinearGradient, Stop } from "react-native-svg";
import * as path from "svg-path-properties";
import * as shape from "d3-shape";

import { scaleTime, scaleLinear, scaleQuantile } from "d3-scale";
import { XAxis, YAxis } from "react-native-svg-charts";
import format from "date-fns/format";

const d3 = {
  shape,
};

const height = 200;
const { width } = Dimensions.get("window");
const verticalPadding = 5;
const cursorRadius = 10;
const labelWidth = 100;

const data = [
  { x: new Date(2018, 9, 1), y: 0 },
  { x: new Date(2018, 9, 16), y: 0 },
  { x: new Date(2018, 9, 17), y: 200 },
  { x: new Date(2018, 10, 1), y: 200 },
  { x: new Date(2018, 10, 2), y: 300 },
  { x: new Date(2018, 10, 5), y: 300 },
];

const scaleX = scaleTime()
  .domain([new Date(2018, 9, 1), new Date(2018, 10, 5)])
  .range([0, width]);

const scaleY = scaleLinear()
  .domain([0, 300])
  .range([height - verticalPadding, verticalPadding]);

const scaleLabel = scaleQuantile().domain([0, 300]).range([0, 200, 300]);

const line = d3.shape
  .line()
  .x((d) => scaleX(d.x))
  .y((d) => scaleY(d.y))
  .curve(d3.shape.curveBasis)(data);

const properties = path.svgPathProperties(line);
const lineLength = properties.getTotalLength();

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.container}>
          <YAxis
            // style={{ height: "100%", x: 0 }}
            scale={scaleLinear}
            data={data}
            numberOfTicks={5}
            yAccessor={({ item, index }) => item.y}
            svg={{
              fill: "black",
              fontSize: 18,
            }}
            formatLabel={(value, index) => {
              console.log(value);
              return value;
            }}
          />
          <Svg {...{ width, height }}>
            <Defs>
              <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient">
                <Stop stopColor="#CDE3F8" offset="0%" />
                <Stop stopColor="#eef6fd" offset="80%" />
                <Stop stopColor="#FEFFFF" offset="100%" />
              </LinearGradient>
            </Defs>
            <Path
              d={line}
              fill="transparent"
              stroke="#367be2"
              strokeWidth={5}
            />
            <Path
              d={`${line} L ${width} ${height} L 0 ${height}`}
              fill="url(#gradient)"
            />
          </Svg>
          {/* <View style={styles.line} /> */}
        </View>
        <XAxis
          contentInset={{ left: 10, right: 10 }}
          scale={scaleTime}
          data={data}
          numberOfTicks={5}
          xAccessor={({ item }) => item.x}
          svg={{
            fill: "black",
            fontSize: 18,
            // fontWeight: "bold",
            // rotation: 20,
            // originY: 30,
            // y: 5,
          }}
          formatLabel={(value, index) => {
            console.log(value);
            return new Date(value).getDate();
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    marginTop: 60,
    height,
    width,
    flexDirection: "row",
  },
  line: {
    borderBottomWidth: 1,
    borderColor: "black",
  },
  cursor: {
    width: cursorRadius * 2,
    height: cursorRadius * 2,
    borderRadius: cursorRadius,
    borderColor: "#367be2",
    borderWidth: 3,
    backgroundColor: "white",
  },
  label: {
    position: "absolute",
    top: -45,
    left: 0,
    backgroundColor: "lightgray",
    width: labelWidth,
  },
});
