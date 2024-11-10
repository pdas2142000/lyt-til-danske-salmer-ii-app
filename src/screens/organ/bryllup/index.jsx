/**React Imports */
import React, {useState, useEffect, useContext} from 'react'
import {
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  FlatList
} from 'react-native'

/**Libraries */
import { getDeviceType } from 'react-native-device-info'
import {useTheme} from '@react-navigation/native'

/**Components */
import Layout from '../../../components/layout'
import EStyleSheet from 'react-native-extended-stylesheet'
import ResultItem from '../../../components/hjem/result-item'
import { ScreenTitle } from '../../../components/common/screen-title'
import { PlayListContext } from '../../../context/play-list-context'
import { pushToAnalytics } from '../../../services/analytics'

/**Local Imports */
import { makeRequest } from '../../../utils/make-request'
import { AuthContext } from '../../../context/auth-context'
import { BottomSheetContext } from '../../../context/bottom-sheet-context'
import { LoadSongs } from './helpers'

let deviceType = getDeviceType()
const {height} = Dimensions.get('window')

/**Main Export */
const Bryllup = ({navigation}) => {

    const {colors} = useTheme()
    const {OpenPlaylistModal} = useContext(PlayListContext)
    const {PlayMusic, ShowLyricsForSong} = useContext(BottomSheetContext)
    const {UserData, TrackingPermissionEnabled} = useContext(AuthContext)
    const [RequestLoaded, SetRequestLoaded] = useState(false)
    const [RequestLoading, SetRequestLoading] = useState(false)
    const [Data, SetData] = useState([])

    useEffect(() => {
        LoadSongs(false, SetRequestLoading, SetRequestLoaded, SetData, UserData);
    }, []);

    return (
        <Layout {...{navigation}} ignoreStyles={true}>
            <FlatList
                data={Data}
                style={styles.RitualerContainer}
                onRefresh={() => { LoadSongs(true, SetRequestLoading, SetRequestLoaded, SetData, UserData); }}
                refreshing={RequestLoading}
                contentContainerStyle={{paddingBottom: EStyleSheet.value('100rem')}}
                ListHeaderComponent={() => {
                    return (
                        <>
                            <ScreenTitle title={'Bryllup'} />
                        </>
                    )
                }}
                ListEmptyComponent={() => {
                    if (!RequestLoaded) {
                        return (
                            <View style={[    styles.RitualerEmpty, {backgroundColor: colors.background},  ]}>
                                <ActivityIndicator color={colors.primary} size={'small'} />
                            </View>
                        )
                    } else {
                        return (
                        <View style={[ styles.RitualerEmpty,  {backgroundColor: colors.background},   ]}>
                            {/* Require_translation */}
                            <Text  style={[styles.Ritualer_Head_Title, {color: colors.text}]}>
                                {'Ingen tilgængelige indspilninger'}
                            </Text>
                        </View>
                        )
                    }
                }}
                renderItem={({item, index}) => {
                return (
                    <View style={[styles.ItemContainer,{backgroundColor: colors.background}]}>
                        <ResultItem
                            item={item}
                            index={index}
                            listLength={Data.length}
                            OnAddPlaylist={songItem => {
                            if (UserData && UserData.token) {
                                OpenPlaylistModal(songItem)
                            } else {
                                navigation.navigate('Login')
                            }
                            }}
                            OnPlayClick={song => {
                                let songs = []
                                songs.push(song)
                                PlayMusic(songs, 'single')
                            }}
                            showLyrics={UserData && UserData.token}
                            onSongDetailsClick={() => {
                                navigation.navigate('Medvirkende')
                            }}
                            onCurchDetailsClick={() => {
                                navigation.navigate('KirkerOgOrgler')
                            }}
                            OnShowLyrics={item => {
                            pushToAnalytics(
                                `${item.number}_view_text`,
                                {
                                title: item.title,
                                },
                                TrackingPermissionEnabled,
                            )
                            ShowLyricsForSong(item.id, item.title)
                            }}
                        />
                    </View>
                )
                }}
                keyExtractor={item => item.id}
            />
        </Layout>
    )
}

const styles = EStyleSheet.create({
    RitualerEmpty: {
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.3,
    },
    RitualerContainer: {
        paddingHorizontal: deviceType == 'Tablet' ? '9rem' : '12rem',
        paddingTop: deviceType === 'Tablet' ? '14rem' : '20rem',
        paddingBottom: deviceType == 'Tablet' ? '35rem' : '50rem',
    },
    Ritualer_Head_Title: {
        fontFamily: 'Sen-Bold',
        fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
    },
    ItemContainer: {
        paddingHorizontal: deviceType == 'Tablet' ? '14rem' : '16rem',
    },
})

export default Bryllup
