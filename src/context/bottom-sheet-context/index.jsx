/**React Imports */
import React, {createContext, useState, useContext} from 'react'
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native'

/**Libraries */
import Modal from 'react-native-modal'
import TrackPlayer from 'react-native-track-player'
import EStyleSheet from 'react-native-extended-stylesheet'

/**Components */
import Player from '../../components/player'

/**Local Imports */
import { makeRequest } from '../../utils/make-request'
import { ThemeContext } from '../theme-context'
import { AuthContext } from '../auth-context'

/**Local Imports */
import { ms } from '../../utils/helpers/metrics'
import { Fonts } from '../../utils/constants'

//this compoenet is only for player and lyrics
export const BottomSheetContext = createContext()
const {height} = Dimensions.get('window')

/**Main Export */
export const BottomSheetProvider = ({children}) => {

	const {theme} = useContext(ThemeContext)
	const {UserData, TrackingPermissionEnabled} = useContext(AuthContext)
	const [ShowPlayer, SetShowPlayer] = useState(false)
	const [Songs, SetSongs] = useState([])
	const [type, settype] = useState('single')
	const [CurrentSongLyrics, SetCurrentSongLyrics] = useState({
		songId: 0,
		songLyrics: null,
		songTitle: '',
	})
	const [ShowLyricsModal, SetShowLyricsModal] = useState(false)
	const [RequestLoading, SetRequestLoading] = useState(false)

	const PlayMusic = (songs, type) => {
		SetSongs(songs)
		SetShowPlayer(true)
		settype(type)
	}

	const PlayPlayList = () => {}
	const CloseLyricsModal = () => {
		SetShowLyricsModal(false)
	}

	const ShowLyricsForSong = (songId, songTitle) => {
		if (CurrentSongLyrics.songId != songId) {
		SetCurrentSongLyrics({
			songId: songId,
			songLyrics: null,
			songTitle: songTitle,
		})
		GetLyricsOfSong(songId, songTitle)
		}
		SetShowLyricsModal(true)
	}

	const GetLyricsOfSong = async (songId, songTitle) => {
		try {
			if (RequestLoading) {
				return;
			}
			SetRequestLoading(true);
			let lyrics = ''; 
	
			let lyricsResp = await makeRequest(
				'GET',
				`songs/${songId}/get-lyrics-url`,
				{},
				UserData && UserData.token ? UserData.token : null
			);
	
			if (lyricsResp.error == 1 && lyricsResp?.data?.url) {
				const baseUrl = 'https://api.lyttildanskesalmer.dk/';
				const fullUrl = baseUrl + lyricsResp?.data?.url.substring(1);
				try {
					const response = await fetch(fullUrl, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Accept': 'application/json, text/plain, */*',
							"Accept-Language": "da"
						}
					});
	
					if (!response.ok) {
						throw new Error('Something went wrong: ' + response.statusText);
					}
	
					lyrics = await response.text();
	
				} catch (error) {
					console.error('Fetch error:', error);
					// Handle the error appropriately here
				}
				if (lyricsResp.error == 1) {
					SetCurrentSongLyrics({
						songId: songId,
						songLyrics: lyrics,
						songTitle: songTitle,
					});
				}
			}
			SetRequestLoading(false);
		} catch (err) {
			SetRequestLoading(false);
			console.log('get lyrics error', err);
		}
	}

	const KillGeneralPlayer = async () => {
		try {
		SetShowPlayer(false)
		await TrackPlayer.reset()
		} catch (error) {
		console.log('eror at kill normal  player', error)
		}
	}

	return (
		<BottomSheetContext.Provider
			value={{
				PlayMusic,
				PlayPlayList,
				ShowLyricsForSong,
				KillGeneralPlayer,
				ShowLyricsModal,
			}}
		>
		<View style={{flex: 1}}>{children}</View>
			{ShowPlayer && (
				<SafeAreaView style={{backgroundColor: theme.colors.background}}>
					<Player
						{...{SetShowPlayer}}
						songs={Songs}
						ShowLyrics={(songId, songTitle) => {
						ShowLyricsForSong(songId, songTitle)
						}}
						type={type}
					/>
				</SafeAreaView>
			)}
			<Modal
				isVisible={ShowLyricsModal}
				onBackButtonPress={CloseLyricsModal}
				onBackdropPress={CloseLyricsModal}
				onSwipeComplete={CloseLyricsModal}
				useNativeDriverForBackdrop
				style={{justifyContent: 'flex-end', margin: 0}}
				propagateSwipe
				swipeDirection={['down']}
			>
				{RequestLoading ? (
				<View
					style={[
					styles.PopUP,
					{justifyContent: 'center', alignItems: 'center'},
					{backgroundColor: theme.colors.background},
					]}
				>
					<ActivityIndicator size={'large'} color={theme.colors.primary} />
				</View>
				) : (
				<View
					style={[styles.PopUP, {backgroundColor: theme.colors.background}]}>
					<View style={styles.Header}>
						<View style={styles.HeaderBar} />
					</View>
					<View>
						<Text style={[styles.Song_Title, {color: theme.colors.text}]}>
							{CurrentSongLyrics.songTitle}
						</Text>
					</View>
					<ScrollView showsVerticalScrollIndicator={false}>
						<View onStartShouldSetResponder={() => true}>
							<Text style={[styles.LyricsText, {color: theme.colors.text}]}>
								{CurrentSongLyrics.songLyrics}
							</Text>
						</View>
					</ScrollView>
				</View>
				)}
			</Modal>
		</BottomSheetContext.Provider>
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
		textAlign: 'center',
	},
})
  