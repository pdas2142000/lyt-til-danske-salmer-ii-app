import React, {useContext, useState} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Platform,
} from 'react-native'

/**Libraries */
import {SwipeRow} from 'react-native-swipe-list-view'
import EStyleSheet from 'react-native-extended-stylesheet'
import {getDeviceType} from 'react-native-device-info'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import DraggableFlatList, {
	ScaleDecorator,
  } from 'react-native-draggable-flatlist'


/**Local Imports */
import { IconProps } from '../../../utils/helpers/iconprops'
import { ThemeContext } from '../../../context/theme-context'

/**Icons */
import MusicalNotesIcon from '../../../../assets/icons/musical_note.svg'
import PlayIcon from '../../../../assets/icons/play.svg'
import StopIcon from '../../../../assets/icons/stop.svg'
import TrashIcon from '../../../../assets/icons/trash.svg'
import PauseIcon from '../../../../assets/icons/pause.svg'
import RepeatOneIcon from '../../../../assets/icons/repeat_one.svg'
import DragHandleIcon from '../../../../assets/icons/drag_handle.svg'
import RepeatIcon from '../../../../assets/icons/repeat.svg'
import PlayListEditIcon from '../../../../assets/icons/playlist_edit_icon.svg'


let deviceType = getDeviceType()
const {height} = Dimensions.get('window')

/**Main Export */
const PlaylistSongs = ({
	ActiveList,
	OpenEditModal,
	SetShowDeleteModal,
	PlayListSongsLoading,
	ActivePlayListSongs,
	onRemoveSong,
	PlayPlaylist,
	PlaySong,
	updateActivePlaylistSongs,
	onUpdatePosition,
	onShowLyrics,
	CurrentPlaying,
	ControlPlaylist,
	UpdateRepeatMode,
	ResetPlayer,
}) => {
	const {theme} = useContext(ThemeContext)
	const [canReorder, setcanReorder] = useState(false)
	const CustomList = canReorder ? DraggableFlatList : FlatList
	const CustomView = canReorder ? ScaleDecorator : View

	const RenderItem = ({item, index, drag, isActive}) => {
		return (
		<CustomView>
			<SwipeRow
				disableLeftSwipe={
					Platform.OS == 'ios' && !canReorder
					? false
					: Platform.OS == 'android'
					? false
					: true
				}
				disableRightSwipe={
					Platform.OS == 'ios' && !canReorder
					? false
					: Platform.OS == 'android'
					? false
					: true
				}
				rightOpenValue={-150}
				leftOpenValue={75}
			>
				<View style={styles.rowBack}>
					<TouchableOpacity
						style={[
							styles.backRightBtn,
							{
							left: 0,
							borderRightWidth: 1,
							borderRightColor: theme.colors.text + '0D',
							},
						]}
						onPress={() => {
							onRemoveSong(item.id, ActiveList.id)
						}}
					>
						<View style={styles.Delete_background}>
							<TrashIcon
								name="trash"
								{...IconProps(13)}
								style={[styles.Delete_Icon, {fill: '#d14747'}]}
							/>
						</View>
						<Text style={[styles.row_behind, {color: theme.colors.text}]}>
							Delete
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.backRightBtn,
							{
							right: 75,
							borderRightWidth: 1,
							borderRightColor: theme.colors.text + '0D',
							},
							CurrentPlaying &&
							!CurrentPlaying.isPlaylistPlaying &&
							CurrentPlaying.currentPlayingSongId &&
							CurrentPlaying.currentPlayingSongId == item.id
							? {}
							: {opacity: 0.2},
						]}
						disabled={
							CurrentPlaying &&
							!CurrentPlaying.isPlaylistPlaying &&
							CurrentPlaying.currentPlayingSongId == item.id
							? false
							: true
						}
						onPress={() => {
							UpdateRepeatMode('song')
						}}
					>
					<View
						style={[
						styles.Repeat_Background,
						CurrentPlaying &&
						CurrentPlaying.currentPlayingSongId == item.id &&
						CurrentPlaying.RepeatSong
							? {backgroundColor: theme.colors.primary}
							: {backgroundColor: theme.colors.lighterBackground},
						]}
					>
						<RepeatOneIcon
							name="repeat-one"
							{...IconProps(16)}
							style={[
								styles.Repeat_Icon,
								{
									color: theme.colors.primary,
								},
							]}
						/>
					</View>
					<Text
						style={[
						styles.row_behind,
						CurrentPlaying &&
						CurrentPlaying.currentPlayingSongId == item.id &&
						CurrentPlaying.RepeatSong
							? {
								color: theme.colors.primary,
							}
							: {
								color: theme.colors.text,
							},
						]}
					>
						Repeat
					</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.backRightBtn,
							CurrentPlaying &&
							!CurrentPlaying.isPlaylistPlaying &&
							CurrentPlaying.currentPlayingSongId &&
							CurrentPlaying.currentPlayingSongId == item.id
							? {}
							: {opacity: 0.2},
						]}
						disabled={
							CurrentPlaying &&
							!CurrentPlaying.isPlaylistPlaying &&
							CurrentPlaying.currentPlayingSongId == item.id
							? false
							: true
						}
						onPress={() => {
							ControlPlaylist()
						}}
					>
					{CurrentPlaying &&
					!CurrentPlaying.isSongPlaying &&
					!CurrentPlaying.isPlaylistPlaying &&
					CurrentPlaying.currentPlayingSongId == item.id ? (
						<>
							<View style={styles.Delete_background}>
								<PlayIcon
								name="play"
								style={[styles.Play_Icon, {color: theme.colors.primary}]}
							/>
							</View>
							<Text style={[styles.row_behind, {color: theme.colors.text}]}>
								play
							</Text>
						</>
					) : (
						<>
						<View style={styles.Delete_background}>
							<PauseIcon
								name="pause"
								style={[styles.Play_Icon, {color: theme.colors.primary}]}
							/>
						</View>
						<Text style={[styles.row_behind, {color: theme.colors.text}]}>
							pause
						</Text>
						</>
					)}
					</TouchableOpacity>
				</View>
				<View
					style={[
					styles.List_Song,
					{
						borderBottomColor: theme.colors.text + '0D',
						backgroundColor: '#fff',
						borderRightWidth: 1,
						borderRightColor: theme.colors.text + '0D',
					},
					]}
					key={item.id}
				>
					<TouchableOpacity
						onLongPress={canReorder ? drag : null}
						disabled={isActive}
						style={styles.List_Song_Wrap}
						onPress={() => {
							//
						}}
					>
					 <Text
						style={[styles.List_Song_Title, {color: theme.colors.text}]}
						numberOfLines={1}
						ellipsizeMode="tail">
							
						{CurrentPlaying &&
						
						CurrentPlaying.currentPlayingSongId &&
						CurrentPlaying.currentPlayingSongId == item.id ? (
							
						<>
							<MusicalNotesIcon
								{...IconProps(22)}
								name="musical-note"
								style={[{color: theme.colors.text, fill: theme.colors.text}]}
							/>{' '}
						</>
						) : null}
						{item.title}
					</Text>
					<Text style={styles.List_Song_Duration}>
						{item.duration} .{' '}
						<Text
							onPress={() => {
								onShowLyrics(item.id, item.title, item.number)
							}}
							style={[
								styles.List_Song_Title,
								{
								textDecorationLine: 'underline',
								color: theme.colors.primary,
								},
							]}
						>
						{'Vis Tekst'}
						</Text>
					</Text>
					</TouchableOpacity>
					{canReorder ? (
						<TouchableOpacity
							style={[styles.Play_Btn,{backgroundColor: theme.colors.lighterBackground},]}
							onLongPress={drag}
							onPress={() => {}}
						>
							<DragHandleIcon
								{...IconProps(20)}
								name="drag-handle"
								style={[styles.Drag_Icon, {color: theme.colors.lighterText}]}
							/>
						</TouchableOpacity>
					) : (
					<TouchableOpacity
						style={[
						styles.Play_Btn,
						{backgroundColor: theme.colors.lighterBackground},
						CurrentPlaying &&
						CurrentPlaying.isPlaylistPlaying &&
						CurrentPlaying.currentPlaylistId == ActiveList.id &&
						CurrentPlaying.currentPlayingSongId
							? {opacity: 0.2}
							: {},
						]}
						disabled={
						CurrentPlaying &&
						CurrentPlaying.currentPlaylistId == ActiveList.id &&
						CurrentPlaying.isPlaylistPlaying &&
						CurrentPlaying.currentPlayingSongId
							? true
							: false
						}
						onPress={() => {
						if (
							CurrentPlaying &&
							CurrentPlaying.currentPlaylistId == ActiveList.id &&
							CurrentPlaying.currentPlayingSongId == item.id
						) {
							if (!CurrentPlaying.isPlaylistPlaying) {
							// ControlPlaylist()
							ResetPlayer()
							} else {
							PlaySong(item)
							}
						} else {
							PlaySong(item)
						}
						}}>
						{CurrentPlaying &&
						!CurrentPlaying.isPlaylistPlaying &&
						CurrentPlaying.currentPlaylistId == ActiveList.id &&
						CurrentPlaying.currentPlayingSongId == item.id ? (
						<StopIcon
							name="stop"
							{...IconProps(12)}
							style={[styles.Play_Icon, {color: theme.colors.primary}]}
						/>
						) : (
						<PlayIcon
							name="play"
							{...IconProps(12)}
							style={[styles.Play_Icon, {color: theme.colors.primary}]}
						/>
						)}
					</TouchableOpacity>
					)}
				</View>
			</SwipeRow>
		</CustomView>
		)
	}

	return (
		<>
			<GestureHandlerRootView style={{flex: 1}}>
				<View
					style={[
						styles.List_Info,
						{borderBottomColor: theme.colors.text + '0D',},
					]}
					onStartShouldSetResponder={() => true}
				>
					<View style={styles.List_Info_Inner}>
						<Text
							style={[styles.Playlists_Title, {color: theme.colors.text}]}
							numberOfLines={4}
						>
							{ActiveList.name}
						</Text>
						<View style={styles.List_Info_Inner_Wrap}>
							{/* <View style={{justifyContent: 'center'}}>
							<MaterialIcons
								name="playlist-play"
								style={[styles.Playlist_Btn_Icon, {marginTop: 3}]}
							/>
							</View> */}
							<View>
								<Text
									style={[
										styles.Playlists_Count,
										{color: theme.colors.lighterText},
									]}
								>
									{ActiveList.meta.songs_count} indspilninger
								</Text>
								<View style={styles.Text_Wrap}>
									{/* Require_translation */}
									<TouchableOpacity
										onPress={() => {
										OpenEditModal('Rediger')
										}}
									>
										<Text
											style={[
												styles.Playlists_Count,
												{
												color: theme.colors.primary,
												textDecorationLine: 'underline',
												paddingVertical: 5,
												},
											]}
										>
										Rediger
										</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={() => SetShowDeleteModal(true)}>
										{/* Require_translation */}
										<Text
											style={[
												styles.Playlists_Count,
												{
												color: 'red',
												textDecorationLine: 'underline',
												paddingVertical: 5,
												},
											]}
										>
										Slet spilleliste
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>
					<View style={{flexDirection: 'row'}}>
						<TouchableOpacity
							style={[
								styles.Play_Btn,
								styles.Play_Btn_Primary,
								{
								backgroundColor: !canReorder
									? theme.colors.lighterBackground
									: theme.colors.primary,
								marginRight: 10,
								},
								CurrentPlaying && CurrentPlaying.isPlaylistPlaying
								? {opacity: 0.7}
								: {}, 
							]}
							disabled={CurrentPlaying && CurrentPlaying.isPlaylistPlaying}
							onPress={() => {
								setcanReorder(prev => !prev)
							}}
						>
						<PlayListEditIcon
							name="playlist-edit"
							{...IconProps(20)}
							style={[
								styles.Play_Icon,
								styles.Play_Icon_Primary,
								{
								  color: canReorder
									? theme.colors.lighterBackground
									: theme.colors.primary,
								},
							  ]}
						/>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.Play_Btn,
								styles.Play_Btn_Primary,
								{
								backgroundColor:
									CurrentPlaying && CurrentPlaying.RepeatPlaylist
									? theme.colors.primary
									: theme.colors.lighterBackground,
								marginRight: 10,
								},
							]}
							disabled={
								CurrentPlaying && CurrentPlaying.isPlaylistPlaying
								? false
								: true
							}
							onPress={() => {
								UpdateRepeatMode('playlist')
							}}
						>
						<RepeatIcon
							name="repeat"
							{...IconProps(17)}
							style={[
							styles.Play_Icon,
							styles.Play_Icon_Primary,
							{
								color:
								CurrentPlaying && CurrentPlaying.RepeatPlaylist
									? theme.colors.lighterBackground
									: theme.colors.primary,
							},
							CurrentPlaying && CurrentPlaying.isPlaylistPlaying
								? {}
								: {opacity: 0.4},
							]}
						/>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.Play_Btn,
								styles.Play_Btn_Primary,
								{backgroundColor: theme.colors.primary},
								canReorder ||
								(CurrentPlaying &&
								!CurrentPlaying.isPlaylistPlaying &&
								CurrentPlaying.currentPlaylistId == ActiveList.id &&
								CurrentPlaying.currentPlayingSongId)
								? {opacity: 0.1, backgroundColor: '#b3bac2f7'}
								: {},
							]}
							disabled={
								(CurrentPlaying &&
								!CurrentPlaying.isPlaylistPlaying &&
								CurrentPlaying.currentPlaylistId == ActiveList.id &&
								CurrentPlaying.currentPlayingSongId) ||
								canReorder
								? true
								: false
							}
							onPress={() => {
								if (
								CurrentPlaying &&
								CurrentPlaying.isPlaylistPlaying &&
								CurrentPlaying.currentPlaylistId == ActiveList.id
								) {
								if (CurrentPlaying.isPlaylistPlaying) {
									ResetPlayer()
								} else {
									if (
									ActiveList.meta.songs_count &&
									parseInt(ActiveList.meta.songs_count) > 0 &&
									!PlayListSongsLoading
									) {
									PlayPlaylist(ActivePlayListSongs)
									}
								}
								} else {
								if (
									ActiveList.meta.songs_count &&
									parseInt(ActiveList.meta.songs_count) > 0 &&
									!PlayListSongsLoading
								) {
									PlayPlaylist(ActivePlayListSongs)
								}
								}
							}}
						>
						{CurrentPlaying &&
						CurrentPlaying.isPlaylistPlaying &&
						CurrentPlaying.currentPlaylistId == ActiveList.id &&
						CurrentPlaying.isSongPlaying ? (
							<StopIcon
								{...IconProps(12)}
								name="stop"
								style={[
									styles.Play_Icon,
									styles.Play_Icon_Primary,
									{color: theme.colors.lighterBackground},
									{ marginLeft: 0 }
								]}
							/>
						) : (
							<PlayIcon
								name="play"
								{...IconProps(12)}
								style={[
									styles.Play_Icon,
									styles.Play_Icon_Primary,
									{color: theme.colors.lighterBackground},
								]}
							/>
						)}
						</TouchableOpacity>
					</View>
				</View>
				<CustomList
					data={ActivePlayListSongs}
					style={styles.PlaylistContainer}
					onDragEnd={({data, from, to}) => {
						// console.log(data[to].id, 'test')
						onUpdatePosition(data[to].id, to, ActiveList.id)
						updateActivePlaylistSongs(data)
					}}
					onDragBegin={index => {
						// console.log('selected index', index)
					}}
					ListFooterComponent={() => {
						return <View style={{height: 300, width: '100%'}} />
					}}
					ListEmptyComponent={() => {
						if (PlayListSongsLoading) {
						return (
							<View
								style={[
									styles.SongslistEmpty,
									{backgroundColor: theme.colors.background},
								]}
							>
								<ActivityIndicator
									color={theme.colors.primary}
									size={'large'}
								/>
							</View>
						)
						} else {
						return (
							<View
								style={[
									styles.SongslistEmpty,
									{backgroundColor: theme.colors.background},
								]}
							>
							{/* Require_translation */}
								<Text
									style={[
									styles.Playlists_Title,
									{color: theme.colors.text},
									]}
								>
									{'Ingen titler tilføjet'}
								</Text>
							</View>
						)
						}
					}}
					renderItem={RenderItem}
					keyExtractor={item => item.id}
				/>
			</GestureHandlerRootView>
		</>
	) 
}

const styles = EStyleSheet.create({
	List_Info: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: deviceType === 'Tablet' ? '14rem' : '20rem',
		paddingVertical: deviceType === 'Tablet' ? '10rem' : '14rem',
		borderBottomWidth: 1,
	},
	List_Info_Inner: {
	  	flex: 1,
	},
	Playlist_Btn_Icon: {
		fontSize: deviceType === 'Tablet' ? '17.5rem' : '25rem',
		marginRight: deviceType === 'Tablet' ? '4rem' : '6rem',
	},
	Playlists_Title: {
		fontFamily: 'Sen-Bold',
		fontSize: deviceType === 'Tablet' ? '14.5rem' : '20rem',
		lineHeight: deviceType === 'Tablet' ? '17.5rem' : '25rem',
		paddingVertical: '7rem',
	},
	Playlists_Count: {
		fontFamily: 'Sen-Regular',
		fontSize: deviceType === 'Tablet' ? '9.5rem' : '14rem',
		marginRight: deviceType === 'Tablet' ? '5.5rem' : '8rem',
	},
	Text_Wrap: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	Playlist: {
	  	borderRadius: deviceType === 'Tablet' ? '7rem' : '10rem',
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
	All_Playlists_Inner: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	Play_Btn: {
		height: deviceType === 'Tablet' ? '21rem' : '30rem',
		width: deviceType === 'Tablet' ? '21rem' : '30rem',
		borderRadius: '20rem',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	dot_Btn: {
		height: deviceType === 'Tablet' ? '21rem' : '30rem',
		width: deviceType === 'Tablet' ? '21rem' : '30rem',
		borderRadius: '20rem',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	Play_Icon: {
		fontSize: deviceType === 'Tablet' ? '8rem' : '12rem',
		marginLeft: 2,
	},
	Drag_Icon: {
		fontSize: deviceType === 'Tablet' ? '14rem' : '20rem',
		marginLeft: 2,
	},
	Repeat_Icon: {
	  	fontSize: deviceType === 'Tablet' ? '12rem' : '16rem',
	},
	Repeat_Background: {
		height: deviceType === 'Tablet' ? '19rem' : '23rem',
		width: deviceType === 'Tablet' ? '19rem' : '23rem',
		borderRadius: '30rem',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 2,
	},
	Delete_Icon: {
	  	fontSize: deviceType === 'Tablet' ? '9rem' : '13rem',
	},
	Delete_background: {
		height: deviceType === 'Tablet' ? '19rem' : '23rem',
		width: deviceType === 'Tablet' ? '19rem' : '23rem',
		borderRadius: '30rem',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 2,
	},
	Play_Btn_Primary: {
		height: deviceType === 'Tablet' ? '24.5rem' : '35rem',
		width: deviceType === 'Tablet' ? '24.5rem' : '35rem',
	},
	Play_Icon_Primary: {
		fontSize: deviceType === 'Tablet' ? '10.5rem' : '18rem',
		marginLeft: 3,
	},
	List_Song: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: deviceType === 'Tablet' ? '14rem' : '20rem',
		paddingVertical: deviceType === 'Tablet' ? '10rem' : '14rem',
		borderBottomWidth: 1,
	},
	List_Song_Wrap: {
		flex: 1,
		paddingRight: 20,
	},
	List_Song_Title: {
		fontFamily: 'Sen-Bold',
		fontSize: deviceType === 'Tablet' ? '10.5rem' : '15rem',
		lineHeight: deviceType === 'Tablet' ? '17.5rem' : '25rem',
	},
	List_Song_Duration: {
		fontFamily: 'Sen-Regular',
		color: 'rgba(0,0,0,0.5)',
		fontSize: deviceType === 'Tablet' ? '10.5rem' : '15rem',
	},
	SongslistEmpty: {
		alignItems: 'center',
		justifyContent: 'center',
		height: height * 0.3,
	},
	List_Info_Inner_Wrap: {
	  	flexDirection: 'row',
	},
	rowBack: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		paddingLeft: 15,
		paddingRight: 15,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75,
	},
	row_behind: {
		fontFamily: 'Sen-Regular',
		fontSize: deviceType === 'Tablet' ? '9.5rem' : '12rem',
		marginTop: 5,
	},
})

export default PlaylistSongs
