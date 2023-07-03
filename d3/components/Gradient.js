import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Defs, LinearGradient, Stop, G } from 'react-native-svg'

const gradientColors = ["rgba(44,56,188,1)", "rgba(0,118,190,1)"]

export default function Gradient() {
    return (
        <G>
            <Defs key={'gradient'}>
                <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'100%'} y2={'0%'}>
                    <Stop offset={'0%'} stopColor={gradientColors[0]} />
                    <Stop offset={'100%'} stopColor={gradientColors[1]} />
                </LinearGradient>
            </Defs>
        </G>
    )
}

const styles = StyleSheet.create({})