import React from "react";
import { AreaChart, Grid, XAxis } from "react-native-svg-charts";
import { Circle, Path } from "react-native-svg";
import * as scale from "d3-scale";
import Gradient from "../../rn-svg/components/Gradient";
import { setHours, format } from "date-fns";

const data = [
  {
    value: 50,
    date: setHours(new Date(2018, 0, 0), 6),
  },
  {
    value: 10,
    date: setHours(new Date(2018, 0, 0), 9),
  },
  {
    value: 150,
    date: setHours(new Date(2018, 0, 0), 15),
  },
  {
    value: 10,
    date: setHours(new Date(2018, 0, 0), 18),
  },
  {
    value: 100,
    date: setHours(new Date(2018, 0, 0), 21),
  },
  {
    value: 20,
    date: setHours(new Date(2018, 0, 0), 24),
  },
];

const Line = ({ line }) => <Path d={line} stroke={"red"} fill={"none"} />;

const Decorator = ({ x, y, data }) => {
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
};

class Chart extends React.PureComponent {
  render() {
    console.log("-=-=-=--datat===", data);
    return (
      <>
        <AreaChart
          style={{ height: 200 }}
          data={data}
          svg={{ fill: "url(#gradient)" }}
          contentInset={{ top: 10, bottom: 30 }}
          xAccessor={({ item }) => item.date}
          yAccessor={({ item }) => item.value}
          xScale={scale.scaleTime}
          // curve={shape.curveBasis}
        >
          <Grid />
          <Line />
          <Gradient
            gradientColors={[
              "rgba(134, 65, 244,0.3)",
              "rgba(134, 65, 244, 0.1)",
            ]}
          />
          <Decorator />
        </AreaChart>
        <XAxis
          data={data}
          svg={{
            fill: "black",
            fontSize: 8,
            fontWeight: "bold",
            rotation: 20,
            originY: 30,
            y: 5,
          }}
          xAccessor={({ item }) => item.date}
          scale={scale.scaleTime}
          numberOfTicks={6}
          style={{ marginHorizontal: -15, height: 20 }}
          contentInset={{ left: 10, right: 25 }}
          formatLabel={(value) => format(value, "HH:mm")}
        />
      </>
    );
  }
}

export default Chart;
