/**React Imorts */
import React from 'react'
import { Text, View} from 'react-native'

/**Libraries */
import EStyleSheet from 'react-native-extended-stylesheet'
import {useTheme} from '@react-navigation/native'
import {getDeviceType} from 'react-native-device-info'

let deviceType = getDeviceType()

/**Main Export */
export const ScreenTitle = ({title}) => {
    const {colors} = useTheme()
    return (
        <View style={styles.ScreenTitle}>
            <View style={styles.Line_hort} />
            <View style={[  styles.ScreenTitleWrap,  {backgroundColor: colors.lighterBackground}, ]}  >
                <Text style={[styles.ScreenTitleText, {color: colors.primary}]}>
                    {title}
                </Text>
            </View>
        </View>
    )
}

const styles = EStyleSheet.create({
    ScreenTitle: {
        marginVertical: deviceType === 'Tablet' ? '7rem' : '10rem',
        paddingBottom: deviceType === 'Tablet' ? '5rem' : '8rem',
        position: 'relative',
        alignItems: 'flex-start',
    },
    ScreenTitleWrap: {
        paddingRight: deviceType == 'Tablet' ? '10.5rem' : '15rem',
    },
    ScreenTitleText: {
        fontFamily: 'Sen-Bold',
        fontSize: deviceType == 'Tablet' ? '17.5rem' : '25rem',
        zIndex: 2,
    },
    Line_hort: {
        position: 'absolute',
        height: 2,
        left: 0,
        right: 0,
        top: deviceType == 'Tablet' ? '10.5rem' : '15rem',
        backgroundColor: 'rgba(33,33,33,0.15)',
    },
})
