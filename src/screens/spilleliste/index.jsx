/**React Imports */
import React, { useState, useEffect, useContext } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Platform,
    KeyboardAvoidingView,
    FlatList,
    ActivityIndicator,
} from 'react-native'

/**Libraries */
import EStyleSheet from 'react-native-extended-stylesheet'
import { Modal as Modals, ModalContent } from 'react-native-modals'
import { getDeviceType } from 'react-native-device-info'
import { useIsFocused, useTheme } from '@react-navigation/native'
import Modal from 'react-native-modal'

/**Components */
import Layout from '../../components/layout'
import PlaylistSongs from '../../components/spilleliste/play-list-songs'
import { AllPlaylistItem } from '../../components/spilleliste/all-playlist-item'
import { ScreenTitle } from '../../components/common/screen-title'
import { ConfirmationModal } from '../../components/common/confirmation-modal'
import { ShowToast } from '../../services/toast-message'
import { pushToAnalytics } from '../../services/analytics'

/**Local Imports */
import { PlayListContext } from '../../context/play-list-context'
import { AuthContext } from '../../context/auth-context'
import { BottomSheetContext } from '../../context/bottom-sheet-context'
import { makeRequest } from '../../utils/make-request'
import { PlaylistPlayContext } from '../../context/playlist-play-context'
import { IconProps } from '../../utils/helpers/iconprops'
import { Fonts } from '../../utils/constants'

/**Icons */
import PlusIcon from '../../../assets/icons/plus.svg'
import CloseIcon from '../../../assets/icons/times.svg'

let deviceType = getDeviceType()

const { height } = Dimensions.get('window')

/**Main Export */
const Spilleliste = ({ navigation }) => {

    const { colors } = useTheme()
    const isFocused = useIsFocused()
    const {
        LoadPlayList,
        OpenAddPlatListModal,
        PlayListLoaded,
        UserPlayList,
        UpdatePlayListById,
        PlayListLoading,
        PlayListRefreshing,
        LoadMorePlaylist,
        UserPlayListMeta,
        PlaylistErrorTxt,
        ReloadPlayListOnStateChange,
        ReloadPlayListState,
        ResetPlayList,
    } = useContext(PlayListContext)
    const { KillGeneralPlayer, ShowLyricsForSong, ShowLyricsModal } =
        useContext(BottomSheetContext)
    const {
        PlayPlayList,
        PlayPlayListSong,
        CurrentPlaying,
        ControlPlaylist,
        UpdateRepeatMode,
        KillPlayListPlayer,
    } = useContext(PlaylistPlayContext)
    const { UserData, TrackingPermissionEnabled, ResponseFilter } =
        useContext(AuthContext)
    const [ActiveList, SetActiveList] = useState(null)
    const [ShowModal, SetShowModal] = useState(false)
    const [ShowDeleteModal, SetShowDeleteModal] = useState(false)
    const [ModalType, SetModalType] = useState(null)
    const [PlayListClosedForLyrics, SetPlayListClosedForLyrics] = useState(false)

    const [ShowSongsModal, SetShowSongsModal] = useState(false)
    const [PlayListSongsLoading, SetPlayListSongsLoading] = useState(false)
    const [ActivePlayListSongs, SetActivePlayListSongs] = useState([])
    const [ActivePlayListSongsMeta, SetActivePlayListSongsMeta] = useState(null)

    const [EditOfPlayListLoading, SetEditOfPlayListLoading] = useState(false)
    const [EditText, SetEditText] = useState('')

    const [RemovingSongLoading, SetRemovingSongLoading] = useState(false)
    const [ShowRemoveSongModal, SetShowRemoveSongModal] = useState(false)
    const [SelectedSongRemove, SetSelectedSongRemove] = useState({
        songId: '',
        playlistId: '',
    })

    const [DeletePlayListLoading, SetDeletePlayListLoading] = useState(false)

    const CloseSongsModal = () => {
        SetShowSongsModal(false)
    }

    useEffect(() => {
        if (!ShowLyricsModal && PlayListClosedForLyrics) {
            SetPlayListClosedForLyrics(false)
            setTimeout(() => {
                SetShowSongsModal(true)
            }, 600)
        }
    }, [ShowLyricsModal])

    useEffect(() => {
        if (ReloadPlayListState) {
            ReloadPlayListOnStateChange()
        }
    }, [ReloadPlayListState])

    const RemoveSong = async () => {
        try {
            SetRemovingSongLoading(true)

            let resp = await makeRequest(
                'GET',
                `playlist/sync-song/${SelectedSongRemove.songId}/${SelectedSongRemove.playlistId}`,
                {},
                UserData.token,
            )
            resp = ResponseFilter(resp)
            if (resp.error === 1) {
                LoadSongsOfPlaylist(SelectedSongRemove.playlistId)
                SetShowRemoveSongModal(false)
                LoadPlayList('')
                SetShowSongsModal(true)
            }
            SetRemovingSongLoading(false)
            // console.log('song removed response', resp)
        } catch (err) {
            SetRemovingSongLoading(false)
            console.log(err, 'err remove song failed')
        }
    }

    const LoadSongsOfPlaylist = async playlistId => {
        try {
            SetPlayListSongsLoading(true)
            let resp = await makeRequest(
                'GET',
                `playlist/${playlistId}`,
                {},
                UserData.token,
            )
            resp = ResponseFilter(resp)
            // console.log('songs loaded of plylist', resp)
            if (resp.error == 1) {
                SetActivePlayListSongs(
                    resp.data && resp.data.data ? resp.data.data : [],
                )
                SetActivePlayListSongsMeta(
                    resp.data && resp.data.meta ? resp.data.meta : null,
                )
                // SetActivePlayListSongs
            }
            SetPlayListSongsLoading(false)
        } catch (err) {
            SetPlayListSongsLoading(false)
            console.log('failed while getting songs of playlist', err)
        }
    }

    const EditPlayList = async playlistId => {
        try {
            if (EditText.length < 2) {
                // Require_translation
                ShowToast('Skriv et korrekt navn til spillelisten', 'error')
                return
            }
            SetEditOfPlayListLoading(true)
            let resp = await makeRequest(
                'PUT',
                `playlist/${playlistId}`,
                { name: EditText },
                UserData.token,
            )
            resp = ResponseFilter(resp)
            if (!resp) {
                SetEditOfPlayListLoading(false)
                return
            }
            if (resp.error == 1) {
                if (resp.data && resp.data.data) {
                    let FoundPlayList = resp.data.data.find(item => {
                        return item.id == playlistId
                    })
                    if (FoundPlayList) {
                        UpdatePlayListById(playlistId, FoundPlayList)
                        SetActiveList(FoundPlayList)
                    }

                    SetShowModal(false)
                    if (ModalType == 'Rediger') {
                        SetShowSongsModal(true)
                    }
                }
            } else {
                if (resp.msg) {
                    ShowToast(resp.msg, 'error')
                }
            }
            SetEditOfPlayListLoading(false)
        } catch (err) {
            SetEditOfPlayListLoading(false)
            console.log('failed while editing name of playlist', err)
        }
    }

    const updatePosition = async (songId, position, playlistId) => {
        try {
            let resp = await makeRequest(
                'GET',
                `playlist/reorder/${playlistId}/${songId}`,
                { order: position },
                UserData.token,
            )
            resp = ResponseFilter(resp)
            if (!resp) {
                return
            }
            // console.log(resp, 'resp reorder song')
        } catch (error) {
            console.log('failed to rearrange', error)
        }
    }

    const DeletePlayList = async playlistId => {
        try {
            SetDeletePlayListLoading(true)
            let resp = await makeRequest(
                'DELETE',
                `playlist/${playlistId}`,
                {},
                UserData.token,
            )
            resp = ResponseFilter(resp)
            if (!resp) {
                SetDeletePlayListLoading(false)
                return
            }
            // console.log(resp, 'delete playlist response')
            if (resp.error == 1) {
                UpdatePlayListById(playlistId, null)
                SetShowDeleteModal(false)
                SetShowSongsModal(false)
            } else {
                if (resp.msg) {
                    ShowToast(resp.msg, 'error')
                }
            }
            SetDeletePlayListLoading(false)
        } catch (err) {
            SetDeletePlayListLoading(false)
            console.log('failed while editing name of playlist', err)
        }
    }

    useEffect(() => {
        if (UserData && UserData.token) {
            LoadPlayList('')
        } else {
            LoadPlayList('')
            // navigation.navigate('Login')
        }
        if (UserData == null) {
            ResetPlayList()
        }
    }, [UserData])

    useEffect(() => {
        if (ActiveList) {
            UpdateActivePlaylistDetails()
        }
    }, [UserPlayList])

    const UpdateActivePlaylistDetails = () => {
        try {
            let findActivePlayList = UserPlayList.find(
                item => item.id == ActiveList.id,
            )
            if (findActivePlayList) {
                SetActiveList(findActivePlayList)
            }
        } catch (error) { }
    }

    // useEffect(() => {
    //   if (UserData && UserData.token && !PlayListLoaded) {
    //     LoadPlayList('')
    //   }
    // }, [isFocused])

    return (
        <Layout {...{ navigation }} ignoreStyles={true}>
            <FlatList
                data={UserPlayList}
                style={styles.PlaylistContainer}
                onRefresh={() => { LoadPlayList('', true) }}
                refreshing={PlayListRefreshing}
                contentContainerStyle={{ paddingBottom: EStyleSheet.value('100rem') }}
                ListHeaderComponent={() => {
                    return (
                        <>
                            <ScreenTitle title={'Spilleliste'} />
                            <View style={[styles, { backgroundColor: colors.background }]}>
                                <View style={[styles.Playlist_Head, { borderBottomColor: colors.text + '1A' },]}>
                                    <Text style={[styles.Playlist_Head_Title, { color: colors.text }]}>
                                        Alle spillelister
                                    </Text>
                                    <View style={styles.Playlist_Head_Inner}>
                                        <TouchableOpacity
                                            style={[
                                                styles.Playlist_Head_Btn,
                                                { backgroundColor: colors.lighterBackground },
                                            ]}
                                            onPress={() => {
                                                if (UserData && UserData.token && PlayListLoaded) {
                                                    if (PlaylistErrorTxt) {
                                                        ShowToast(PlaylistErrorTxt, 'error')
                                                    } else {
                                                        OpenAddPlatListModal('', 'Opret', null, true)
                                                    }
                                                } else {
                                                    if (PlaylistErrorTxt) {
                                                        ShowToast(PlaylistErrorTxt, 'error')
                                                    } else {
                                                        navigation.navigate('Login')
                                                    }
                                                }
                                            }}
                                        >
                                            <PlusIcon
                                                name="plus"
                                                {...IconProps(12)}
                                                style={[
                                                    styles.Playlist_Head_Btn_Icon,
                                                    { color: colors.primary, },
                                                ]}
                                            />
                                            <Text
                                                style={[
                                                    styles.Playlist_Head_Btn_Text,
                                                    { color: colors.primary },
                                                ]}>
                                                {'Opret ny'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </>
                    )
                }}
                ListEmptyComponent={() => {
                    if (!PlayListLoaded) {
                        return (
                            <View
                                style={[
                                    styles.PlaylistEmpty,
                                    { backgroundColor: colors.background },
                                ]}
                            >
                                <ActivityIndicator color={colors.primary} size={'small'} />
                            </View>
                        )
                    } else {
                        if (!UserData) {
                            return (
                                <View style={[styles.PlaylistEmpty, { backgroundColor: colors.background },]} >
                                    {/* Require_translation */}
                                    <Text
                                        style={[
                                            styles.Playlist_Head_Title,
                                            { marginVertical: 10, paddingHorizontal: 20, color: colors.lighterText },
                                        ]}
                                    >
                                        {'Du kan lave en spilleliste med dine favoritsalmer, hvis du opretter et abonnement.'}
                                    </Text>
                                    <TouchableOpacity
                                        style={[
                                            styles.ButtonMain,
                                            {
                                                backgroundColor: colors.lighterBackground,
                                                marginHorizontal: 20,
                                                marginBottom: 10,
                                            },
                                        ]}
                                        onPress={() => {
                                            navigation.navigate('Subscriptions')
                                        }}
                                    >
                                        <Text style={[styles.Popper_Btn_Text, { color: colors.text }]}>
                                            {'Opret abonnement'}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.ButtonMain,
                                            { backgroundColor: colors.primary, marginHorizontal: 20 },
                                        ]}
                                        onPress={() => {
                                            navigation.navigate('Login')
                                        }}
                                    >
                                        <Text style={[styles.Popper_Btn_Text, { color: 'white' }]}>
                                            {'Login'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        } else {
                            return (
                                <View
                                    style={[
                                        styles.PlaylistEmpty,
                                        { backgroundColor: colors.background },
                                    ]}
                                >
                                    {/* Require_translation */}
                                    <Text
                                        style={[
                                            styles.Playlist_Head_Title,
                                            {
                                                color: colors.text,
                                                textAlign: 'center',
                                                paddingHorizontal: 20,
                                            },
                                        ]}
                                    >
                                        {PlaylistErrorTxt ? PlaylistErrorTxt : 'Ingen spillelister'}
                                    </Text>
                                    {PlaylistErrorTxt ? (
                                        <TouchableOpacity
                                            style={[
                                                styles.ButtonMain,
                                                {
                                                    backgroundColor: colors.primary,
                                                    marginHorizontal: 20,
                                                    marginVertical: 10,
                                                },
                                            ]}
                                            onPress={() => {
                                                navigation.navigate('Subscriptions')
                                            }}
                                        >
                                            <Text style={[styles.Popper_Btn_Text, { color: 'white' }]}>
                                                {'Opret abonnement'}
                                            </Text>
                                        </TouchableOpacity>
                                    ) : null}
                                </View>
                            )
                        }
                    }
                }}
                renderItem={({ item, index }) => {
                    return (
                        <AllPlaylistItem
                            id={item.id}
                            title={item.name}
                            onItemPress={() => {
                                LoadSongsOfPlaylist(item.id)
                                SetActiveList(item)
                                SetShowSongsModal(true)
                            }}
                            songCount={item.meta.songs_count}
                        />
                    )
                }}
                ListFooterComponent={() => {
                    if (
                        UserPlayListMeta &&
                        UserPlayListMeta.current_page != UserPlayListMeta.last_page
                    ) {
                        return (
                            <View
                                style={[
                                    styles.loadMoreView,
                                    { backgroundColor: colors.background },
                                ]}
                            >
                                <ActivityIndicator color={colors.primary} size={'large'} />
                            </View>
                        )
                    } else {
                        return null
                    }
                }}
                onEndReached={() => {
                    LoadMorePlaylist()
                }}
                onEndReachedThreshold={0.7}
                keyExtractor={item => item.id}
            />
            <Modals
                visible={ShowModal}
                onTouchOutside={() => {
                    SetModalType(null)
                    SetShowModal(false)
                }}
                width={deviceType === 'Tablet' ? 0.5 : 0.8}
                overlayOpacity={0.2}
                onShow={() => console.log('show')}
                onDismiss={() => {
                    if (ModalType == 'Rediger') {
                        SetShowSongsModal(true)
                    }
                }}
            >
                <ModalContent style={{ marginHorizontal: -18, marginVertical: -24 }}>
                    <View
                        style={[
                            styles.Add_Pl_Wrap_Head,
                            { borderBottomColor: colors.text + '0D' },
                        ]
                        }>
                        <Text style={[styles.Add_Pl_Wrap_Head_Title, { color: colors.text }]}>
                            {ModalType} spilleliste
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                SetModalType(null)
                                SetShowModal(false)
                                if (ModalType == 'Rediger') {
                                    SetShowSongsModal(true)
                                }
                            }}
                        >
                            <CloseIcon {...IconProps(14)} name="times" style={styles.Modal_Close_Btn_Icon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.Add_Pl_Wrap_Body}>
                        <View style={styles.Add_Pl_Wrap_Body_Inner}>
                            <Text style={[styles.Add_Pl_Label, { color: colors.primary }]}>
                                Spillelistens navn:
                            </Text>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={[
                                    styles.Form_Control,
                                    {
                                        color: colors.text,
                                        backgroundColor: colors.lighterBackground,
                                    },
                                ]}
                                placeholder="Skriv navn"
                                placeholderTextColor="rgba(0, 0, 0, 0.3)"
                                value={EditText}
                                onChangeText={txt => {
                                    SetEditText(txt)
                                }}
                            />
                        </View>
                        <TouchableOpacity
                            disabled={EditOfPlayListLoading}
                            style={[
                                styles.Submit_Btn,
                                {
                                    backgroundColor: colors.buttonBackground,
                                    borderColor: colors.buttonBorder,
                                },
                            ]}
                            onPress={() => {
                                EditPlayList(ActiveList.id)
                            }}
                        >
                            {EditOfPlayListLoading ? (
                                <ActivityIndicator color={colors.buttonText} size={'small'} />
                            ) : (
                                <Text
                                    style={[styles.Submit_Btn_Text, { color: colors.buttonText }]}>
                                    Gem
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ModalContent>
            </Modals>
            <ConfirmationModal
                ShowModal={ShowDeleteModal}
                onCancel={() => {
                    SetShowSongsModal(true)
                    SetShowDeleteModal(false)
                }}
                onDismiss={() => {
                    SetShowSongsModal(true)
                    SetShowDeleteModal(false)
                }}
                title={'Slet spilleliste'}
                message={
                    'Er du sikker på at du vil slette spillelisten? Denne handling kan ikke gøres om.'
                }
                onConfirm={() => {
                    DeletePlayList(ActiveList.id)
                }}
                isLoading={DeletePlayListLoading}
            />
            <ConfirmationModal
                ShowModal={ShowRemoveSongModal}
                onCancel={() => {
                    SetShowRemoveSongModal(false)
                    SetShowSongsModal(true)
                }}
                onDismiss={() => {
                    SetShowRemoveSongModal(false)
                    SetShowSongsModal(true)
                }}
                title={'Fjern indspilning'}
                message={
                    'Er du sikker på at du vil fjerne denne indspilning fra spillelisten?'
                }
                onConfirm={() => {
                    RemoveSong()
                }}
                isLoading={RemovingSongLoading}
            />
            <Modal
                // onTouchOutside={CloseSongsModal}
                // visible={ShowSongsModal}
                // swipeDirection={['down']}
                // onSwipeOut={CloseSongsModal}
                // overlayOpacity={0.2}
                // width={1}
                // style={{justifyContent: 'flex-end', margin: 0}}
                isVisible={ShowSongsModal}
                onSwipeComplete={CloseSongsModal}
                swipeDirection={'down'}
                onBackdropPress={CloseSongsModal}
                style={{ margin: 0, justifyContent: 'flex-end', }}
                propagateSwipe>
                <KeyboardAvoidingView
                    style={[ styles.PopUp,{ backgroundColor: colors.background }]}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
                >
                    <View style={styles.Header}>
                        <View style={styles.HeaderBar} />
                    </View>
                    <PlaylistSongs
                        ActiveList={ActiveList}
                        CurrentPlaying={CurrentPlaying}
                        ControlPlaylist={ControlPlaylist}
                        UpdateRepeatMode={UpdateRepeatMode}
                        OpenEditModal={editType => {
                            SetEditText(ActiveList.name)
                            SetModalType(editType)
                            SetShowModal(true)
                            SetShowSongsModal(false)
                        }}
                        onUpdatePosition={(songId, updatedPosition, playlistId) => {
                            // console.log(songId, updatedPosition, 'ss')
                            updatePosition(songId, updatedPosition, playlistId)
                        }}
                        SetShowDeleteModal={type => {
                            SetShowSongsModal(false)
                            SetShowDeleteModal(type)
                        }}
                        updateActivePlaylistSongs={data => {
                            SetActivePlayListSongs(data)
                        }}
                        PlayListSongsLoading={PlayListSongsLoading}
                        ActivePlayListSongs={ActivePlayListSongs}
                        onRemoveSong={(songId, PlaylistId) => {
                            SetSelectedSongRemove({ songId: songId, playlistId: PlaylistId })
                            SetShowRemoveSongModal(true)
                            CloseSongsModal()
                        }}
                        PlaySong={song => {
                            KillGeneralPlayer()
                            pushToAnalytics(
                                `${song.number}_song_play`,
                                {
                                    title: song.title,
                                },
                                TrackingPermissionEnabled,
                            )
                            // PlayMusic(songs, 'single')
                            // PlayMusic(songs)
                            PlayPlayListSong(song, ActiveList.id)
                        }}
                        PlayPlaylist={songs => {
                            KillGeneralPlayer()
                            if (Array.isArray(songs)) {
                                songs.map(item => {
                                    item.playlistId = ActiveList.id
                                })
                            }
                            pushToAnalytics(
                                `${ActiveList.id}_playlist_play`,
                                {
                                    title: ActiveList.name,
                                },
                                TrackingPermissionEnabled,
                            )
                            let lastObj = { ...songs[songs.length - 1] }
                            let tempSongs = [...songs]
                            if (Platform.OS == 'ios') {
                                tempSongs.push(lastObj)
                                tempSongs.push(lastObj)
                            }
                            // PlayMusic(tempSongs, 'playlist')
                            PlayPlayList(tempSongs, ActiveList.id)
                        }}
                        ResetPlayer={() => { KillPlayListPlayer() }}
                        onShowLyrics={(id, title, number) => {
                            CloseSongsModal()
                            SetPlayListClosedForLyrics(true)
                            // pushToAnalytics(
                            //     `${number}_view_text`,
                            //     {
                            //     title: title,
                            //     },
                            //     TrackingPermissionEnabled,
                            // )
                            setTimeout(() => {
                                ShowLyricsForSong(id, title)
                            }, 600)
                        }}
                    />
                </KeyboardAvoidingView>
            </Modal>
        </Layout>
    )
}

const styles = EStyleSheet.create({
    Playlist: {
        borderTopLeftRadius: deviceType === 'Tablet' ? '7rem' : '10rem',
        borderTopRighttRadius: deviceType === 'Tablet' ? '7rem' : '10rem',
    },
    PlaylistEmpty: {
        justifyContent: 'center',
        height: height * 0.3,
    },
    PlaylistContainer: {
        paddingHorizontal: deviceType == 'Tablet' ? '14rem' : '16rem',
        paddingTop: deviceType === 'Tablet' ? '14rem' : '20rem',
        paddingBottom: deviceType == 'Tablet' ? '35rem' : '50rem',
    },
    Playlist_Head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        paddingHorizontal: deviceType === 'Tablet' ? '14rem' : '20rem',
        paddingVertical: deviceType === 'Tablet' ? '8rem' : '12rem',
    },
    Playlist_Head_Title: {
        fontFamily: 'Sen-Bold',
        fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
    },
    Playlist_Head_Inner: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    Playlist_Head_Btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: deviceType === 'Tablet' ? '3rem' : '4rem',
        paddingHorizontal: deviceType === 'Tablet' ? '7rem' : '10rem',
        paddingVertical: deviceType === 'Tablet' ? '3.5rem' : '5rem',
    },
    Playlist_Head_Btn_Icon: {
        marginRight: 5,
        fontSize: deviceType === 'Tablet' ? '8rem' : '12rem',
    },
    Playlist_Head_Btn_Text: {
        fontFamily: 'Sen-Bold',
        fontSize: deviceType === 'Tablet' ? '10rem' : '14rem',
    },
    Add_Pl_Wrap_Head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: deviceType === 'Tablet' ? '10rem' : '14rem',
        paddingTop: deviceType === 'Tablet' ? '14rem' : '20rem',
        borderBottomWidth: 1,
    },
    Add_Pl_Wrap_Head_Title: {
        fontFamily: 'Sen-Bold',
        fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
    },
    Modal_Close_Btn_Icon: {
        fontSize: deviceType === 'Tablet' ? '10rem' : '14rem',
    },
    Add_Pl_Wrap_Body: {
        padding: deviceType === 'Tablet' ? '10rem' : '14rem',
    },
    Add_Pl_Wrap_Body_Inner: {
        marginBottom: deviceType === 'Tablet' ? '14rem' : '20rem',
    },
    Add_Pl_Label: {
        fontFamily: 'Sen-Regular',
        fontSize: deviceType === 'Tablet' ? '10.5rem' : '15rem',
        paddingBottom: deviceType === 'Tablet' ? '3.5rem' : '5rem',
        paddingLeft: 3,
    },
    Form_Control: {
        fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
        fontFamily: 'Sen-Regular',
        borderRadius: 3,
        paddingVertical: deviceType === 'Tablet' ? '8.5rem' : '12rem',
        paddingHorizontal: deviceType === 'Tablet' ? '11rem' : '16rem',
    },
    Submit_Btn: {
        marginLeft: 'auto',
        borderWidth: 1,
        borderRadius: 3,
        paddingVertical: deviceType === 'Tablet' ? '8.5rem' : '10rem',
        width: deviceType === 'Tablet' ? '89rem' : '120rem',
        alignItems: 'center',
    },
    Submit_Btn_Text: {
        fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
        fontFamily: 'Sen-Bold',
    },
    Delete_Popper: {
        paddingVertical: deviceType === 'Tablet' ? '17.5rem' : '25rem',
        paddingHorizontal: deviceType === 'Tablet' ? '14rem' : '20rem',
    },
    Popper_Title: {
        fontFamily: 'Sen-Bold',
        fontSize: deviceType === 'Tablet' ? '14rem' : '20rem',
        marginBottom: deviceType === 'Tablet' ? '10.5rem' : '15rem',
        letterSpacing: -1,
    },
    Popper_Desc: {
        fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
        lineHeight: deviceType === 'Tablet' ? '17rem' : '24rem',
        fontFamily: 'Sen-Regular',
        marginBottom: deviceType === 'Tablet' ? '17.5rem' : '25rem',
    },
    Popper_Btns: {
        flexDirection: 'row',
    },
    Popper_Btn: {
        flex: 1,
        paddingVertical: deviceType === 'Tablet' ? '8.5rem' : '12rem',
        paddingHorizontal: deviceType === 'Tablet' ? '11rem' : '16rem',
        borderRadius: 6,
        marginHorizontal: 6,
        alignItems: 'center',
    },
    ButtonMain: {
        paddingVertical: deviceType === 'Tablet' ? '8.5rem' : '12rem',
        paddingHorizontal: deviceType === 'Tablet' ? '11rem' : '16rem',
        borderRadius: 6,
        marginHorizontal: 6,
        alignItems: 'center',
    },
    Popper_Btn_Text: {
        fontFamily: 'Sen-Bold',
    },
    PopUp: {
        height: height * 0.7,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    Header: {
        marginVertical: '12rem',
        alignItems: 'center',
    },
    HeaderBar: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: '3rem',
        width: '80rem',
    },
    loadMoreView: {
        height: height * 0.1,
        justifyContent: 'center',
    },
})

export default Spilleliste
