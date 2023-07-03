import { View, Text, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { Svg } from 'react-native-svg'
import { Rect } from 'react-native-svg'
import { Path } from 'react-native-svg'
import Reanimated, { interpolate, interpolateColor, useAnimatedProps, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'

const { width, height } = Dimensions.get("screen")

const chartWidth = width - 30
const chartHeight = height / 2

const AnimatedRect = Reanimated.createAnimatedComponent(Rect)

export default function AnimatedPath() {
    const progress = useSharedValue(0)

    const start = `0, ${chartHeight}`
    const C1 = `${chartWidth / 3} ${chartHeight / 20}`
    const C2 = `${(chartWidth / 3) * 2} ${chartHeight}`
    const end = `${chartWidth} ${chartHeight / 2}`

    useEffect(() => {
        progress.value = withTiming(1, { duration: 3000 })
    }, [])

    const animatedProps = useAnimatedProps(() => {
        return {
            x: progress.value * chartWidth
        }
    })

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Svg width={chartWidth} height={chartHeight} fill={"red"} style={{ borderWidth: 3 }}>
                <Path d={`M${start} C${C1} ${C2} ${end} v${end}`}
                    width={chartWidth} height={chartHeight}
                    stroke={"black"}
                    fill={"yellow"}
                    strokeWidth={3} />
                <AnimatedRect animatedProps={animatedProps} x={chartWidth} y={0} width={chartWidth} height={chartHeight} fill={"white"} />
            </Svg>
        </View>
    )
}