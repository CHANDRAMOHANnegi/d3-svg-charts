import React from "react";
import { G, Line } from "react-native-svg";

export function CustomGrid(props) {
  const { x, y, ticks, data } = props;
  console.log(ticks);
  return (
    <G>
      {
        // Horizontal grid
        ticks.map((tick) => (
          <Line
            key={tick}
            x1="0%"
            x2="100%"
            y1={y(tick)}
            y2={y(tick)}
            stroke="blue"
          />
        ))
      }
      {
        // Vertical grid
        data.map((d, index) => {
          console.log({ d, index });
          return (
            <Line
              key={index.toString()}
              y1="0%"
              y2="100%"
              x1={x(index)}
              x2={x(index)}
              stroke="red"
            />
          );
        })
      }
    </G>
  );
}
