import React from "react";
import { BarChart as BC, Grid } from "react-native-svg-charts";
import Gradient from "../../rn-svg/components/Gradient";

const DATA = [
  {
    value: 332646444,
    timeInterval: "Default Department",
  },
];

function BarChart() {
  const data = [50, 10, 40];

  return (
    <BC
      style={{ height: 200 }}
      data={data}
      contentInset={{ top: 20, bottom: 20 }}
      svg={{
        strokeWidth: 2,
        fill: "url(#gradient)",
      }}
    >
      <Grid />
      <Gradient />
    </BC>
  );
}

export default BarChart;
