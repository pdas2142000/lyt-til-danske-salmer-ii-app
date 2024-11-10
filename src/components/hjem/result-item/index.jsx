/**React Imports */
import React, {useContext} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

/**Libraries */
import {getDeviceType} from 'react-native-device-info'
import {useTheme} from '@react-navigation/native'
import EStyleSheet from 'react-native-extended-stylesheet'

/**Components */
import { ShowToast } from '../../../services/toast-message'

/**Local Imports */
import { ms } from '../../../utils/helpers/metrics'
import { Fonts } from '../../../utils/constants'
import { IconProps } from '../../../utils/helpers/iconprops'

/**Icons */
import PlayListAddIcon from '../../../../assets/icons/playlist-add.svg'
import PlayCircleIcon from '../../../../assets/icons/play-circle.svg'

let deviceType = getDeviceType()

/**Main Export */
const ResultItem = ({
  item,
  index,
  listLength,
  OnPlayClick,
  OnAddPlaylist,
  onSongDetailsClick,
  onCurchDetailsClick,
  OnShowLyrics,
  showLyrics = true,
}) => {
    
    const {colors} = useTheme()
    
    const RenderSongIfoDetail = ({heading, value, church}) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (church) {
                        onCurchDetailsClick()
                    } else {
                        onSongDetailsClick()
                    }
                }}
            >
                <Text style={styles.Singers}>
                    <Text style={styles.Text_Bold}>{heading}: </Text>
                    <Text style={{color: colors.primary, fontWeight: 'bold'}}>
                        {value}
                    </Text>
                </Text>
            </TouchableOpacity>
        )
    }

    const PlayTrack = track => {
        if (track.canPlay) {
            OnPlayClick(track)
            } else if (track.songtype && track.songtype == 'organ') {
            ShowToast(
                'For at høre denne optagelse skal du have et abonnement, og være logget ind.',
                'info',
            )
        } else {
            ShowToast(
                'Denne salme er rettighedsbelagt. For at lytte til den, skal du købe et Spilleliste+ abonnement.',
                'info',
            )
        }
    }

    const RenderSongInfo = ({songDetails}) => {
        if (
            songDetails.church &&
            songDetails.singer &&
            songDetails.organist &&
            songDetails.producer
        ) {
        return (
            <View style={styles.SongInfoContainer}>
                <RenderSongIfoDetail
                    heading={'Sanger'}
                    value={
                    songDetails.singer && songDetails.singer.code
                        ? songDetails.singer.code
                        : ''
                    }
                />
                <RenderSongIfoDetail
                    heading={'Organist'}
                    value={
                    songDetails.organist && songDetails.organist.code
                        ? songDetails.organist.code
                        : ''
                    }
                />
                <RenderSongIfoDetail
                    heading={'Producer'}
                    value={
                    songDetails.producer && songDetails.producer.code
                        ? songDetails.producer.code
                        : ''
                    }
                />
                <RenderSongIfoDetail
                    heading={'Kirke'}
                    church={true}
                    value={
                    songDetails.church && songDetails.church.code
                        ? songDetails.church.code
                        : ''
                    }
                />
            </View>
        )
        } else {
            return null
        }
    }
    
    return (
        <View style={EStyleSheet.child(styles, 'Result', index, listLength)} key={item.id}> 
            {item.number ? 
                (
                <View style={styles.Serial}>
                    <Text style={[styles.Serial_Text, {color: colors.text}]}>
                        {item.number}
                    </Text>
                </View>
                ) : null
            }
            <View style={styles.Song_Info}>
                <View style={styles.Melody}>
                    <View style={styles.Melody_Wrap}>
                        <Text style={[styles.Song_Title, {color: colors.text}]}>
                            {item.title}
                        </Text>
                        {item.composer_display ? (
                            <Text style={styles.Song_Text}>
                                <Text style={styles.Text_Bold}>Melodi:</Text>{' '}
                                {item.composer_display}
                            </Text>
                        ) : null}
                        {item.author_display ? (
                            <Text style={styles.Song_Text}>
                                <Text style={styles.Text_Bold}>Tekst:</Text>{' '}
                                {item.author_display}
                            </Text>
                        ) : null}
                        {/* <Text style={styles.Singers}>
                        <Text style={styles.Text_Bold}>Sanger: </Text>
                        {item.singer && item.singer.name ? (
                            <Text key={item.singer.id} style={styles.Link}>
                            {item.singer.name}
                            </Text>
                        ) : null}
                        </Text> */}
                        <RenderSongInfo songDetails={item} />
                        <TouchableOpacity
                            style={[styles.Btn]}
                            onPress={() => {
                                if (item.canPlay) {
                                    OnAddPlaylist(item)
                                } else if (item?.songtype && item?.songtype == 'organ') {
                                    ShowToast(
                                        'For at høre denne optagelse skal du have et abonnement, og være logget ind.',
                                        'info',
                                    )
                                } else {
                                    ShowToast(
                                        'Denne salme er rettighedsbelagt. For at føje den til en spilleliste, skal du købe et Spilleliste+ abonnement.',
                                        'info',
                                    )
                                }
                            }}
                        >
                        <PlayListAddIcon
                            name="playlist-plus"
                            {...IconProps(20)}
                            style={[styles.Btn_Icon, {color: colors.primary, fill: colors.primary}]}
                        />
                        <Text style={[styles.Btn_Text, {color: colors.primary}]}>
                            Føj til spilleliste
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.Melody_Btns}>
                        <Text style={[styles.Duration, {color: colors.text}]}>
                            {item.duration}
                        </Text>
                        <TouchableOpacity
                            style={styles.Play_Btn}
                            onPress={() => {
                                PlayTrack(item)
                            }}
                        >
                        <PlayCircleIcon
                            name="play-circle"
                            {...IconProps(35)}
                            style={[styles.Play_Icon, {fill: colors.primary}]}
                        />
                        </TouchableOpacity>
                        {showLyrics ? (
                        <TouchableOpacity
                            style={styles.Lyrics_Btn}
                            onPress={() => {
                            if (item.canPlay && item.lyrics) {
                                OnShowLyrics(item)
                            } else if (item.songtype && item.songtype == 'organ') {
                                ShowToast(
                                'For at høre denne optagelse skal du have et abonnement, og være logget ind.',
                                'info',
                                )
                            } else {
                                ShowToast(
                                'Denne tekst er rettighedsbelagt, og kan derfor ikke vises.',
                                'info',
                                )
                            }
                            }}
                        >
                            <Text style={[styles.Lyrics_Btn_Text, {color: colors.primary}]}>
                                Tekst
                            </Text>
                        </TouchableOpacity>
                        ) : null}
                    </View>
                </View>
                {item.alternate_melodies &&
                Array.isArray(item.alternate_melodies) &&
                item.alternate_melodies.map(alt => {
                    return (
                        <View style={[styles.Melody, styles.Alt]} key={alt.id}>
                            <View style={styles.Melody_Wrap}>
                                <Text  style={[ styles.Song_Title,  {color: colors.text}, ]}>
                                    Alternativ melodi
                                </Text>
                                <Text style={styles.Song_Text}>
                                    <Text style={styles.Text_Bold}>Melodi:</Text>{' '}
                                    {alt.composer_display ? alt.composer_display : ''}
                                </Text>
                                <RenderSongInfo songDetails={alt} />
                                <TouchableOpacity
                                    style={[
                                    styles.Btn,
                                    alt.canPlay
                                        ? {}
                                        : {
                                            opacity: 0.3,
                                        },
                                    ]}
                                    disabled={alt.canPlay ? false : true}
                                    onPress={() => {
                                        OnAddPlaylist(alt)
                                    }}
                                >
                                    <PlayListAddIcon
                                        name="playlist-plus"
                                        {...IconProps(20)}
                                        style={[styles.Btn_Icon, {fill: colors.primary}]}
                                    />
                                    <Text style={[styles.Btn_Text, {color: colors.primary}]}>
                                        Føj til spilleliste
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.Melody_Btns}>
                                <Text style={[styles.Duration, {color: colors.text}]}>
                                    {alt.duration}
                                </Text>
                                <TouchableOpacity
                                    style={styles.Play_Btn}
                                    onPress={() => PlayTrack(alt)}>
                                    <PlayCircleIcon
                                        {...IconProps(35)}
                                        name="play-circle"
                                        style={[styles.Play_Icon, {fill: colors.primary}]}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.Lyrics_Btn}
                                    onPress={() => {
                                    if (alt.canPlay && alt.lyrics) {
                                        OnShowLyrics(alt)
                                    } else {
                                        ShowToast(
                                        'Denne tekst er rettighedsbelagt, og kan derfor ikke vises.',
                                        'info',
                                        )
                                    }
                                    }}
                                >
                                    <Text  style={[styles.Lyrics_Btn_Text, {color: colors.primary}]}>
                                        Tekst
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

const styles = EStyleSheet.create({
    Result: {
        flexDirection: 'row',
        paddingVertical: deviceType === 'Tablet' ? '10.5rem' : '15rem',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    'Result:last-child': {
        borderBottomWidth: 0,
    },
    Serial: {
        paddingRight: deviceType === 'Tablet' ? '7rem' : '10rem',
        width: '40rem',
    },
    Serial_Text: {
        fontSize: deviceType === 'Tablet' ? '11.5rem' : '16rem',
        fontFamily: 'Sen-Bold',
    },
    Song_Info: {
        flex: 1,
    },
    Melody: {
        flexDirection: 'row',
    },
    Alt: {
        paddingTop: deviceType === 'Tablet' ? '7rem' : '10rem',
    },
    Melody_Wrap: {
        flex: 1,
        paddingRight: deviceType === 'Tablet' ? '7rem' : '10rem',
    },
    Song_Title: {
        fontSize: deviceType === 'Tablet' ? '11.5rem' : '16rem',
        fontFamily: 'Sen-Bold',
        paddingBottom: '5rem',
    },
    Text_Bold: {
        fontFamily: 'Sen-Bold',
    },
    Link: {},
    Song_Text: {
        fontSize: deviceType === 'Tablet' ? '9.5rem' : '14rem',
        lineHeight: deviceType === 'Tablet' ? '14rem' : '20rem',
        color: 'rgba(0,0,0,0.5)',
        fontFamily: 'Sen-Regular',
        paddingBottom: '3rem',
    },
    Singers: {
        fontSize: deviceType === 'Tablet' ? '9.5rem' : '14rem',
        lineHeight: deviceType === 'Tablet' ? '14rem' : '20rem',
        color: 'rgba(0,0,0,0.5)',
        fontFamily: 'Sen-Regular',
        paddingVertical: '3rem',
        paddingRight: '5rem',
    },
    Btn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: deviceType === 'Tablet' ? '3.5rem' : '5rem',
    },
    Btn_Icon: {
        fontSize: deviceType === 'Tablet' ? '14rem' : '20rem',
    },
    Btn_Text: {
        fontFamily: 'Sen-Bold',
    },
    Lyrics_Btn_Text: {
        fontFamily: 'Sen-Regular',
    },
    Melody_Btns: {
        alignItems: 'center',
    },
    Duration: {
        fontSize: deviceType === 'Tablet' ? '9.5rem' : '14rem',
        fontFamily: 'Sen-Bold',
        paddingBottom: deviceType === 'Tablet' ? '2rem' : '3rem',
    },
    Play_Btn: {
        paddingHorizontal: 5,
    },
    Play_Icon: {
        fontSize: deviceType === 'Tablet' ? '24.5rem' : '35rem',
    },
    Lyrics_Btn: {
        padding: 5,
    },
    SongInfoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
  })

export default ResultItem
