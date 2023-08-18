import React from "react";
import { Defs, LinearGradient, Stop, G } from "react-native-svg";

const G_C = ["rgba(44,56,188,1)", "rgba(0,118,190,1)"];

export function CustomGradient({ gradientColors = G_C }) {
  return (
    <G>
      <Defs key={"gradient"}>
        <LinearGradient
          id={"gradient"}
          x1={"0%"}
          y={"0%"}
          x2={"100%"}
          y2={"0%"}
        >
          <Stop offset={"0%"} stopColor={gradientColors[0]} />
          <Stop offset={"100%"} stopColor={gradientColors[1]} />
        </LinearGradient>
      </Defs>
    </G>
  );
}
