import React from "react";
import { AreaChart, Grid } from "react-native-svg-charts";
import { Circle, Path } from "react-native-svg";
import * as shape from "d3-shape";
// import Gradient from "../../rn-svg/components/Gradient";
import { LinearGradient } from "react-native-svg";
import { Defs } from "react-native-svg";
import { Stop } from "react-native-svg";

class DecoratorExample extends React.PureComponent {
  render() {
    const data = [
      50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80,
    ];

    const Decorator = ({ x, y, data }) => {
      return data.map((value, index) => (
        <Circle
          key={index}
          cx={x(index)}
          cy={y(value)}
          r={4}
          stroke={"rgb(134, 65, 244)"}
          fill={"white"}
        />
      ));
    };

    const Line = ({ line }) => (
      <Path d={line} stroke={"rgba(134, 65, 244,0.3)"} fill={"none"} />
    );

    return (
      <AreaChart
        style={{ height: 200 }}
        data={data}
        svg={{ fill: "url(#gradient)" }}
        contentInset={{ top: 10, bottom: 30 }}
        // curve={shape.curveBasis}
      >
        <Grid />
        <Line />
        <Decorator />
        <Defs key={0}>
          <LinearGradient
            id={"gradient"}
            x1={"0%"}
            y1={"0%"}
            x2={"0%"}
            y2={"100%"}
          >
            <Stop
              offset={"0%"}
              stopColor={"rgb(134, 65, 244)"}
              stopOpacity={0.8}
            />
            <Stop
              offset={"100%"}
              stopColor={"rgb(11, 65, 111)"}
              stopOpacity={0.2}
            />
          </LinearGradient>
        </Defs>
      </AreaChart>
    );
  }
}

export default DecoratorExample;
