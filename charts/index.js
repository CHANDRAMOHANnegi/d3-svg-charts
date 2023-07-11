import { View, Text } from "react-native";
import React from "react";
import DecoratorExample from "./line-chart/chart";
import BarChart from "./bar-chart/chart";
import RevolutChart from "./revolut-chart/chart";
import BasicChart from "./basic-chart/chart";

export default function index() {
  return (
    <>
      {/* <DecoratorExample /> */}
      {/* <RevolutChart /> */}
      {/* <BarChart /> */}
      <BasicChart />
    </>
  );
}
