import { View, Text } from "react-native";
import React from "react";
import DecoratorExample from "./line-chart/chart";
import BarChart from "./bar-chart/chart";

export default function index() {
  return (
    <>
      <DecoratorExample />
      <BarChart />
    </>
  );
}
