import React from "react";
import { Circle, Path } from "react-native-svg";

export function CustomDecorator({ x, y, data }) {
  // console.log(x(data[0].date), y, data);
  return data.map((value, index) => {
    const X = x(value.date);
    const Y = y(value.value);

    console.log(index, X, Y, value);

    return (
      <>
        <Circle
          key={index}
          cx={x(value.date)}
          cy={y(0)}
          // scale={scale.scaleTime}
          r={4} ///
          stroke={"red"}
          fill={"white"}
        />
        <Circle
          key={index}
          cx={x(value.date)}
          cy={y(value.value)}
          // scale={scale.scaleTime}
          r={4} ///
          stroke={"green"}
          fill={"yellow"}
        />
      </>
    );
  });
}
