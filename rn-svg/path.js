import { View, Text } from 'react-native'
import React from 'react'
import { Svg } from 'react-native-svg'
import { Path } from 'react-native-svg'

export const RnPath = (props) => {
    return (
        <>
            <Svg width="130" height="130"  >
                <Path d="M25 10 L98 65 L70 25" fill="none" stroke="red" />
            </Svg>
        </>
    )
}

export default RnPath