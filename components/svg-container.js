import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Svg, Path, G, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function SvgContainer(props) {
  const [dimensions, setDimensions] = React.useState({
    width: 0,
    height: 0,
  });
  const _onLayout = (event) => {
    const {
      nativeEvent: {
        layout: { height, width },
      },
    } = event;
    setDimensions({ height, width });
  };

  const { width, height } = dimensions;
  return (
    <View
      style={{ marginTop: 20, height: 500 }}
      onLayout={(event) => _onLayout(event)}
    >
      <Svg style={{ width: 500, height: 500 }}>
        <G x={width / 2} y={height / 2}>
          {props.children}
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({});
