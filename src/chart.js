import React from 'react';
import { BarChart, XAxis, Grid, YAxis } from 'react-native-svg-charts';
import Svg, { G, Path, Line, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import {
  scaleBand,
  scaleLinear
} from 'd3-scale';
import * as d3Array from "d3-array";
import PropTypes from 'prop-types';
import _ from "lodash";
import { getThreatsAxis, bytesToSize, convertNumber, getChartWidth, reverseArr, generateBarPath } from "./helpers/helper";

const props = {
  showBytesInLabel: true,
  rotateXAxis: true,
  showTooltip: false,
  data: [
    {
      value: 332646444,
      timeInterval: 'Default Department',
    },
  ],
  inverseColor: false,
  splitXAxisLabel: false,
  colors: null,
  splitXAxisSeparator: '-',
  showAlternateValues: false,
  tooltip: {},
};


const CHART = {
  HEIGHT: 260,
  MIN_WIDTH: 280,
  YAXIS_WIDTH: 50,
  XAXIS_MIN_HEIGHT: 25,
  XAXIS_MAX_HEIGHT: 75,
  BAR_RADIUS: 5,
  BAR_WIDTH: 28,
  BAR_MAX_WIDTH: 32,
  PADDING: 8
};

function normalizeData(props) {
  let _props = {},
    formatter = !!props.showBytesInLabel ? bytesToSize : convertNumber;
  if (!!props.data && !!props.data.length) {
    let d = getThreatsAxis(props.data, 'value', formatter);
    _props = {
      yAxisWidth: getChartWidth(d.axisArr, 8),
      xAxisArr: _.map(props.data, 'timeInterval'),
      yAxisArr: d.axisArr.reverse(),
      yAxisMaxValue: d.maxValue
    };
  }

  return _props;
};

export default function Chart() {
  const _props = normalizeData(props);

  const [state, setstate] = React.useState({
    ...props,
    width: CHART.MIN_WIDTH,
    height: CHART.HEIGHT,
    ..._props,
  });

  let { width, height, data, yAxisMaxValue, yAxisWidth, inverseColor, colors,
    xAxisArr, yAxisArr, showBytesInLabel, splitXAxisLabel, splitXAxisSeparator, rotateXAxis,
    showTooltip, showAlternateValues, tooltip
  } = state;

  let labelColor = inverseColor ? 'rgba(119,121,124,1)' : 'rgba(255,255,255,1)',
    gridColor = inverseColor ? 'rgba(119,121,124,0.2)' : 'rgba(0,182,255,0.5)',
    tooltipStrokeColor = inverseColor ? 'rgba(119,121,124,0.5)' : 'rgba(0,182,255,1)',
    rectColor = inverseColor ? 'rgba(44,56,188,1)' : 'rgba(118,221,251,1)',
    gradientColors = ['rgba(44,56,188,1)', 'rgba(0,118,190,1)'],
    tooltipLabelColor = inverseColor ? 'rgba(0,118,190,1)' : 'rgba(255,255,255,1)',
    formatter = bytesToSize, isGradient = false,
    xAxisStartValues, xAxisEndValues, dashArray,
    barMaxWidth = data.length < 3 ? CHART.BAR_MAX_WIDTH : CHART.BAR_WIDTH,
    charMaxWidth = data.length <= 3 ? data.length * (CHART.BAR_MAX_WIDTH * 2) : width;

  const Gradient = () => (
    <Defs key={'gradient'}>
      <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
        <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} />
        <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'} />
      </LinearGradient>
    </Defs>
  );

  const _onLayout = (event) => {
    const { nativeEvent: { layout: { height, width } } } = event;
    setstate({ ...state, width });
  }

  if (!!colors) {
    if (!!colors.isGradient) {
      isGradient = true;
      gradientColors = colors.bar;
    } else {
      rectColor = colors.bar;
    }
  }

  if (splitXAxisLabel) {
    xAxisStartValues = xAxisArr.map(xValue => {
      return xValue.substring(0, xValue.indexOf(splitXAxisSeparator)).trim();
    });
    xAxisEndValues = xAxisArr.map(xValue => {
      return xValue.substring(xValue.indexOf(splitXAxisSeparator) + 1).trim();
    });
    if (!!(splitXAxisSeparator.trim())) {
      dashArray = xAxisArr.map(xValue => {
        return "-";
      });
    }
  } else {
    xAxisStartValues = xAxisArr;
  }

  const yScale = scaleLinear()
    .domain([0, yAxisMaxValue])
    .range([0, height]);
  const xScale = scaleBand()
    .domain(xAxisArr)
    .range([0, charMaxWidth])
    .paddingInner(0.35)
    .paddingOuter(0.2);

  const BarPath = (props) => {
    let xV = xAxisArr[props.index],
      x = xScale(xV),
      bW = barMaxWidth,
      barHeight = yScale(props.value),
      barWidth = xScale.bandwidth(),
      tpOpacity = inverseColor ? 0.5 : 0.5,
      rd = CHART.BAR_RADIUS;

    if (barWidth > bW) {
      x = x + ((barWidth - bW) / 2);
      barWidth = bW;
    }
    if (barHeight <= rd) {
      barHeight = rd;
      rd = 0;
    }
    return (
      <G>
        <Path
          d={generateBarPath(x, height - barHeight, barWidth, barHeight, props.value, rd)}
          fill={(inverseColor ? 'url(#gradient)' : rectColor)}
          fillOpacity={showTooltip ? (
            tooltip.status ? (
              (tooltip.index === props.index ? 1 : tpOpacity)
            ) : 1
          ) : 1}
        />
        {showTooltip && <Path
          d={generateBarPath(x, 0, barWidth, height, yAxisMaxValue, 0)}
          stroke={tooltipStrokeColor}

          strokeDasharray={5}
          strokeOpacity={(tooltip.status && (tooltip.index === props.index)) ? 1 : 0}
          fill={'transparent'}
          // fill={(tooltip.status && (tooltip.index === props.index)) ? 'transparent' : (inverseColor ? 'url(#gradient)' : rectColor)}
          // fillOpacity={(tooltip.status && (tooltip.index === props.index)) ? 1 : 0.05}
          onPress={() =>
            this._onPress({
              ...props,
              x,
              barWidth
            })
          }
        />}
      </G>
    );
  };

  const XAxisWrapper = (props) => {
    const { d, i } = props;
    let svgStyle, axisHeight,
      formatLabel = (value, index) => {
        if ((!!showAlternateValues && ((index) % 2) !== 0) || (showTooltip && tooltip.status && !!tooltip.data && index === tooltip.data.index)) {
          return "";
        }
        return (d[index] === "") ? null : d[index]
      };
    if (!splitXAxisLabel && rotateXAxis) {
      axisHeight = 55;
      svgStyle = {
        textAnchor: 'end',
        rotation: '-45'
      };
      formatLabel = (value, index) => {
        if ((!!showAlternateValues && ((index) % 2) !== 0) || (showTooltip && tooltip.status && !!tooltip.data && index === tooltip.data.index)) {
          return "";
        }
        return (d[index] === "") ? null : (d[index].length > 10 ? d[index].slice(0, 10) + ".." : "     " + d[index]);
      };
    }

    return (
      <XAxis
        style={{ marginTop: i === 0 ? 0 : 0, minHeight: axisHeight }}
        key={'vb-xaxis-key' + i}
        data={d}
        scale={scaleBand}
        spacingInner={0.35}
        spacingOuter={0.2}
        formatLabel={formatLabel}
        contentInset={{ top: 0, bottom: 0, left: yAxisWidth + 10, right: (width - charMaxWidth) }}
        svg={{
          fontSize: 11,
          fill: labelColor,
          textAnchor: 'middle',
          ...svgStyle
        }}
      />
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <View style={styles.topContainer}>
          <View
            style={[
              styles.chartYAxisContainer,
              { width: yAxisWidth + 5, marginRight: 5, backgroundColor: 'red' },
            ]}>
            <YAxis
              style={{ flex: 1 }}
              svg={{ fill: labelColor, textAnchor: 'end', x: yAxisWidth + 5 }}
              data={data}
              scale={scaleLinear}
              yAccessor={({ item, index }) => item.value}
              formatLabel={(value, index) => formatter(value, '', 1)}
              gridMin={0}
              gridMax={yAxisMaxValue}
              min={0}
              max={yAxisMaxValue}
              yMax={yAxisMaxValue}
              contentInset={{ top: CHART.PADDING, bottom: CHART.PADDING }}
              numberOfTicks={yAxisArr.length}
            />
          </View>
          <View style={[styles.chartWidget]} onLayout={event => _onLayout(event)}>
            <Svg style={{ width, height }}>
              <G>
                <Defs key={'gradient'}>
                  <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
                    <Stop offset={'0%'} stopColor={gradientColors[0]} />
                    <Stop offset={'100%'} stopColor={gradientColors[1]} />
                  </LinearGradient>
                </Defs>
                <Grid />
                {
                  data.map((d, i) => {
                    return (
                      <BarPath key={'vbars-key' + i} {...d} index={i} />
                    );
                  })
                }
              </G>
            </Svg>
          </View>
        </View>
        <View style={[styles.chartXAxisContainer]}>
          <XAxisWrapper d={xAxisStartValues} i={0} />
          {/* {splitXAxisLabel && <XAxisWrapper d={dashArray} i={1} />} */}
          {/* {splitXAxisLabel && <XAxisWrapper d={xAxisEndValues} i={2} />} */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    width: '100%',
  },
  chartTooltipContainer: {
    minHeight: 14,
    position: 'relative',
  },
  tooltipText: {
    fontSize: 11,
    letterSpacing: 0.5,
    lineHeight: 13,
    paddingBottom: 0.5,
  },
  chartContainer: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    minHeight: CHART.HEIGHT,
    flexDirection: 'row',
  },
  chartWidget: {
    flex: 1,
    marginVertical: CHART.PADDING,
  },
  chartYAxisContainer: {
    width: CHART.YAXIS_WIDTH,
  },
  chartXAxisContainer: {
    backgroundColor: 'blue'
  },
  legendsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 0,
    justifyContent: 'space-evenly',
  },
  legendTextContainer: {
    marginHorizontal: 10,
    marginBottom: 5,
    width: 'auto',
    height: 16,
  },
  legendTextIcon: {
    fontSize: 11,
  },
  legendText: {
    fontSize: 12,
  },
});
