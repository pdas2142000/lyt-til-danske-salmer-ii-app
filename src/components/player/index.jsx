/**React Imports */
import React, {useEffect, useState, useMemo, useContext} from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform
} from 'react-native'

/**Libraries */
import {Slider} from '@miblanchard/react-native-slider'
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player'
import {getDeviceType} from 'react-native-device-info'
import EStyleSheet from 'react-native-extended-stylesheet'

/**Local Imports */
import { IconProps } from '../../utils/helpers/iconprops'
import {BuildTrackSongObject, GetPlayableUrl} from '../../utils/player-fn'
import { ShowToast } from '../../services/toast-message'
import { ThemeContext } from '../../context/theme-context'
import { pushToAnalytics } from '../../services/analytics'
import { AuthContext } from '../../context/auth-context'

/**Icons */
import CloseIcon from '../../../assets/icons/times.svg'
import PlaySkipBackIcon from '../../../assets/icons/play_skip_back.svg'
import PlayBackIcon from '../../../assets/icons/play_back.svg'
import PlayIcon from '../../../assets/icons/play.svg'
import PauseIcon from '../../../assets/icons/pause.svg'
import PlayForwardIcon from '../../../assets/icons/play_forward.svg'
import PlaySkipForwardIcon from '../../../assets/icons/play_skip_forward.svg'
import RepeatOneIcon from '../../../assets/icons/repeat_one.svg'

let deviceType = getDeviceType()

/**Main Export */
const Player = ({SetShowPlayer, songs, ShowLyrics, type}) => {

    const {theme} = useContext(ThemeContext)
    const {TrackingPermissionEnabled} = useContext(AuthContext)
    const playbackState = usePlaybackState()
    const progress = useProgress()
    const [LoadingSong, SetLoadingSong] = useState(false)
    const [Songs, SetSongs] = useState([])
    const [disableRepeat, SedisableRepeat] = useState(false)
    const [RepeatOnce, SetRepeatOnce] = useState(false)
    const [RepeatPlayList, SetRepeatPlayList] = useState(false)

    const [CurrentSongDetails, SetCurrentSongDetails] = useState({
		id: 0,
		title: '',
		author: '',
		showLyrics: false,
		number: 0,
		playlistId: null,
    })

	const SetRepeat = async type => {
		try {
		if (type === 'song') {
			SetRepeatOnce(!RepeatOnce)
			SetRepeatPlayList(false)
			if (!RepeatOnce) {
				await TrackPlayer.setRepeatMode(RepeatMode.Track)
			} else {
				await TrackPlayer.setRepeatMode(RepeatMode.Off)
			}
		} else if (type === 'playlist') {
			SetRepeatPlayList(!RepeatPlayList)
			SetRepeatOnce(false)
			if (!RepeatPlayList) {
				await TrackPlayer.setRepeatMode(RepeatMode.Queue)
			} else {
				await TrackPlayer.setRepeatMode(RepeatMode.Off)
			}
		}
		} catch (err) {
			console.log('err at repeat', err)
		}
	}

	useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
		
		// console.log('event1', event, RepeatOnce, RepeatPlayList)
		let mode = await TrackPlayer.getRepeatMode()

		// console.log(mode, 'mode,mode')
		if (event.type === Event.PlaybackTrackChanged && RepeatOnce) {
		// await TrackPlayer.setRepeatMode(RepeatMode.Track)
		// SetRepeatOnce(false)
		}
		console.log(event, mode, 'mode')
		if (event.type === Event.PlaybackTrackChanged && RepeatOnce) {
		// await TrackPlayer.setRepeatMode(RepeatMode.Off)
		}
		let quew2 = await TrackPlayer.getQueue()
		// console.log('mainque', quew2)
		if (
		event.type === Event.PlaybackTrackChanged &&
		event.nextTrack != null &&
		(quew2.length == 1 ||
			(Platform.OS == 'ios' && quew2.length - 2 > event.nextTrack) ||
			(Platform.OS == 'android' && quew2.length > event.nextTrack))
		) {
		const track = await TrackPlayer.getTrack(event.nextTrack)
		const {title, artist} = track || {}
		console.log(track, 'track')
		if (track.url == 'http://') {
			LoadNextSong(track)
		}
		SetCurrentSongDetails({
			title: title,
			author: artist,
			showLyrics: track.songInfo.showLyrics,
			id: track.songInfo.id,
			duration: track.duration,
			number: track.songInfo.number,
			playlistId: track.songInfo.playlistId,
		})
		if (Platform.OS == 'android') {
			PlayPlayer()
		} else {
			setTimeout(() => {
			PlayPlayer()
			}, 800)
		}
		}
		if (quew2.length == Songs.length + 2) {
			let nextTrack2 = await TrackPlayer.remove(event.track)
			let nextTrack3 = await TrackPlayer.remove(event.track + 1)
			console.log('removed tracks')
		}
		if (quew2.length - 2 == event.nextTrack && RepeatPlayList) {
			await TrackPlayer.skip(0)
		}
	})

  //triggered when song end and have to start next song
	const LoadNextSong = async nextTrack => {
		try {
		let index = await TrackPlayer.getCurrentTrack()
		let PlayUrlOfFirstSong = await GetPlayableUrl(
			nextTrack.songInfo.id,
			nextTrack.songInfo.playlistId,
		)
		let obj = BuildTrackSongObject(
			nextTrack.songInfo.id,
			nextTrack.songInfo.showLyrics,
			PlayUrlOfFirstSong.data.url,
			nextTrack.title,
			nextTrack.artist,
			nextTrack.songInfo.number,
			PlayUrlOfFirstSong.data.duration,
			nextTrack.songInfo.playlistId,
		)
		// console.log(index, 'succ')
		if (Platform.OS == 'android') {
			let quew2 = await TrackPlayer.getQueue()

			// if (quew2.length == index + 2) {
			//   console.log(quew2, 'onlast of 2')
			//   let nextTrack2 = await TrackPlayer.remove(index + 1)
			//   let nextTrack3 = await TrackPlayer.add(obj)
			//   PlayLast = true
			// } else {
			//   console.log(quew2, 'mean while of 2')
			let nextTrack3 = await TrackPlayer.add(obj, index + 1)

			// }
			await TrackPlayer.skipToNext()
			let nextTrack2 = await TrackPlayer.remove(index)
		} else {
			let quew2 = await TrackPlayer.getQueue()
			// console.log(quew2, 'quew1')
			// if (quew2.length == index + 2) {
			//   console.log(quew2, 'onlast of 2')
			//   let nextTrack2 = await TrackPlayer.remove(index + 1)
			//   let nextTrack3 = await TrackPlayer.add(obj)
			//   PlayLast = true
			// } else {
			//   console.log(quew2, 'mean while of 2')
			let nextTrack3 = await TrackPlayer.add(obj, index + 1)
			console.log('qued0', quew2)
			if (quew2.length > index + 2) {
			let nextTrack4 = await TrackPlayer.add(obj, index + 2)
			}
			let quew3 = await TrackPlayer.getQueue()
			// console.log(quew3, 'quew2')
			// }
			console.log('qued', quew3)
			if (quew2.length > index + 2) {
				console.log('skiped to next')
			await TrackPlayer.skipToNext()
			}
			// let nextTrack2 = await TrackPlayer.remove(index)
			// if (quew2.length > index + 2) {
			//   let nextTrack5 = await TrackPlayer.remove(index + 1)
			// }
			// console.log(nextTrack2, 'nextTrack2')
			let quew4 = await TrackPlayer.getQueue()
			// console.log(quew4, 'quew3')
		}
		await TrackPlayer.play()
		} catch (err) {
		console.log(err, 'err tNext')
		}
	}

	//triggered when user clicks next in-app player
	const PlaynextTrack = async () => {
		try {
		SetRepeatOnce(false)
		if (RepeatPlayList) {
			await TrackPlayer.setRepeatMode(RepeatMode.Queue)
		} else {
			await TrackPlayer.setRepeatMode(RepeatMode.Off)
		}
		let index = await TrackPlayer.getCurrentTrack()
		let nextTrack = await TrackPlayer.getTrack(index + 1)
		let PlayLast = false
		if (nextTrack) {
			let quew2 = await TrackPlayer.getQueue()
			if (nextTrack.url == 'http://') {
			let PlayUrlOfFirstSong = await GetPlayableUrl(
				nextTrack.songInfo.id,
				nextTrack.songInfo.playlistId,
			)
			let obj = BuildTrackSongObject(
				nextTrack.songInfo.id,
				nextTrack.songInfo.showLyrics,
				PlayUrlOfFirstSong.data.url,
				nextTrack.title,
				nextTrack.artist,
				nextTrack.songInfo.number,
				PlayUrlOfFirstSong.data.duration,
				nextTrack.songInfo.playlistId,
			)
			// console.log(index, 'succ')

			if (Platform.OS == 'android') {
				if (quew2.length == index + 2) {
				// console.log(quew2, 'onlast')
				let nextTrack2 = await TrackPlayer.remove(index + 1)
				let nextTrack3 = await TrackPlayer.add(obj)
				PlayLast = true
				} else {
				// console.log(quew2, 'mean while')
				let nextTrack3 = await TrackPlayer.add(obj, index + 1)
				let nextTrack2 = await TrackPlayer.remove(index + 2)
				}
			} else {
				if (quew2.length == index + 2) {
				// console.log(quew2, 'onlast')
				let nextTrack2 = await TrackPlayer.remove(index + 1)
				let nextTrack3 = await TrackPlayer.add(obj)
				PlayLast = true
				} else {
				// console.log(quew2, 'mean while')
				let nextTrack3 = await TrackPlayer.add(obj, index + 1)
				let nextTrack2 = await TrackPlayer.remove(index + 2)
				}
			}
			}
			if (quew2.length > index + 3 && Platform.OS == 'ios') {
			await TrackPlayer.skipToNext()
			}
			if (Platform.OS === 'android') {
			await TrackPlayer.skipToNext()
			}
			if (PlayLast) {
			await TrackPlayer.play()
			}
		}
		} catch (err) {
		console.log(err, 'failed to skip song')
		}
	}

	const PreviousTrack = async () => {
		
		try {
		SetRepeatOnce(false)
		if (RepeatPlayList) {
			await TrackPlayer.setRepeatMode(RepeatMode.Queue)
		} else {
			await TrackPlayer.setRepeatMode(RepeatMode.Off)
		}
		await TrackPlayer.skipToPrevious()
		} catch (err) {
		console.log(err, 'failed to skip song')
		}
	}

	const NextFive = async () => {
		await TrackPlayer.seekTo(Number(progress.position + 5))
	}

	const PreviousFive = async () => {
		await TrackPlayer.seekTo(Number(progress.position - 5))
	}

	const SetupPlayer = async songs => {
		
		try {
		if (Array.isArray(songs) && songs.length > 0) {
			SetLoadingSong(true)
			let ModifiedSongObjects = []
			let filteredSongs = songs.filter(item => {
			return item.canPlay == true
			})
			SetSongs(filteredSongs)
			console.log(filteredSongs)
			if (filteredSongs.length > 0) {
			SetCurrentSongDetails({
				title: filteredSongs[0].title,
				author: filteredSongs[0].author,
				showLyrics: filteredSongs[0].lyrics,
				id: filteredSongs[0].id,
				number: filteredSongs[0].number,
			})
			let PlayUrlOfFirstSong = await GetPlayableUrl(
				filteredSongs[0].id,
				filteredSongs[0].playlistId,
			)
			
			for (let i = 0; i < filteredSongs.length; i++) {
				ModifiedSongObjects.push(
				BuildTrackSongObject(
					filteredSongs[i].id,
					filteredSongs[i].lyrics,
					i == 0 ? PlayUrlOfFirstSong.data.url : null,
					filteredSongs[i].title,
					filteredSongs[i].author,
					filteredSongs[i].number,
					filteredSongs[i].duration,
					filteredSongs[0].playlistId,
				),
				)
			}
			if (ModifiedSongObjects.length > 0) {
				// console.log(ModifiedSongObjects, 'songsw')
				AddtTrackToList(ModifiedSongObjects)
			}
			} else {
			SetShowPlayer(false)
			ShowToast('Fejl: lydfil kan ikke afspilles', 'error')
			}
			SetLoadingSong(false)
		} else {
		}
		} catch (err) {
		console.log('error while settting up player', err)
		}
	}

	const AddtTrackToList = async songs => {
		try {
			await TrackPlayer.updateOptions({
				stopWithApp: true,
				capabilities: [
				Capability.Play,
				Capability.Pause,
				Capability.SkipToNext,
				Capability.SkipToPrevious,
				],
				compactCapabilities: [
				Capability.Play,
				Capability.Pause,
				Capability.SkipToNext,
				Capability.SkipToPrevious,
				],
				notificationCapabilities: [
				Capability.Play,
				Capability.Pause,
				Capability.SkipToNext,
				Capability.SkipToPrevious,
				],
			})
			console.log('songs,s', songs.length)
			await TrackPlayer.add(songs)

			await TrackPlayer.setVolume(0.3)
		// await PlayPlayer()
		} catch (err) {
			console.log('failed to add tracks', err)
		}
	}

	const PlayPlayer = async () => {
		await TrackPlayer.play()
	}

	const PausePlayer = async () => {
		try {
			await TrackPlayer.pause()
			console.log('paused triggered')
		} catch (err) {
			console.log(err, 'err')
		}
	}

	const ResetPlayer = async songs => {
		try {
			await TrackPlayer.reset()
			SetupPlayer(songs)
		} catch (err) {
			console.log(err, 'reset player')
			SetupPlayer(songs)
		}
	}

	const GetFormattedTime = position => {
		let time = '00:00'
		if (position > 0) {
		time = new Date(position * 1000).toISOString().substr(14, 5)
		}
		return time
	}

	useEffect(() => {
		SetupPlayer(songs)
	}, [songs])

	useEffect(() => {
		if (type == 'shuffle' || type == 'single') {
		SedisableRepeat(true)
		} else {
		SedisableRepeat(false)
		}
	}, [type])
  
  return (
    <View style={styles.Music_Player}>
		<View style={styles.Header_Player}>
			<View style={styles.Song}>
				<Text
					style={[styles.Song_Title, {color: theme.colors.text}]}
					numberOfLines={1}
					ellipsizeMode="tail">
					{CurrentSongDetails.title ? CurrentSongDetails.title : ''}
				</Text>
				{/* Require_translation */}
				{CurrentSongDetails.showLyrics ? (
					<Text
						style={[styles.ShowLyricsText, {color: theme.colors.primary}]}
						onPress={() => {
							pushToAnalytics(
							`${CurrentSongDetails.number}_view_text`,
							{
								title: CurrentSongDetails.title,
							},
							TrackingPermissionEnabled,
							)
							ShowLyrics(
								CurrentSongDetails.id,
								CurrentSongDetails.title ? CurrentSongDetails.title : '',
							)
						}}
					>
						{'Vis tekst'}
					</Text>
				) : null}
			</View>
			<TouchableOpacity
				style={styles.Close_Player}
				onPress={async () => {
					try {
					SetShowPlayer(false)
					await TrackPlayer.reset()
					} catch (err) {
					console.log('failed while closing player', err)
					}
				}}
			>
			<CloseIcon
				name="times"
				{...IconProps(20)}
				style={[styles.Close_Player_Icon, {fill: theme.colors.text}]}
			/>
			</TouchableOpacity>
		</View>
		<View style={styles.Track}>
			<Text style={[styles.Track_Time, {color: theme.colors.lighterText}]}>
				{GetFormattedTime(progress.position)}
			</Text>
			<View style={styles.Track_Bar}>
				<Slider
					value={Number(progress.position)}
					onValueChange={value => console.log(value)}
					minimumValue={0}
					maximumValue={
					CurrentSongDetails.duration
						? Number(CurrentSongDetails.duration)
						: 0
					}
					maximumTrackTintColor="rgba(0,0,0,0.05)"
					minimumTrackTintColor="#000"
					thumbTintColor="#000"
					thumbStyle={{
					height: 12.5,
					width: 12.5,
					}}
					thumbTouchSize={{
					height: 20,
					width: 20,
					}}
					
				/>
			</View>
			<Text style={[styles.Track_Time, {color: theme.colors.lighterText}]}>
				{GetFormattedTime(CurrentSongDetails.duration - progress.position)}
			</Text>
		</View>
		<View style={styles.Controls}>
			<TouchableOpacity
				style={[
					styles.Controls_Btn,
					styles.selected_btn,
					RepeatPlayList ? {backgroundColor: 'rgba(0,0,0,0.1)'} : {},
				]}
				disabled
				// disabled={!disableRepeat ? false : true}
				onPress={() => {
					SetRepeat('playlist')
				}}
			>
		
			</TouchableOpacity>
			<TouchableOpacity style={styles.Controls_Btn} onPress={PreviousTrack}>
				<PlaySkipBackIcon
					name="play-skip-back"
					{...IconProps(25)}
					style={[
						styles.Controls_Icon,
						{color: theme.colors.PlayButtonBackground},
					]}
				/>
			</TouchableOpacity>
			<TouchableOpacity style={styles.Controls_Btn} onPress={PreviousFive}>
				<PlayBackIcon
					{...IconProps(25)}
					name="play-back"
					style={[
						styles.Controls_Icon,
						{color: theme.colors.PlayButtonBackground},
					]}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				style={[
					styles.Controls_Btn,
					styles.Play_Btn,
					{backgroundColor: theme.colors.PlayButtonBackground},
				]}
				// disabled={LoadingSong}
				onPress={() => {
					playbackState.state === State.Playing ? PausePlayer() : PlayPlayer()

				}}
			>
			{LoadingSong ? (
				<ActivityIndicator color={theme.colors.background} size={'small'} />
			) : (
			<>
				{playbackState.state === State.Playing ? 
					<PauseIcon
						style={[
							styles.Play_Icon,
							{color: theme.colors.PlayButtonText},
						]}
					/>:
					<PlayIcon
						style={[
							styles.Play_Icon,
							{color: theme.colors.PlayButtonText},
							styles.Btn_Marg_Lg,
						]}
					/>
				}
			</>
			)}
			</TouchableOpacity>
			<TouchableOpacity style={styles.Controls_Btn} onPress={NextFive}>
				<PlayForwardIcon
					{...IconProps(25)}
						name="play-forward"
						style={[
						styles.Controls_Icon,
						{color: theme.colors.PlayButtonBackground},
						]}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				disabled={Array.isArray(Songs) && Songs.length === 1}
				style={styles.Controls_Btn}
				onPress={PlaynextTrack}
			>
			<PlaySkipForwardIcon
				name="play-skip-forward"
				{...IconProps(25)}
				style={[
					styles.Controls_Icon,
					{color: theme.colors.PlayButtonBackground},
					Array.isArray(Songs) && Songs.length === 1
						? {color: theme.colors.lighterText}
						: {},
				]}
			/>
			</TouchableOpacity>
			<TouchableOpacity
				style={[
					styles.Controls_Btn,
					styles.selected_btn,
					RepeatOnce ? {backgroundColor: 'rgba(0,0,0,0.1)'} : {},
				]}
				onPress={() => {
					SetRepeat('song')
				}}
			>
			<RepeatOneIcon
				name="repeat-one"
				{...IconProps(25)}
				style={[
					styles.Controls_Icon,
					{color: theme.colors.PlayButtonBackground, fill: theme.colors.PlayButtonBackground},
				]}
			/>
			</TouchableOpacity>
		</View>
    </View>
  )
}

const styles = EStyleSheet.create({
	Header_Player: {
		flexDirection: 'row',
		marginTop: deviceType === 'Tablet' ? '4.5rem' : '6rem',
		marginBottom: deviceType === 'Tablet' ? '8.5rem' : '12rem',
	},
	Music_Player: {
		padding: deviceType === 'Tablet' ? '17.5rem' : '25rem',
		paddingTop: deviceType === 'Tablet' ? '10.5rem' : '15rem',
		borderTopWidth: 1,
		borderTopColor: 'rgba(0,0,0,0.1)',
		borderTopLeftRadius: '10rem',
		borderTopRightRadius: '10rem',
	},
	Close_Player: {
		paddingLeft: deviceType === 'Tablet' ? '8.5rem' : '12rem',
		marginLeft: deviceType === 'Tablet' ? '8.5rem' : '15rem',
		marginTop: '5rem',
	},
	Close_Player_Icon: {
		fontSize: deviceType === 'Tablet' ? '13rem' : '20rem',
	},
	ShowLyricsText: {
		fontFamily: 'Sen-Bold',
		fontSize: deviceType === 'Tablet' ? '10rem' : '14rem',
		marginTop: '5rem',
	},
	Song: {
		flex: 1,
	},
	Song_Title: {
		fontSize: deviceType === 'Tablet' ? '13rem' : '18rem',
		fontFamily: 'Sen-Bold',
	},
	Track: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: deviceType === 'Tablet' ? '14rem' : '20rem',
	},
	Track_Time: {
		fontSize: deviceType === 'Tablet' ? '9.5rem' : '14rem',
		fontFamily: 'Sen-Regular',
	},
	Track_Bar: {
		flex: 1,
		marginHorizontal: 10,
	},
	Controls: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	Controls_Btn: {
		marginHorizontal: deviceType === 'Tablet' ? '7rem' : '10rem',
		padding: deviceType === 'Tablet' ? '3.5rem' : '5rem',
		justifyContent: 'center',
	},
	Play_Btn: {
		padding: 0,
		height: deviceType === 'Tablet' ? '35rem' : '50rem',
		width: deviceType === 'Tablet' ? '35rem' : '50rem',
		borderRadius: deviceType === 'Tablet' ? '17.5rem' : '25rem',
		alignItems: 'center',
		justifyContent: 'center',
	},
	Controls_Icon: {
		fontSize: deviceType === 'Tablet' ? '17.5rem' : '25rem',
	},
	Repeat_Icon: {
		fontSize: deviceType === 'Tablet' ? '14.5rem' : '22rem',
	},
	Play_Icon: {
		width: deviceType === 'Tablet' ? '24.5rem' : '28rem',
		height: deviceType === 'Tablet' ? '24.5rem' : '28rem',
	},
	Btn_Marg_Lg: {
		marginLeft: deviceType === 'Tablet' ? '3.5rem' : '5rem',
	},
	disabled_Icon: {},
	selected_btn: {
		borderRadius: 50,
	},
})

export default Player
