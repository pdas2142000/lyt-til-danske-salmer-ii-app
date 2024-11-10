/**React Imports */
import React, {createContext, useState, useEffect, useContext} from 'react'
import {View, Platform, AppState, Dimensions} from 'react-native'

/**Libraries */
import TrackPlayer,
{
	Capability,
	Event,
	RepeatMode,
	State,
	usePlaybackState,
	useProgress,
	useTrackPlayerEvents,
  }
from 'react-native-track-player'
import EStyleSheet from 'react-native-extended-stylesheet'

/**Components */
import { ShowToast } from '../../services/toast-message'
import {BuildTrackSongObject, GetPlayableUrl} from '../../utils/player-fn'

/**Local Imports */
import { ms } from '../../utils/helpers/metrics'
import { Fonts } from '../../utils/constants'

const Default_options = {
  isPlaylistPlaying: false,
  currentPlayingSongId: null,
  currentPlaylistId: null,
  RepeatPlaylist: false,
  RepeatSong: false,
  isSongPlaying: false,
}

//this compoenet is only for player and lyrics
export const PlaylistPlayContext = createContext()
const {height} = Dimensions.get('window')

/**Main Export */
export const PlaylistPlayProvider = ({children}) => {

	const [CurrentPlaying, SetCurrentPlay] = useState(Default_options)
	const [PlayerSetupComplete, SetPlayerSetupComplete] = useState(false)
	const [Songs, SetSongs] = useState([])
	const [SongLoading, SetSongLoading] = useState(false)
	const playbackState = usePlaybackState()
	const progress = useProgress()
	// console.log(progress, 'progress')
	
	const PlayPlayList = async (songs, playlistId) => {
		setupPlayer(songs, 'playlist', playlistId)
	}

	useEffect(() => {
		if (
		  CurrentPlaying.isPlaylistPlaying ||
		  CurrentPlaying.currentPlayingSongId != null
		) {
		  // if (playbackState === State.Playing) {
		  //   SetCurrentPlay(prev => {
		  //     return {...prev, isSongPlaying: true}
		  //   })
		  // } else {
		  //   SetCurrentPlay(prev => {
		  //     return {...prev, isSongPlaying: false}
		  //   })
		  // }
		}
	}, [playbackState])
	
	const SetUpplayer = async () => {
		try {
			console.log('setupn platyer await')
			await TrackPlayer.setupPlayer({})
			SetPlayerSetupComplete(true)
		} catch (error) {
			console.log('failed while setingup player')
		}
	}

	useEffect(() => {
		if (Platform.OS === 'ios') {
		  SetUpplayer()
		}
	
		const handleAppStateChange = nextAppState => {
			if (nextAppState === 'active') {
				if (Platform.OS === 'android') {
				TrackPlayer.setupPlayer()
					.then(() => {
					console.log('player setup done')
					// alert('player done')
					})
					.catch(error => {
					// alert('player error ' + error)
					console.log('player setup failed')
					console.log('setup called again error', error)
					// Handle any errors that occur during setup
					})
				}
			} else if (nextAppState === 'background') {
				// Handle any necessary clean-up or pause playback if required
			}
		}
	
		const subscription = AppState.addEventListener('change', handleAppStateChange)
	
		return () => {
		  subscription.remove()
		}
	  }, [])

	const PlayPlayListSong = async (song, playlistId) => {
		// console.log('song setup')
		setupPlayer([song], 'song', playlistId)
	}

	const ControlPlaylist = async () => {
		if (CurrentPlaying.isSongPlaying) {
			SetCurrentPlay(prev => {
			return {...prev, isSongPlaying: false}
			})
			await TrackPlayer.pause()
		} else {
			SetCurrentPlay(prev => {
			return {...prev, isSongPlaying: true}
			})
			await TrackPlayer.play()
		}
	}
	
	const PlayPlayer = async () => {
		await TrackPlayer.play()
	}

	const UpdateRepeatMode = async repeat => {
		if (repeat === 'playlist') {
			let repeat = false
			if (!CurrentPlaying.RepeatPlaylist) {
			repeat = true
			await TrackPlayer.setRepeatMode(RepeatMode.Queue)
			} else {
			await TrackPlayer.setRepeatMode(RepeatMode.Off)
			}
			SetCurrentPlay(prev => ({...prev, RepeatPlaylist: repeat}))
		} else if (repeat === 'song') {
			let repeat = false
			if (!CurrentPlaying.RepeatSong) {
			repeat = true
			console.log('set to tack')
			await TrackPlayer.setRepeatMode(RepeatMode.Track)
			} else {
			await TrackPlayer.setRepeatMode(RepeatMode.Off)
			}
			SetCurrentPlay(prev => ({...prev, RepeatSong: repeat}))
		}
	}

	const setupPlayer = async (songs, type, playlistId) => {
		try {
			if (Array.isArray(songs) && songs.length > 0) {
			SetSongLoading(true)
			let ModifiedSongObjects = []
			let filteredSongs = songs.filter(item => {
				return item.canPlay == true
			})
			SetSongs(filteredSongs)
			if (filteredSongs.length > 0) {
				//   SetCurrentSongDetails({
				//     title: filteredSongs[0].title,
				//     author: filteredSongs[0].author,
				//     showLyrics: filteredSongs[0].lyrics,
				//     id: filteredSongs[0].id,
				//     number: filteredSongs[0].number,
				//   })
				SetCurrentPlay(prev => {
				if (type === 'playlist') {
					return {
					isPlaylistPlaying: true,
					currentPlayingSongId: filteredSongs[0].id,
					currentPlaylistId: playlistId,
					RepeatPlaylist: false,
					RepeatSong: false,
					isSongPlaying: true,
					}
				} else {
					return {
					isPlaylistPlaying: false,
					currentPlayingSongId: filteredSongs[0].id,
					currentPlaylistId: playlistId,
					RepeatPlaylist: false,
					RepeatSong: false,
					isSongPlaying: true,
					}
				}
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
				AddtTrackToList(ModifiedSongObjects, true)
				}
			} else {
				ShowToast('Fejl: lydfil kan ikke afspilles', 'error')
			}
			SetSongLoading(false)
			} else {
			}
		} catch (err) {
			console.log('error while settting up player', err)
		}
	}

	useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
	console.log('event trigger context', event)
	try {
		if (
		CurrentPlaying.isPlaylistPlaying ||
		CurrentPlaying.currentPlayingSongId != null
		) {
		console.log('event trigger inside context', CurrentPlaying, event)
		let quew2 = await TrackPlayer.getQueue()
		if (
			event.type === Event.PlaybackTrackChanged &&
			event.nextTrack != null &&
			(quew2.length == 1 ||
			(Platform.OS == 'ios' && quew2.length - 2 > event.nextTrack) ||
			(Platform.OS == 'android' && quew2.length > event.nextTrack))
		) {
			const track = await TrackPlayer.getTrack(event.nextTrack)
			const {title, artist} = track || {}
			if (track.url == 'http://') {
			LoadNextSong(track)
			}
			SetCurrentPlay(prev => ({
			...prev,
			currentPlayingSongId: track.songInfo.id,
			}))
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
		if (
			quew2.length - 2 == event.nextTrack &&
			CurrentPlaying.RepeatPlaylist &&
			Platform.OS == 'ios'
		) {
			await TrackPlayer.skip(0)
		}
		if (
			quew2.length - 2 == event.nextTrack &&
			!CurrentPlaying.RepeatPlaylist &&
			Platform.OS == 'ios'
		) {
			SetCurrentPlay(Default_options)
		}
		if (
			Platform.OS === 'android' &&
			event.type === Event.PlaybackTrackChanged &&
			!event.hasOwnProperty('nextTrack')
		) {
			console.log('opytions have reseted')
			SetCurrentPlay(Default_options)
		}
		let mode = await TrackPlayer.getRepeatMode()
		console.log(mode, 'check mode')
		if (
			Platform.OS === 'ios' &&
			CurrentPlaying.RepeatSong &&
			quew2.length == 1 &&
			event.hasOwnProperty('nextTrack') &&
			event.hasOwnProperty('track') &&
			event.track == 0 &&
			event.nextTrack == 0
		) {
			console.log(
			'signle repeat',
			event.hasOwnProperty('nextTrack') && event.nextTrack == 0,
			)
			await TrackPlayer.reset()
			await TrackPlayer.add(quew2)
			await TrackPlayer.setRepeatMode(RepeatMode.Track)
			console.log('signle repeat', event.hasOwnProperty('nextTrack'))

			// AddtTrackToList(quew2, true)
		}
		}
	} catch (error) {
		console.log('error in useevent track in Playlistplay', error)
	}
	})

	const LoadNextSong = async nextTrack => {
		try {
			console.log('next song load')
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
			let nextTrack3 = await TrackPlayer.add(obj, index + 1)
			if (quew2.length > index + 2) {
				let nextTrack4 = await TrackPlayer.add(obj, index + 2)
			}
			let quew3 = await TrackPlayer.getQueue()
			if (quew2.length > index + 2) {
				// console.log('Skip to next triggered')
				await TrackPlayer.skipToNext()
			}
			let quew4 = await TrackPlayer.getQueue()
			// console.log(quew4, 'quew3')
			}

			await TrackPlayer.play()
		} catch (err) {
			console.log(err, 'err tNext')
		}
	}

	const AddtTrackToList = async (songs, reset) => {
		try {
			if (reset) {
			await TrackPlayer.setRepeatMode(RepeatMode.Off)
			}
			TrackPlayer.updateOptions({
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
			// console.log('songs,s', songs, PlayerSetupFinished)
			await TrackPlayer.add(songs)
			console.log(songs.length, 'songs.length')
			await TrackPlayer.setVolume(0.3)
			// await PlayPlayer()
		} catch (err) {
			console.log('failed to add tracks', err)
		}
	}

	const KillPlayListPlayer = async () => {
		try {
			SetCurrentPlay(Default_options)
			await TrackPlayer.reset()
			return true
		} catch (error) {
			console.log('kill player error', error)
			return true
		}
	}

	return (
		<PlaylistPlayContext.Provider
			value={{
				PlayPlayList,
				PlayPlayListSong,
				KillPlayListPlayer,
				ControlPlaylist,
				CurrentPlaying,
				UpdateRepeatMode,
			}}
		>
			<View style={{flex: 1}}>{children}</View>
		</PlaylistPlayContext.Provider>
	)
}

const styles = EStyleSheet.create({
	PopUP: {
		height: height * 0.7,
		borderTopLeftRadius: '10rem',
		borderTopRightRadius: '10rem',
		paddingHorizontal: '15rem',
	},
	Header: {
		marginVertical: '15rem',
		alignItems: 'center',
	},
	HeaderBar: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		height: '3rem',
		width: '80rem',
	},
	LyricsText: {
		fontSize: '16rem',
		fontFamily: 'Sen-Regular',
	},
	Song_Title: {
		fontSize: '18rem',
		fontFamily: 'Sen-Bold',
		marginVertical: '10rem',
		paddingHorizontal: '10rem',
	},
})
