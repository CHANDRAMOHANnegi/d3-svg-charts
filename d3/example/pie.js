import { View, Text } from "react-native";
import React from "react";
import * as shape from "d3-shape";
import { Svg, Path, G, Defs, LinearGradient, Stop } from "react-native-svg";
import Gradient from "../components/Gradient";
import SvgContainer from "../../components/svg-container";
const data = [
  { number: 8, name: "Fun activities" },
  { number: 7, name: "Dog" },
  { number: 16, name: "Food" },
  { number: 23, name: "Car" },
  { number: 42, name: "Rent" },
  { number: 40, name: "Misc" },
];
const colors = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
];
export default function Pie() {

  const arcs = shape.pie().value((a) => a.number)(data);

  const pieSlices = arcs.map((slice, index) => ({
    ...data[index],
    ...slice,
    path: shape
      .arc()
      .outerRadius(100 + index * 5)
      .innerRadius(50)(slice),
  }));

  console.log("=-=-=--", pieSlices);

  const gradientColors = ["rgba(44,56,188,1)", "rgba(0,118,190,1)"];

  return (
    <SvgContainer>
      {pieSlices.map((slice, i) => (
        <>
          <Path
            fill={colors[i]}
            stroke={gradientColors[1]}
            key={i}
            d={slice.path}
            strokeWidth="2"
          />
        </>
      ))}
    </SvgContainer>
  );
}
