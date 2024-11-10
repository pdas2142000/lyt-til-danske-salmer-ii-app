/**React Imports */
import React, {createContext, useState, useEffect, useContext} from 'react'
import {
  FlatList,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native'

/**Libraries */
import {getDeviceType} from 'react-native-device-info'
import EStyleSheet from 'react-native-extended-stylesheet'
import {Modal as Modals, ModalContent} from 'react-native-modals'
import Modal from 'react-native-modal'

/**Local Imports */
import { IconProps } from '../../utils/helpers/iconprops'
import { makeRequest } from '../../utils/make-request'
import { AuthContext } from '../auth-context'
import { SearchTextInput } from '../../components/common/search-text-input'
import { ThemeContext } from '../theme-context'
export const PlayListContext = createContext()
const {height} = Dimensions.get('window')
let deviceType = getDeviceType()

/**Components */
import { ShowToast } from '../../services/toast-message'

/**Icons */
import PlusIcon from '../../../assets/icons/plus.svg'
import MinusIcon from '../../../assets/icons/minus.svg'
import CloseIcon from '../../../assets/icons/times.svg'
import Toast from 'react-native-toast-message'

/**Main Export */
export const PlayListProvider = ({children}) => {

	const {theme} = useContext(ThemeContext)
	const {UserData, ResponseFilter} = useContext(AuthContext)
	const [UserPlayList, SetPlayList] = useState([])
	const [UserPlayListMeta, SetUserPlayListMeta] = useState(null)
	const [userPlayListLoadmore, SetuserPlayListLoadmore] = useState(false)
	const [IntialPlayListLoaded, SetIntialPlayListLoaded] = useState(false)
	const [PlayListRefreshing, SetPlayListRefreshing] = useState(false)
	const [PlayListLoaded, SetPlayListLoaded] = useState(false)
	const [PlayListLoading, SetPlayListLoading] = useState(false)
	const [ShowPlaylistModel, SetShowPlaylistModel] = useState(false)
	const [PlaylistErrorTxt, SetPlaylistErrorTxt] = useState('')
	const [AddedSongToPlaylist, SetAddedSongToPlaylist] = useState()
	const [SelectedSong, SetSelectedSong] = useState(null)
	const [
		SelectedSongPlaylistRequestLoading,
		SetSelectedSongPlaylistRequestLoading,
	] = useState(false)
	const [AddToPlayListLoading, SetAddToPlayListLoading] = useState(false)
	const [PlayListLoadErrorMsg, SetPlayListLoadErrorMsg] = useState('')

	const [PlayListSearchText, SetPlayListSearchText] = useState('')
	const [SelctedSongPlayList, SetSelctedSongPlayList] = useState(null)
	const [SelctedSongPlayListMeta, SetSelctedSongPlayListMeta] = useState(null)

	const [ShowAddPlayListModal, SetShowAddPlayListModal] = useState(false)
	const [AddPlayListModalType, SetAddPlayListModalType] = useState('')//add or edit playlist
	const [PlayListNameText, SetPlayListNameText] = useState('')
	const [RequestLoading, SetRequestLoading] = useState(false)
	const [SelectedPlayListForEdit, SetSelectedPlayListForEdit] = useState(null)

	const [ReloadPlayListOnNew, SetReloadPlayListOnNew] = useState(false)

	const [ReopenSongPlayList, SetReopenSongPlayList] = useState(false)

	const [NavigationListnerScreen, SetNavigationListnerScreen] = useState('')
	const [ReloadPlayListState, SetReloadPlayListState] = useState(false)

	const addedSongToPlaylist = (id) => {
		SetAddedSongToPlaylist(id);
		setTimeout(()=>{
			SetAddedSongToPlaylist("");
		},1500)
	}

	const LoadPlayList = async (SearchText, refreshing = false) => {
		if (PlayListLoading) {
		//user not loged in or this request is under process
		return
		}
		try {
			SetPlaylistErrorTxt('')
		if (refreshing) {
			SetPlayListRefreshing(true)
		} else {
			SetPlayListLoaded(false)
			SetPlayListLoading(true)
		}
		let resp = await makeRequest(
			'GET',
			'playlist',
			{
			search: SearchText ? SearchText : '',
			},
			UserData && UserData.token ? UserData.token : null,
		)
		resp = ResponseFilter(resp)
		if (resp.error === 1) {
			SetPlayList(resp.data && resp.data.data ? resp.data.data : [])
			SetUserPlayListMeta(
			resp.data && resp.data.meta ? resp.data.meta : null,
			)
		} else if (resp.error === 2) {
			SetPlaylistErrorTxt(resp.msg)
		} else if (resp.error === 3) {
			//Show toast message
			ShowToast(resp.msg, 'error')
			SetPlaylistErrorTxt(resp.msg)
		}
		if (refreshing) {
			SetPlayListRefreshing(false)
		} else {
			SetPlayListLoading(false)
		}
		SetPlayListLoaded(true)
		SetIntialPlayListLoaded(true)
		} catch (err) {
		if (refreshing) {
			SetPlayListRefreshing(false)
		} else {
			SetPlayListLoading(false)
		}
		console.log('failed during fetching playlist', err)
		}
	}

	const ResetPlayList = () => {
		SetPlayList([])
		SetUserPlayListMeta(null)
	}

	const LoadMorePlaylist = async SearchText => {
		try {
		if (
			(UserPlayListMeta &&
			UserPlayListMeta.current_page == UserPlayListMeta.last_page) ||
			userPlayListLoadmore
		) {
			return
		}
		SetuserPlayListLoadmore(true)
		let resp = await makeRequest(
			'GET',
			'playlist',
			{
			search: SearchText ? SearchText : '',
			page: UserPlayListMeta.current_page + 1,
			},
			UserData.token,
		)
		resp = ResponseFilter(resp)
		// console.log('playlist load more', resp)
		if (resp.error == 1) {
			let UserPlayListLoadMoreData = resp.data.data ? resp.data.data : []
			SetPlayList([...UserPlayList, ...UserPlayListLoadMoreData])
			SetUserPlayListMeta(
			resp.data && resp.data.meta ? resp.data.meta : null,
			)
		}
		SetuserPlayListLoadmore(false)
		} catch (err) {
		SetuserPlayListLoadmore(false)
		console.log('failed during fetching playlist', err)
		}
	}

	const UpdatePlayListById = (id, playlistData) => {
		let temp = [...UserPlayList]
		if (playlistData) {
		for (let i = 0; i < temp.length; i++) {
			if (temp[i].id == id) {
			temp[i] = playlistData
			break
			}
		}
		} else {
		temp = temp.filter(item => {
			return item.id != id
		})
		}
		SetPlayList(temp)
	}
	
	const ClearPlaylistData = () => {
		SetPlayList([])
		SetUserPlayListMeta(null)
	}

	const OpenPlaylistModal = CurrentSongItem => {
		SetSelectedSong(CurrentSongItem)
		GetSelctedSongPlaylist(CurrentSongItem.id, '')
		SetShowPlaylistModel(true)
	}

	const OpenAddPlatListModal = (
		playlistName,
		type,
		playlist,
		ReloadPlaylist,
	) => {
		SetShowAddPlayListModal(true)
		SetAddPlayListModalType(type)
		SetReloadPlayListOnNew(ReloadPlaylist)
		SetShowPlaylistModel(false)
		if (playlistName) {
			PlayListNameText(playlistName)
			SetSelectedPlayListForEdit(playlist)
		}
	}

	const AddSongToPlayList = async (songId, playlistId) => {
		try {
		let temp = [...SelctedSongPlayList]

		for (let i = 0; i < temp.length; i++) {
			if (playlistId == temp[i].id) {
			temp[i].loading = true
			}
		}
		SetSelctedSongPlayList(temp)
		SetAddToPlayListLoading(true)

		let resp = await makeRequest(
			'GET',
			`playlist/sync-song/${songId}/${playlistId}`,
			{},
			UserData.token,
		)
		resp = ResponseFilter(resp)
		if (resp.error === 1) {
			LoadPlayList('')
			addedSongToPlaylist(playlistId);
			SetSelctedSongPlayList(
			resp.data && resp.data.data ? resp.data.data : [],
			)
		}
		SetAddToPlayListLoading(false)
		} catch (err) {
		SetAddToPlayListLoading(false)
		console.log(err, 'err play add/remove')
		}
	}

	const ReloadPlayListOnStateChange = () => {
		SetReloadPlayListState(false)
		LoadPlayList('')
	}

	const AddOrEditPlayListName = () => {
		if (PlayListNameText && PlayListNameText.length > 2) {
		if (SelectedPlayListForEdit) {
		} else {
			AddANewPlayList()
		}
		} else {
			//Require_translation
			ShowToast('Skriv et korrekt navn til spillelisten', 'error')
			//toast
		}
	}

	const AddANewPlayList = async () => {
		try {
		SetRequestLoading(true)
		let resp = await makeRequest(
			'POST',
			`playlist`,
			{name: PlayListNameText},
			UserData.token,
		)
		resp = ResponseFilter(resp)
		if (!resp) {
			SetRequestLoading(false)
			SetShowPlaylistModel(true)
			return
		}
		// console.log(resp, 'created a new playlist broe')
		if (resp.error == 1) {
			if (ReloadPlayListOnNew) {
			if (resp.data && resp.data.data && resp.data.meta) {
				SetPlayList(resp.data.data)
				SetUserPlayListMeta(resp.data.meta)
			}
			} else {
			GetSelctedSongPlaylist(SelectedSong.id, PlayListSearchText)
			}
			SetPlayListNameText('')
			CloseAddOrEditModal()
		} else {
			SetPlayListNameText('')
			CloseAddOrEditModal()
			if (resp.msg) {
			ShowToast(resp.msg, 'error')
			}
		}
		SetRequestLoading(false)
		SetShowPlaylistModel(true)
		} catch (err) {
		SetRequestLoading(false)
		console.log('failed while creating playlist')
		}
	}

	const GetSelctedSongPlaylist = async (songId, searchTxt) => {
		try {
		SetSelectedSongPlaylistRequestLoading(true)
		SetPlayListLoadErrorMsg('')
		SetPlayListSearchText(searchTxt)
		let resp = await makeRequest(
			'GET',
			`playlist/get/${songId}`,
			{search: searchTxt ? searchTxt : ''},
			UserData.token,
		)
		resp = ResponseFilter(resp)
		if (!resp) {
			SetSelectedSongPlaylistRequestLoading(false)
			return
		}
		if (resp.error === 1) {
			SetSelctedSongPlayList(
				resp.data && resp.data.data ? resp.data.data : [],
			)
			SetSelctedSongPlayListMeta(
				resp.data && resp.data.meta ? resp.data.meta : null,
			)
		} else if (resp.error === 2) {
			SetPlayListLoadErrorMsg(resp.msg)
		}
		SetSelectedSongPlaylistRequestLoading(false)
		} catch (err) {
		SetSelectedSongPlaylistRequestLoading(false)
		console.log(err, 'err play add/remove')
		}
	}

	const ClosePlaylistModal = () => {
		SetShowPlaylistModel(false)
	}

	const CloseAddOrEditModal = () => {
		SetShowAddPlayListModal(false)
	}

	const ShowButton = ({add}) => {
		if (!add) {
		return (
			<View
				style={[
					styles.AddIcon,
					{
					borderColor: theme.colors.primary,
					backgroundColor: theme.colors.primary,
					},
				]}
			>
			<PlusIcon
				{...IconProps(16)}
				name="plus"
				style={[
				styles.PlayListAddRemoveIcon,
				{color: theme.colors.background},
				]}
			/>
			</View>
		)
		} else {
		return (
			<View
				style={[
					styles.RemoveIcon,
					{borderColor: theme.colors.primary,backgroundColor: theme.colors.background,},
				]}
			>
			<MinusIcon
				{...IconProps(16)}
				name="minus"
				style={[styles.PlayListAddRemoveIcon,{color: theme.colors.primary},]}
			/>
			</View>
		)
		}
	}

	const renderItem = ({item, index}) => {
		const isSongAdded =
		SelectedSong &&
		SelectedSong.id &&
		item.songs &&
		Array.isArray(item.songs) &&
		item.songs.find(songsItem => SelectedSong.id === songsItem.id)
		return (
		<View style={[styles.PlayListItem, ...(AddedSongToPlaylist === item.id ? [styles.added_song]:[])]} onStartShouldSetResponder={() => true}>
			<View style={styles.PlayListTitleContainer}>
				<Text style={[styles.PlayListTitleText, {color: theme.colors.text}]}>
					{item.name}
				</Text>
			</View>
			{item.loading ? (
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					height: 30,
					paddingHorizontal: EStyleSheet.value('5rem'),
				}}
			>
				<ActivityIndicator color={theme.colors.primary} size={'small'} />
			</View>
			) : (
			<TouchableOpacity
				onPress={() => {
					AddSongToPlayList(SelectedSong.id, item.id)
				}}
				style={styles.PlayListButtonContainer}
			>
				<ShowButton add={isSongAdded} />
			</TouchableOpacity>
			)}
		</View>
		)
	}

  	return (
		<PlayListContext.Provider
			value={{
				UserPlayList,
				IntialPlayListLoaded,
				PlayListLoading,
				LoadPlayList,
				AddSongToPlayList,
				OpenPlaylistModal,
				OpenAddPlatListModal,
				PlayListLoaded,
				UpdatePlayListById,
				PlayListRefreshing,
				LoadMorePlaylist,
				UserPlayListMeta,
				PlaylistErrorTxt,
				SetNavigationListnerScreen,
				NavigationListnerScreen,
				ReloadPlayListOnStateChange,
				ReloadPlayListState,
				ResetPlayList,
			}}
		>
			<View style={{flex: 1}}>{children}</View>
			<Modal
				// onTouchOutside={ClosePlaylistModal}
				// visible={ShowPlaylistModel}
				// swipeDirection={['down']}
				// onSwipeOut={ClosePlaylistModal}
				// overlayOpacity={0.2}
				// width={1}
				// style={{justifyContent: 'flex-end', margin: 0}}

				isVisible={ShowPlaylistModel}
				onSwipeComplete={ClosePlaylistModal}
				swipeDirection={'down'}
				onBackdropPress={ClosePlaylistModal}
				style={{margin: 0, justifyContent: 'flex-end'}}
				propagateSwipe
			>
				<KeyboardAvoidingView
					style={[styles.PopUp, {backgroundColor: theme.colors.background}]}
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
				>
					<View style={styles.Header}>
						<View style={styles.HeaderBar} />
					</View>
					<View style={styles.titleContainer}>
						<View style={styles.titleContainerTitle}>
							{/*  Require_translation*/}
							<Text
								style={[
								styles.titleContainerTitleText,
								{color: theme.colors.text},
								]}>
								Tilføj{' '}
								<Text style={styles.HighLightText}>
									{SelectedSong ? SelectedSong.title : ''}
								</Text>
							</Text>
						</View>
						<TouchableOpacity
							disabled={PlayListLoadErrorMsg ? true : false}
							style={{justifyContent: 'center'}}
							onPress={() => {
								SetReopenSongPlayList(true)
								OpenAddPlatListModal('', 'Opret', null, false)
							}}
						>
						<View
							style={[
							styles.titleContainerButton,
							{
								backgroundColor: theme.colors.buttonBackground,
								borderColor: theme.colors.buttonBorder,
								opacity: PlayListLoadErrorMsg ? 0.4 : 1,
							},
							]}
						>
							{/*  Require_translation*/}
							<Text
								style={[
									styles.titleContainerButtonText,
									{color: theme.colors.buttonText},
								]}
							>
								Ny spilleliste
							</Text>
						</View>
						</TouchableOpacity>
					</View>
					<SearchTextInput
						SearchText={PlayListSearchText}
						WarpStyle={{
							marginHorizontal: EStyleSheet.value('15rem'),
							backgroundColor: theme.colors.lighterBackground
						}}
						OnTextChange={txt => {
							GetSelctedSongPlaylist(SelectedSong.id, txt)
						}}
					/>
				{SelectedSongPlaylistRequestLoading ? (
					<View style={[	{justifyContent: 'center', alignItems: 'center', flex: 1},]}>
						<ActivityIndicator size={'large'} color={theme.colors.primary} />
					</View>
				) : (
					<FlatList
						showsVerticalScrollIndicator={false}
						ListEmptyComponent={() => {
							return (
							<View style={[styles.PlaylistEmpty,{backgroundColor: theme.colors.background},]}>
								{/* Require_translation */}
								<Text style={[styles.Playlist_Head_Title,{color: theme.colors.text,textAlign: 'center',paddingHorizontal: 20,},]}>
									{PlayListLoadErrorMsg
										? PlayListLoadErrorMsg
										: 'Ingen spillelister'}
								</Text>
								{PlayListLoadErrorMsg ? (
								<TouchableOpacity
									style={[
									styles.ButtonMain,
									{
										backgroundColor: theme.colors.primary,
										marginHorizontal: 20,
										marginVertical: 10,
									},
									]}
									onPress={() => {
										SetNavigationListnerScreen('Subscriptions')
										ClosePlaylistModal()
									}}
								>
									<Text
										style={[
											styles.Popper_Btn_Text,
											{color: theme.colors.buttonText},
										]}
									>
										{'Opret abonnement'}
									</Text>
								</TouchableOpacity>
								) : null}
							</View>
							)
						}}
						data={SelctedSongPlayList}
						renderItem={renderItem}
						keyExtractor={(item, index) => item.id.toString()}
					/>
				)}
				</KeyboardAvoidingView>
			</Modal>
			<Modals
				visible={ShowAddPlayListModal}
				onTouchOutside={() => {
				CloseAddOrEditModal()
				if (ReopenSongPlayList) {
					SetReopenSongPlayList(false)
					SetShowPlaylistModel(true)
				}
				}}
				width={deviceType === 'Tablet' ? 0.5 : 0.8}
				overlayOpacity={0.2}>
					<ModalContent style={{marginHorizontal: -18, marginVertical: -24}}>
						<KeyboardAvoidingView
							behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
							<View
								style={[
									styles.Add_Pl_Wrap_Head,
									{borderBottomColor: theme.colors.text + '0D'},
								]}
							>
								<Text style={[styles.Add_Pl_Wrap_Head_Title,{color: theme.colors.text},]}>
									{AddPlayListModalType} spilleliste
								</Text>
								<TouchableOpacity
									onPress={() => {
									SetShowAddPlayListModal(false)
									if (ReopenSongPlayList) {
										SetReopenSongPlayList(false)
										SetShowPlaylistModel(true)
									}
									}}
								>
									<CloseIcon
										{...IconProps(14)}
										name="times"
										style={styles.Modal_Close_Btn_Icon}
									/>
								</TouchableOpacity>
							</View>
							<View style={styles.Add_Pl_Wrap_Body}>
								<View style={styles.Add_Pl_Wrap_Body_Inner}>
									<Text style={[styles.Add_Pl_Label, {color: theme.colors.primary}]}>
										Spillelistens navn:
									</Text>
									<TextInput
										autoCapitalize="none"
										autoCorrect={false}
										style={[
											styles.Form_Control,
											{
											color: theme.colors.text,
											backgroundColor: theme.colors.lighterBackground,
											},
										]}
										placeholder="Skriv navn"
										value={PlayListNameText}
										onChangeText={txt => {
											SetPlayListNameText(txt)
										}}
										placeholderTextColor="rgba(0, 0, 0, 0.3)"
									/>
								</View>
								<TouchableOpacity
									disabled={RequestLoading}
									style={[
									styles.Submit_Btn,
									{
										borderColor: theme.colors.buttonBorder,
										backgroundColor: theme.colors.buttonBackground,
									},
									]}
									onPress={() => {
										AddOrEditPlayListName()
									}}
								>
									{RequestLoading ? (
									<ActivityIndicator	color={theme.colors.buttonText}	size={'small'}/>
									) : (
									<Text style={[styles.Submit_Btn_Text,{color: theme.colors.buttonText},]}>
										Opret
									</Text>
									)}
								</TouchableOpacity>
							</View>
						</KeyboardAvoidingView>
					</ModalContent>
			</Modals>
		</PlayListContext.Provider>
	)
}

const styles = EStyleSheet.create({
	PopUp: {
	  height: height * 0.7,
	  borderTopLeftRadius: '10rem',
	  borderTopRightRadius: '10rem',
	//   paddingHorizontal: '15rem',
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
	titleContainer: {
	  flexDirection: 'row',
	  // borderBottomWidth: 0.5,
	  // borderBottomColor: 'rgba(0,0,0,0.5)',
	  paddingVertical: deviceType === 'Tablet' ? '10.5rem' : '15rem',
	  paddingHorizontal: '15rem',
	},
	titleContainerTitle: {
	  flex: 1,
	},
	titleContainerTitleText: {
	  fontSize: deviceType === 'Tablet' ? '12.5rem' : '17rem',
	  fontFamily: 'Sen-Regular',
	  paddingRight: '10rem',
	},
	HighLightText: {
	  fontFamily: 'Sen-Bold',
	},
	titleContainerButton: {
	  borderWidth: 1,
	  borderRadius: '7rem',
	},
	titleContainerButtonText: {
	  fontSize: deviceType === 'Tablet' ? '10.5rem' : '15rem',
	  fontFamily: 'Sen-Regular',
	  paddingHorizontal: '10rem',
	  paddingVertical: deviceType === 'Tablet' ? '5.5rem' : '8rem',
	},
	PlayListItem: {
	  flexDirection: 'row',
	  borderWidth: '2rem',
	  borderColor: 'rgba(0,0,0,0)',
	  borderBottomColor: 'rgba(0,0,0,0.05)',
	  marginHorizontal: '7.5rem',
	  paddingHorizontal: '7.5rem',
	  paddingVertical: deviceType === 'Tablet' ? '10.5rem' : '15rem',
	  borderRadius: '10rem'
	},
	PlayListTitleContainer: {
	  flex: 1,
	},
	PlayListButtonContainer: {},
	PlayListTitleText: {
	  fontSize: deviceType === 'Tablet' ? '12.5rem' : '17rem',
	  fontFamily: 'Sen-Regular',
	  paddingRight: '10rem',
	},
	PlayListAddRemoveIcon: {
	  fontSize: deviceType === 'Tablet' ? '13rem' : '20rem',
	},
	RemoveIcon: {
	  borderWidth: 1,
	  borderRadius: '5rem',
	  paddingHorizontal: '5rem',
	  justifyContent: 'center',
	  height: 30,
	},
	AddIcon: {
	  borderWidth: 1,
	  borderRadius: '5rem',
	  paddingHorizontal: '5rem',
	  justifyContent: 'center',
	  height: 30,
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
	PlaylistEmpty: {
	  justifyContent: 'center',
	  height: height * 0.3,
	},
	Playlist_Head: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  justifyContent: 'space-between',
	  borderBottomWidth: 2,
	  paddingHorizontal: deviceType === 'Tablet' ? '14rem' : '20rem',
	  paddingVertical: deviceType === 'Tablet' ? '8rem' : '12rem',
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
	added_song: {
		backgroundColor:'#69C77940',
	}
  });
