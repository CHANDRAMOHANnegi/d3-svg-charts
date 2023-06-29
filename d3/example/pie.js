import { View, Text } from 'react-native'
import React from 'react'
import * as shape from 'd3-shape'
import { Svg, Path, G, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function Pie() {

    const [dimensions, setDimensions] = React.useState({
        width: 0,
        height: 0
    })

    const { width, height } = dimensions

    const data = [
        { "number": 8, "name": 'Fun activities' },
        { "number": 7, "name": 'Dog' },
        { "number": 16, "name": 'Food' },
        { "number": 23, "name": 'Car' },
        { "number": 42, "name": 'Rent' },
        { "number": 40, "name": 'Misc' },
    ];

    const arcs = shape.pie().value(a => a.number)(data)

    const pieSlices = arcs.map((slice, index) => (
        {
            ...data[index],
            ...slice,
            path: shape.arc()
                .outerRadius(100 + index * 5)
                .innerRadius(50)
                (slice)
        }
    ));

    console.log('=-=-=--', pieSlices);

    const _onLayout = (event) => {
        const { nativeEvent: { layout: { height, width } } } = event
        setDimensions({ height, width })
    }

    return (
        <View style={{ marginTop: 20, height: 500 }} onLayout={event => _onLayout(event)}>
            {<Svg
                style={{ width, height }}
                fill="blue"
                stroke="red"
                color="green"
            >
                <G x={width / 2}
                    y={height / 2}>
                    {pieSlices.map((slice, i) => <Path
                        key={i}
                        d={slice.path}
                        strokeWidth="2"
                    />)}
                </G>
            </Svg>}
        </View>
    )
}