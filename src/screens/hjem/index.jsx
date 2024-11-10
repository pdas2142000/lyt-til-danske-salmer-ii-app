/**React Imports */
import React, {useEffect, useState, useContext, useCallback} from 'react'
import {
  View,
  Text,
  Animated,
  Easing,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
  ViewComponent,
} from 'react-native'

/**Libraries */
import {getDeviceType} from 'react-native-device-info'
import { useTheme } from '@react-navigation/native'
import moment from 'moment'
import Collapsible from 'react-native-collapsible'
import EStyleSheet from 'react-native-extended-stylesheet'

/**Local Imports */
import { ms } from '../../utils/helpers/metrics'
import { IconProps } from '../../utils/helpers/iconprops'
import { AuthContext } from '../../context/auth-context'
import { ThemeContext } from '../../context/theme-context'
import { PlaylistPlayContext } from '../../context/playlist-play-context'
import { PlayListContext } from '../../context/play-list-context'
import { makeRequest } from '../../utils/make-request'
import { BottomSheetContext } from '../../context/bottom-sheet-context'
import {SavaDataToLocal, GetDataFromLocal, Storage_Keys} from '../../utils/storage'

/**Components */
import Layout from '../../components/layout'
import FilterTabOne from '../../components/hjem/filters/filter-tab-one'
import FilterTabTwo from '../../components/hjem/filters/filter-tab-two'
import { pushToAnalytics } from '../../services/analytics'
import BottomSheet from '../../components/bottom-sheet'
import ResultItem from '../../components/hjem/result-item'
import { ShowToast } from '../../services/toast-message'
import { 
	endAnimataion, 
	StartHidingWheelTimer ,
	RotateWheel,
	LoopFadeAnimation
} from './helpers'

/**Icons */
import ShuffleIcon from '../../../assets/icons/shuffle.svg'
import ArrowDownIcon from '../../../assets/icons/caret-down.svg'
import ChevronDownIcon from '../../../assets/icons/chevron-down.svg'
import ChevronRightIcon from '../../../assets/icons/chevron-right.svg'
import PlayIcon from '../../../assets/icons/play.svg'
import ColorWheel from '../../../assets/images/colors.svg'
import Logo from '../../../assets/logo.svg'

/**Styles */
import LayoutStyles from '../../components/layout/styles'

let deviceType = getDeviceType()
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
let StateLessData = {state: false, endAnimateto: 0, colors: {}, options: null}

const DefaultSearchValues = {
	readings: '',
	holiday: '',
	order: '',
	church: '',
	organist: '',
	singer: '',
	hymnCategory: '',
	author: '',
	composer: '',
	number: '',
	title: '',
  }

/**Main Export */
const Hjem = ({navigation}) => {

	const {colors} = useTheme()
	const {
		UserData,
		UpdateUser,
		AuthInfoLoaded,
		TrackingPermissionEnabled,
		ResponseFilter,
	  } = useContext(AuthContext)

	  const {
		OpenPlaylistModal,
		NavigationListnerScreen,
		SetNavigationListnerScreen,
	} = useContext(PlayListContext)

	const {ChangeAppColors} = useContext(ThemeContext)
	const {PlayMusic, ShowLyricsForSong} = useContext(BottomSheetContext)
	const {KillPlayListPlayer} = useContext(PlaylistPlayContext)
	const [SelectedTab, SetSelectedTab] = useState('one')
	const [Data, SetData] = useState(null)
	const [OpenModal, SetOpenModal] = useState(false)
	const [AccordinWheel, SetAccordinWheel] = useState(false)
	const [ShufleLoading, SetShufleLoading] = useState(false)
	const [HolidayText, SetHolidayText] = useState({})
	const [ModalContent, SetModalContent] = useState(null)
	const [LoadingFirstRequest, SetLoadingFirstRequest] = useState(false)
	const [RequestNextPage, SetRequestNextPage] = useState(false)
	const [ActiveHolidayText, SetActiveHolidayText] = useState(true)
	const [SearchOptions, SetSearchOptions] = useState(null)
	const [SearchedAtleatOnce, SetSearchedAtleatOnce] = useState(false)
	const [OptionsLoaded, SetOptionsLoaded] = useState(false)
	const [
		AtleastOneRequestOfSaerchHappened,
		SetAtleastOneRequestOfSaerchHappened,
	  ] = useState(false)
	const [SearchValues, SetSearchValues] = useState({
		Title: '',
		Hymn: '',
		Composer: '',
		Author: '',
		Singer: '',
		Church: '',
		Organist: '',
		SongCategory: '',
		SortBy: 'title',
		Text_one: '',
		Text_two: '',
		isTabOpen: false,
	  })
	const [spinValue] = useState(new Animated.Value(0))
	const [FadeOpacity] = useState(new Animated.Value(0))
	const [TransformUp] = useState(new Animated.Value(0))

	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '-360deg'],
	})
	 
	useEffect(() => {
		if (NavigationListnerScreen) {
		  navigation.navigate(NavigationListnerScreen)
		  SetNavigationListnerScreen('')
		}
	}, [NavigationListnerScreen])
	
	useEffect(() => {
		if (AuthInfoLoaded) {
			GetAllOptions()
		}
	}, [AuthInfoLoaded])

	useEffect(() => {
		LoopFadeAnimation(FadeOpacity, Animated)
	}, [])
	
	
	const GetColorAndUser = async () => {
		try {
			let resp = await makeRequest(
			'GET',
			'get-color',
			{},
			UserData && UserData.token ? UserData.token : null,
			)
			resp = ResponseFilter(resp)
			if (!resp) {
				return
			}
			// RotateWheel(resp.church_day.angle)
			if (resp.error == 1) {
			// console.log(resp, 'resp with user')
			if (resp.data) {

				StateLessData.colors = resp.data.color
				RotateWheel(resp?.data?.angle, StateLessData, spinValue, ChangeAppColors, StartHidingWheelTimer, SetAccordinWheel)
				
			}
			UnMountLoadingScreen()
			if (resp.user) {
				UpdateUser({data: resp.user})
			}
			}
		} catch (err) {
			console.log('failed to get user and color', err)
		}
	}
	
	const GetSuffuleSongs = async () => {
		try {
			SetShufleLoading(true)
			await KillPlayListPlayer()
			let response = await makeRequest(
			'GET',
			'songs/shuffle',
			{limit: __DEV__ ? 3 : 150},
			UserData && UserData.token ? UserData.token : null,
			)
			// console.log('GetSuffuleSongs', response)
			if (response.error === 1) {
			// let shuffleSongs = response.data.map(item => {
			//   item.canPlay = true
			//   return item
			// })
			let lastObj = {...response.data[response.data.length - 1]}
			let tempSongs = [...response.data]
			if (Platform.OS == 'ios') {
				tempSongs.push(lastObj)
				tempSongs.push(lastObj)
			}
			// console.log(tempSongs)
			PlayMusic(tempSongs, 'shuffle')
			}
			SetShufleLoading(false)
		} catch (error) {
			SetShufleLoading(false)
		}
	}
	
	const GetAllOptions = async () => {
		try {
			let resp = await makeRequest('GET', 'songs/initial-data', {})
			// RotateWheel(resp.church_day.angle)
			if (resp.error == 1) {
			//SetAppColors(resp.church_day.color)
			// console.log(resp, 'get options')
			await SavaDataToLocal(Storage_Keys.USER_SEARCH_OPTIONS, resp)

			SetSearchOptions(resp)
			StateLessData.options = resp
			GetColorAndUser()
			} else {
			GetBackedUpOptions()
			GetColorAndUser()
			}
		} catch (err) {
			GetColorAndUser()
			GetBackedUpOptions()
			console.log('failed to get options', err)
		}
	}
	
	const GetBackedUpOptions = async () => {
	let resp = await GetDataFromLocal(Storage_Keys.USER_SEARCH_OPTIONS)
	// RotateWheel(resp.church_day.angle)
	SetSearchOptions(resp)
	UnMountLoadingScreen()
	}
	
	const UnMountLoadingScreen = () => {
		Animated.sequence([
			Animated.timing(TransformUp, {
				toValue: -windowHeight,
				duration: 500,
				easing: Easing.bezier(0.4, 0, 0, 1),
				useNativeDriver: true,
			}),
		]).start(finished => {
			if (finished.finished) {
				SetOptionsLoaded(true)
		  	}
		})
	}
	
	const SearchData = async (pageNumber, activeTab, options = null) => {
		try {
			if (RequestNextPage) {
			return
			}

			if (pageNumber == 1) {
			SetLoadingFirstRequest(true)
			}
			let SearchOptionsForApi = {
			page: pageNumber,
			}
			if (activeTab == 'tab1') {
			if (SearchValues.Title) {
				SearchOptionsForApi.title = SearchValues.Title
			}
			if (SearchValues.Hymn) {
				SearchOptionsForApi.number = SearchValues.Hymn
			}

			if (SearchValues.Composer) {
				SearchOptionsForApi.composer = SearchValues.Composer
			}
			if (SearchValues.Author) {
				SearchOptionsForApi.author = SearchValues.Author
			}
			if (SearchValues.Singer) {
				SearchOptionsForApi.singer = SearchValues.Singer
			}
			if (SearchValues.Church) {
				SearchOptionsForApi.church = SearchValues.Church
			}
			if (SearchValues.Organist) {
				SearchOptionsForApi.organist = SearchValues.Organist
			}
			if (SearchValues.SongCategory) {
				SearchOptionsForApi.hymnCategory = SearchValues.SongCategory
			}

			if (SearchValues.SortBy) {
				SearchOptionsForApi.order = SearchValues.SortBy
				// if (SearchValues.Title == '' && SearchValues.Hymn == '') {
				//   SearchOptionsForApi.order = 'number'
				// } else {
				//   SearchOptionsForApi.order = SearchValues.SortBy
				// }
			}
			} else if (activeTab == 'tab2') {
			if (options) {
				if (options.Text_one) {
				SearchOptionsForApi.readings = 1
				SearchOptionsForApi.holiday = options.Text_one
				}
				if (options.Text_two) {
				SearchOptionsForApi.readings = 2
				SearchOptionsForApi.holiday = options.Text_two
				}
			} else {
				if (SearchValues.Text_one) {
				SearchOptionsForApi.readings = 1
				SearchOptionsForApi.holiday = SearchValues.Text_one
				}
				if (SearchValues.Text_two) {
				SearchOptionsForApi.readings = 2
				SearchOptionsForApi.holiday = SearchValues.Text_two
				}
			}
			}

			let searchOptionsOfApi = {...DefaultSearchValues, ...SearchOptionsForApi}

			let isAdvanceSearch = [
			'composer',
			'author',
			'category',
			'singer',
			'organist',
			'church',
			].find(n => searchOptionsOfApi[n])

			pushToAnalytics(
			`${isAdvanceSearch ? 'Advance' : 'Basic'}_Search`,
			searchOptionsOfApi,
			TrackingPermissionEnabled,
			)
			SetSearchedAtleatOnce(true)
			SetRequestNextPage(true)
			let resp = await makeRequest(
			'GET',
			'songs',
			{...searchOptionsOfApi},
			UserData && UserData.token ? UserData.token : null,
			)
			// console.log(resp, 'reso')
			resp = ResponseFilter(resp)
			if (resp.error == 1) {
			SetData(prev => {
				if (!prev || pageNumber == 1) {
				return resp.data
				} else {
				prev.meta = resp.data.meta
				prev.data = [...prev.data, ...resp.data.data]
				return prev
				}
			})
			if (resp.text) {
				SetHolidayText(resp.text)
			}
			}
			SetLoadingFirstRequest(false)
			SetAtleastOneRequestOfSaerchHappened(true)
			SetRequestNextPage(false)
		} catch (err) {
			console.log(err, 'error on search api')
		}
	}
	
	const GetNextSearchData = () => {
		let nextpageNumber = 1
		if (Data && Data.meta) {
			nextpageNumber = Data.meta.current_page + 1
			// console.log('nexpage', Data.meta)
			if (Data.meta.current_page < Data.meta.last_page) {
			SearchData(nextpageNumber, SelectedTab === 'one' ? 'tab1' : 'tab2')
			}
		} else {
			SearchData(nextpageNumber, SelectedTab === 'one' ? 'tab1' : 'tab2')
		}
	}
    
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{flex: 1, position: 'relative'}}
        >
			{!OptionsLoaded ? (
				<Animated.View
					style={[
						{
							position: 'absolute',
							justifyContent: 'center',
							alignItems: 'center',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: 'white',
							zIndex: 10,
						},
						{
							transform: [{translateY: TransformUp}],
						},
					]}
				>
					<Animated.View
						style={[{width: windowWidth}, {opacity: FadeOpacity}]}
						key={'LOGO_Animated'}
					>
						<Image
							style={{width: windowWidth, height: 290, resizeMode: 'contain'}}
							source={require('../../../assets/app_logo.png')}
						/>
					</Animated.View>
				</Animated.View>
			) : null}
            <Layout {...{navigation}} ignoreStyles={true}>
				<FlatList
					keyboardShouldPersistTaps={'always'}
					data={Data && Data.data ? Data.data : []}
					showsVerticalScrollIndicator={false}
					ListHeaderComponent= {
						<>
							<View style={[styles.Color_Wheel,{backgroundColor: colors.background},]}>
								<TouchableOpacity onPress={() => {SetAccordinWheel(prev => !prev)}}style={styles.Color_Wheel_Head}>
									<Text style={[styles.Title, {color: colors.primary}]}>
										Dagens farve
									</Text>
									<Text style={[styles.Date, {color: colors.primary}]}>
										{moment(new Date()).format('DD/MM YYYY')}
									</Text>
								</TouchableOpacity>
								<Collapsible collapsed={AccordinWheel}>
									<View style={styles.Color_Wheel_Body}>
										<ArrowDownIcon style={styles.Caret} {...IconProps(18)} />
										<View style={styles.Wheel}>
											<Animated.View
												style={{transform: [{rotate: spin}]}}
												key={'wheel_to_spin'}
											>
												<ColorWheel style={styles.Wheel_Img} />
											</Animated.View>
											<Logo style={styles.Abs} />
										</View>
									</View>
								</Collapsible>
							</View>
							<TouchableOpacity 
								style={[styles.ShufflePlayContainer,{backgroundColor: colors.background,}]}
								disabled={ShufleLoading}
								onPress={() => {GetSuffuleSongs()}}
							>
								<View style={styles.flexRow}>
									<View style={styles.shuffleIconContainer}>
										<View style={styles.flexRow}>
											<View style={{paddingRight: 10}}>
												<ShuffleIcon
													{...IconProps(18)}
													style={styles.ShuffleIconsStyle}
													fill={colors.primary}
												/>
											</View>
											<Text style={[styles.Filter_Btn_Text,{color: colors.primary},]}>
												Tilfældig afspilning
											</Text>
										</View>
									</View>
									<View>
										<PlayIcon
											{...IconProps(13)}
											style={styles.HolidayHeaderIcon}
										/>
									</View>
								</View>
							</TouchableOpacity>
							<View style={[styles.Filters, {backgroundColor: colors.background,},]}>
								<View style={styles.Filters_Tabs}>
									<TouchableOpacity
										style={[styles.Filter_Btn,SelectedTab === 'one'? {borderBottomColor: colors.primary,	}: '',]}
										onPress={() => {SetSelectedTab('one')}}
									>
										<Text
											style={[styles.Filter_Btn_Text, {color: colors.primary}]}
											numberOfLines={1}
											ellipsizeMode="tail"
										>
											Den Danske Salmebog
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={[styles.Filter_Btn,SelectedTab === 'two'? {	borderBottomColor: colors.primary,}	: '',]}
										onPress={() => {SetSelectedTab('two')}}
									>
										<Text
											style={[styles.Filter_Btn_Text, {color: colors.primary}]}
											numberOfLines={1}
											ellipsizeMode="tail"
										>
											At vælge salmer
										</Text>
									</TouchableOpacity>
								</View>
								{SelectedTab === 'one' ? (
									<FilterTabOne
										key={'firstTab'}
										SearchValues={SearchValues}
										Options={SearchOptions}
										SetSearchValues={SetSearchValues}
										OnSearchPress={searchParams => {
											SetData([])
											SetHolidayText({})
											SearchData(1, 'tab1')
										}}
										ResetSearchOption={type => {
											let temp = {...SearchValues}
											temp[type] = ''
											SetSearchValues(temp)
										}}
										RequestNextPage={RequestNextPage}
										OpenBottomSheet={Content => {
											SetModalContent(Content)
											SetOpenModal(true)
										}}
									/>
								) : null}
								{SelectedTab === 'two' && (
									<FilterTabTwo
										SearchValues={SearchValues}
										OpenBottomSheet={Content => {
										SetModalContent(Content)
										SetOpenModal(true)
										}}
										ResetSearchOption={type => {
										let temp = {...SearchValues}
										temp[type] = ''
										SetSearchValues(temp)
										}}
									/>
								)}
							</View>
							{Data && Data.meta && Data.meta.total ? (
								<View style={styles.Results_Header}>
									<Text style={[styles.Results_Count, {color: colors.text}]}>
										{
											Data.meta.total
											? Data.meta.total > 1
											? Data.meta.total + ' resultater'
											: '1 resultat'
											: '0 resultater'
										}
									</Text>
									<Text style={styles.Page_Count}>
										Side{' '}
										<Text>
											{Data.meta.current_page ? Data.meta.current_page : '0'}
										</Text>
										/
										<Text>
											{Data.meta.last_page ? Data.meta.last_page : '0'}
										</Text>
									</Text>
								</View>
							) : null}
							{HolidayText && HolidayText.author ? (
								<View>
									<TouchableOpacity
										onPress={() => {SetActiveHolidayText(!ActiveHolidayText)}}
										style={styles.HolidayHeaderView}
									>
										<View>
											{!ActiveHolidayText ? (
												<ChevronDownIcon
												name="chevron-down"
												style={styles.HolidayHeaderIcon}
												/>
											) : (
												<ChevronRightIcon
													name="chevron-right"
													style={styles.HolidayHeaderIcon}
												/>
											)}
										</View>
										<View>
										{!ActiveHolidayText ? (
											<Text
												style={[
													styles.HolidayHeaderText,
													{color: colors.primary},
												]}
											>
												Luk tekst
											</Text>
										) : (
											<Text
												style={[
													styles.HolidayHeaderText,
													{color: colors.primary},
												]}
											>
												Læs mere om salmevalget
											</Text>
										)}
										</View>
									</TouchableOpacity>
									<Collapsible collapsed={ActiveHolidayText}>
										<View>
											<View style={styles.HolidayTextTitleContainer}>
												<Text
													style={[
														styles.HolidayHeadingText,
														{color: colors.text},
													]}
												>
													{HolidayText.heading}
												</Text>
												<Text style={[styles.HolidayAuthorText]}>
													Udarbejdet af:{' '}
													<Text style={{color: colors.text}}>
														{HolidayText.author}
													</Text>
												</Text>
											</View>
											<Text
												includeFontPadding={false}
												style={[
												styles.HolidayContentText,
												{color: colors.text},
												]}
											>
												{HolidayText.content}
											</Text>
										</View>
									</Collapsible>
								</View>
							) : null}
							{!SearchedAtleatOnce ? (
								<View
									style={[
										styles.Color_Wheel,
										{backgroundColor: colors.background,padding: ms(20)	},
									]}
								>
									<View>
										<Text
											style={[
												styles.Filter_Btn_Text,
												{color: colors.text, fontWeight: 'normal'},
											]}
										>
											Her kan du søge efter salmetitler eller salmenumre.
										</Text>
										<Text
											style={[
												styles.Filter_Btn_Text,
												{color: colors.text, fontWeight: 'normal'},
											]}
										>
											Under "Flere muligheder" kan du foretage mere avancerede
											søgninger.
										</Text>
										
									</View>
								</View>
							) : null}
						</>
					}
					onEndReached={() => {
						if (Data && Data.data && Array.isArray(Data.data)) {GetNextSearchData()}
					}}
					style={LayoutStyles.Content}
					contentContainerStyle={styles.Results_body}
					ListEmptyComponent={() => {
						return (
						<View style={[styles.Color_Wheel, {paddingVertical: 20}]}>
							{!LoadingFirstRequest ? (
							<Text 
								style={[	styles.Filter_Btn_Text,{textAlign: 'center', color: colors.text},]}
								numberOfLines={1}
								ellipsizeMode="tail"
							>
								{AtleastOneRequestOfSaerchHappened
								? 'ingen søgeresultater'
								: ''}
							</Text>
							) : (
							<ActivityIndicator color={colors.primary} size={'large'} />
							)}
						</View>
						)
					}}
					ListFooterComponent={() => {
						if (
						Data &&
						Data.meta &&
						Data.meta.current_page != Data.meta.last_page
						) {
						return (
							<View style={{paddingVertical: 20}}>
								<ActivityIndicator color={colors.primary} size={'large'} />
							</View>
						)
						} else {
						return <View style={{paddingVertical: 20}} />
						}
					}}
					renderItem={({item, index}) => {
						return (
						<ResultItem
							item={item}
							index={index}
							listLength={Data.data.length}
							OnAddPlaylist={songItem => {
							if (UserData && UserData.token) {
								OpenPlaylistModal(songItem)
							} else {
								//
								ShowToast(
								'For at oprette spilleliste og føje sange til den, skal du købe abonnement.',
								'info',
								)
								// navigation.navigate('Login')
							}
							}}
							OnPlayClick={async song => {
								
							try {
								let songs = []
								songs.push(song)
								pushToAnalytics(
								`${song.number}_song_play`,
								{
									title: song.title,
								},
								TrackingPermissionEnabled,
								)
								await KillPlayListPlayer()
								PlayMusic(songs, 'single')
							} catch (err) {
								console.log('error while starting song', err)
							}
							}}
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
						)
					}}
						keyExtractor={item => item.id}
				/>
				<BottomSheet
					isModalOpen={OpenModal}
					onModalClose={() => {
						SetOpenModal(false)
					}}
					BsContent={
						ModalContent && ModalContent.data ? ModalContent.data : null
					}
					OnItemSelect={(selectedItem, heading) => {
						let temp = {...SearchValues}
						temp[heading] = selectedItem.value

						if (SelectedTab === 'two') {
						if (heading == 'Text_two') {
							temp['Text_one'] = ''
						} else if (heading == 'Text_one') {
							temp['Text_two'] = ''
						}
						SetData([])
						SearchData(1, 'tab2', temp)
						}
						SetSearchValues(temp)
					}}
					RenderContent={ModalContent}
				/>
            </Layout>
        </KeyboardAvoidingView>
    )
}

const styles = EStyleSheet.create({
	Filters: {
	  borderRadius: deviceType === 'Tablet' ? '7rem' : '10rem',
	  marginBottom: deviceType === 'Tablet' ? '10.5rem' : '15rem',
	  paddingHorizontal: deviceType === 'Tablet' ? '14rem' : '20rem',
	  paddingBottom: deviceType === 'Tablet' ? '14rem' : '20rem',
	},
	Filters_Tabs: {
	  flexDirection: 'row',
	  borderBottomWidth: 2,
	  borderBottomColor: 'rgba(0,0,0,0.1)',
	},
	Filter_Btn: {
	  flex: 1,
	  alignItems: 'center',
	  borderBottomWidth: 2,
	  borderBottomColor: 'transparent',
	  paddingBottom: deviceType === 'Tablet' ? '7rem' : '10rem',
	  paddingTop: deviceType === 'Tablet' ? '14rem' : '20rem',
	  marginBottom: -2,
	},
	Filter_Btn_Text: {
	  fontFamily: 'Sen-Bold',
	  fontSize: deviceType === 'Tablet' ? '10rem' : '14rem',
	},
	Color_Wheel: {
	  borderRadius: deviceType === 'Tablet' ? '7rem' : '10rem',
	  marginBottom: deviceType === 'Tablet' ? '10.5rem' : '15rem',
	},
	Color_Wheel_Head: {
	  borderBottomWidth: 2,
	  borderBottomColor: 'rgba(0,0,0,0.1)',
	  paddingHorizontal: deviceType === 'Tablet' ? '14rem' : '20rem',
	  paddingVertical: deviceType === 'Tablet' ? '8.5rem' : '12rem',
	  flexDirection: 'row',
	  alignItems: 'center',
	  justifyContent: 'space-between',
	},
	Title: {
	  fontFamily: 'Sen-Bold',
	  fontSize: deviceType === 'Tablet' ? '12.5rem' : '18rem',
	  paddingVertical: deviceType === 'Tablet' ? '3rem' : '5rem',
	},
	Date: {
	  fontFamily: 'Sen-Bold',
	  fontSize: deviceType === 'Tablet' ? '10rem' : '14rem',
	},
	Color_Wheel_Body: {
	  paddingHorizontal: deviceType === 'Tablet' ? '14rem' : '20rem',
	  paddingVertical: deviceType === 'Tablet' ? '10.5rem' : '15rem',
	  alignItems: 'center',
	},
	Caret: {
	  fontSize: deviceType === 'Tablet' ? '13rem' : '18rem',
	  fill: 'rgba(0,0,0,0.25)',
	},
	Wheel: {
	  position: 'relative',
	},
	Abs: {
	  position: 'absolute',
	  height: deviceType === 'Tablet' ? '175rem' : '220rem',
	  width: deviceType === 'Tablet' ? '175rem' : '220rem',
	  transform: [{scale: 0.35}],
	  zIndex: 2,
	},
	Wheel_Img: {
	  height: deviceType === 'Tablet' ? '175rem' : '220rem',
	  width: deviceType === 'Tablet' ? '175rem' : '220rem',
	},
	Results_Header: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  justifyContent: 'space-between',
	  paddingBottom: deviceType === 'Tablet' ? '3.5rem' : '5rem',
	  borderBottomWidth: 2,
	  borderBottomColor: 'rgba(0,0,0,0.1)',
	},
	Results_Count: {
	  fontSize: deviceType === 'Tablet' ? '14rem' : '20rem',
	  lineHeight: deviceType === 'Tablet' ? '21rem' : '30rem',
	  letterSpacing: -0.75,
	  fontFamily: 'Sen-Bold',
	},
	Page_Count: {
	  fontSize: deviceType === 'Tablet' ? '10.5rem' : '15rem',
	  color: 'rgba(0,0,0,0.75)',
	  fontFamily: 'Sen-Bold',
	},
	Results_body: {
	  paddingTop: deviceType === 'Tablet' ? '3.5rem' : '5rem',
	},
	HolidayHeaderView: {
	  flexDirection: 'row',
	  marginVertical: '10rem',
	},
	HolidayHeaderIcon: {
	  width: deviceType === 'Tablet' ? '13rem' : '16rem',
	  height: deviceType === 'Tablet' ? '13rem' : '16rem',
	  fill: 'rgb(0,0,0)',
	  color: 'rgb(0,0,0)',
	},
	HolidayHeaderText: {
	  fontSize: deviceType === 'Tablet' ? '12rem' : '16rem',
	  fontFamily: 'Sen-Bold',
	},
	HolidayTextTitleContainer: {
	  marginVertical: '10rem',
	},
	HolidayAuthorText: {
	  fontSize: deviceType === 'Tablet' ? '12rem' : '14rem',
	  color: 'rgba(0,0,0,0.5)',
	  fontFamily: 'Sen-Bold',
	  marginVertical: '5rem',
	},
	HolidayHeadingText: {
	  fontSize: deviceType === 'Tablet' ? '14rem' : '20rem',
	  fontFamily: 'Sen-Bold',
	},
	HolidayContentText: {
	  color: 'rgba(0,0,0,0.5)',
	  letterSpacing: 0.75,
	  fontFamily: 'Sen-Regular',
	  fontSize: deviceType === 'Tablet' ? '9rem' : '15rem',
	  lineHeight: deviceType === 'Tablet' ? '14rem' : '21rem',
	},
	ShufflePlayContainer: {
	  borderRadius: deviceType === 'Tablet' ? '7rem' : '10rem',
	  paddingHorizontal: deviceType === 'Tablet' ? '14rem' : '20rem',
	  paddingVertical: deviceType === 'Tablet' ? '12rem' : '17rem',
	  marginBottom: deviceType === 'Tablet' ? '10.5rem' : '15rem',
	},
	ShuffleIconsStyle: {
	  fontSize: deviceType === 'Tablet' ? '13rem' : '18rem',
	},
	flexRow: {
	  flexDirection: 'row',
	},
	shuffleIconContainer: {flex: 1, justifyContent: 'center'},
  })
export default Hjem