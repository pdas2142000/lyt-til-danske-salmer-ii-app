/** Libraries */
import { Animated, Easing } from 'react-native'

export const endAnimataion = (endAt, spinValue, ChangeAppColors, colors, StartHidingWheelTimer, SetAccordinWheel) => {
    // Bring back to 1 then animate to the given value so the wheel doesn't animate backwards
    Animated.sequence([
        Animated.timing(spinValue, {
            toValue: endAt,
            duration: 1000,
            easing: Easing.bezier(0.4, 0, 0, 1),
            useNativeDriver: true,
        }),
    ]).start(finished => {
        if (finished.finished) {
            ChangeAppColors(colors)
            StartHidingWheelTimer(SetAccordinWheel)
        }
    })
}

export const StartHidingWheelTimer = (SetAccordinWheel) => {
    setTimeout(() => {
        SetAccordinWheel(true)
    }, 1500)
}


export const RotateWheel = (angle, StateLessData, spinValue, ChangeAppColors, StartHidingWheelTimer, SetAccordinWheel) => {
    if (!angle) {
        return
    }
    angle = angle + 2.5
    let val = angle / 360
    StateLessData.endAnimateto = val
    StateLessData.state = true
    endAnimataion(val, spinValue, ChangeAppColors, StateLessData.colors, StartHidingWheelTimer, SetAccordinWheel)
}

export const LoopFadeAnimation = (FadeOpacity, Animated) => {
    Animated.loop(
        Animated.sequence([
            Animated.timing(FadeOpacity, {
                toValue: 1,
                duration: 500,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(FadeOpacity, {
                toValue: 0,
                duration: 500,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
        ]),
        {
            iterations: 15,
        }
    ).start(finished => {
        console.log('loop fin', finished)
    })
}

// export const GetColorAndUser = async (makeRequest, UserData, StateLessData, spinValue, ChangeAppColors, StartHidingWheelTimer, SetAccordinWheel,ResponseFilter, UnMountLoadingScreen,UpdateUser) => {
//     try {
//         let resp = await makeRequest(
//             'GET',
//             'get-color',
//             {},
//             UserData && UserData.token ? UserData.token : null
//         )
//         resp = ResponseFilter(resp)
//         if (!resp) {
//             return
//         }
//         if (resp.error === 1) {
//             if (resp.data) {
//                 StateLessData.colors = resp.data.color
//                 RotateWheel(resp?.data?.angle, StateLessData, spinValue, ChangeAppColors, StartHidingWheelTimer, SetAccordinWheel)
//             }
//             UnMountLoadingScreen()
//             if (resp.user) {
//                 UpdateUser({ data: resp.user })
//             }
//         }
//     } catch (err) {
//         console.log('failed to get user and color', err)
//     }
// }

// export const GetSuffuleSongs = async (makeRequest, UserData, PlayMusic, Platform, SetShufleLoading, __DEV__, KillPlayListPlayer) => {
//     try {
//         SetShufleLoading(true)
//         await KillPlayListPlayer()
//         let response = await makeRequest(
//             'GET',
//             'songs/shuffle',
//             { limit: __DEV__ ? 3 : 150 },
//             UserData && UserData.token ? UserData.token : null
//         )
//         if (response.error === 1) {
//             let lastObj = { ...response.data[response.data.length - 1] }
//             let tempSongs = [...response.data]
//             if (Platform.OS === 'ios') {
//                 tempSongs.push(lastObj)
//                 tempSongs.push(lastObj)
//             }
//             PlayMusic(tempSongs, 'shuffle')
//         }
//         SetShufleLoading(false)
//     } catch (error) {
//         SetShufleLoading(false)
//     }
// }
