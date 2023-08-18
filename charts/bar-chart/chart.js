import React from "react";
import { BarChart as BC } from "react-native-svg-charts";
import { CustomGrid } from "../components/grid";
import { CustomGradient } from "../components/gradient";

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
      <CustomGrid />
      <CustomGradient />
    </BC>
  );
}

export default BarChart;
