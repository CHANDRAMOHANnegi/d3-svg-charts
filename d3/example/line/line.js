import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as shape from "d3-shape";
import { Path, Rect, Line as L } from "react-native-svg";
import SvgContainer from "../../../components/svg-container";
import * as d3array from "d3-array";

const data = [
  { date: 10, value: 93.24 },
  { date: 20, value: 95.35 },
  { date: 30, value: 98.84 },
  { date: 50, value: 99.92 },
  { date: 70, value: 99.8 },
  { date: 110, value: 99.47 },
];

export default function Line() {
  const line = shape
    .line()
    .x((d) => d.date)
    .y((d) => d.value + Math.random() * 100)(data);

  console.log("=-=-=-=", line);

  let spiral = Array.from({ length: 76 }, (_, i) => [
    (Math.PI / 3) * i, // angle (in radians)
    2 * i, // radius
  ]);

  const spiral2 = () => {
    const length = 76,
      spiral = shape
        .lineRadial()
        .angle((d, i) => (Math.PI / 4) * i) // d is empty (and ignored), i is the index
        .radius((d, i) => (length - i) * 2);

    return spiral({ length });
  };

  const path = shape.lineRadial()(spiral);

  const randomArr = Array.from({ length: 10 }, () => Math.random() * 100);
  const cumsum = d3array.cumsum({ length: 10 }, () => Math.random() - 0.5);
  const linearPath = shape
    .line()
    .x((x) => x * 100)
    .y((y) => y * 100)(cumsum);
  console.log(cumsum, randomArr);

  return (
    <SvgContainer>
      <Path d={line} stroke={"black"} />
      {/* <Rect x="11" y="10" width="10" height="1" fill="#FED049" /> */}
      {randomArr.map((e, i) => (
        <>
          <L x1={"-10"} y1={10} x2={e} y2={50} stroke="red" strokeWidth="2" />
        </>
      ))}
    </SvgContainer>
  );
}

const styles = StyleSheet.create({});
