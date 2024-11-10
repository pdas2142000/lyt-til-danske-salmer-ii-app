/**React Imports */
import React, {useState, useEffect, useRef} from 'react'
import {
  StatusBar,
  Dimensions,
  SafeAreaView,
  View,
  Image,
  Text,
} from 'react-native'

/**Libraries */
import EStyleSheet from 'react-native-extended-stylesheet'
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import 'react-native-gesture-handler'
import Toast, {BaseToast} from 'react-native-toast-message'
import SplashScreen from 'react-native-splash-screen'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import NetInfo from '@react-native-community/netinfo'
import { getDeviceType } from 'react-native-device-info'
import { StripeProvider } from '@stripe/stripe-react-native';

/**Navigation */
import AppNavigation from './src/navigation/app-navigation'
import {NavigationContainer} from '@react-navigation/native'
import {ModalPortal} from 'react-native-modals'

/**Local Imports */
import { APP_COLORS, GenerateColorsObject } from './src/constants/colors'
import {BottomSheetProvider} from './src/context/bottom-sheet-context'
import { ThemeContext } from './src/context/theme-context'
import { AuthProvider } from './src/context/auth-context'
import { PlaylistPlayProvider } from './src/context/playlist-play-context'
import { PlayListProvider } from './src/context/play-list-context'
import { ms } from './src/utils/helpers/metrics'
import { IconProps } from './src/utils/helpers/iconprops'

/**Components */
import { PaymentListener } from './src/components/payment-listener'
import {Screen_track} from './src/services/analytics'

/**Icons */
import InfoIcon from './assets/icons/info-with-circle.svg'
const {width} = Dimensions.get('window')
const rem = width / 380;
const remSm = width / 400;
const remTab = width / 500;
let deviceType = getDeviceType();

EStyleSheet.build({
  $rem: deviceType === 'Tablet' ? remTab : width > 400 ? rem : remSm,
});
const toastConfig = {
	/* 
	  overwrite 'success' type, 
	  modifying the existing `BaseToast` component
	*/
	success: ({hide, ...rest}) => (
		<BaseToast
			{...rest}
			style={{borderLeftColor: '#69C779', marginTop: 15, zIndex:9999}}
			contentContainerStyle={{paddingHorizontal: 5}}
			renderLeadingIcon={() => {
			return (
				<View
					style={{
						height: '100%',
						marginHorizontal: 5,
						justifyContent: 'center',
						paddingHorizontal: 7,
					}}
				>
					<Image
						style={{width: 25, height: 25}}
						source={require('./assets/success.png')}
					/>
				</View>
			)
			}}
			text1NumberOfLines={3}
			text2NumberOfLines={3}
			onTrailingIconPress={hide}
		/>
	),
  
	/*
	  Reuse the default ErrorToast toast component
	*/
	error: ({hide, ...rest}) => (
		<BaseToast
			{...rest}
			style={{borderLeftColor: '#FE6301', marginTop: ms(15)}}
			contentContainerStyle={{paddingHorizontal: ms(5)}}
			text1NumberOfLines={3}
			text2NumberOfLines={3}
			onTrailingIconPress={hide}
			renderLeadingIcon={() => (
				<View
					style={{
						height: '100%',
						marginHorizontal: ms(5),
						justifyContent: 'center',
						paddingHorizontal: ms(7),
					}}
				>
					<Image
						style={{width: ms(25), height:ms(25)}}
						source={require('./assets/error.png')}
					/>
				</View>
			)}
		/>
	),
	/* 
	  or create a completely new type - `my_custom_type`,
	  building the layout from scratch
	*/
	info: ({hide, ...rest}) => (
		<BaseToast
			{...rest}
			style={{borderLeftColor: '#34aadc', marginTop: ms(15)}}
			contentContainerStyle={{paddingHorizontal: ms(5)}}
			text1NumberOfLines={3}
			text2NumberOfLines={3}
			onTrailingIconPress={hide}
			renderLeadingIcon={() => (
				<View
					style={{
						height: '100%',
						marginHorizontal: ms(5),
						justifyContent: 'center',
						paddingHorizontal: ms(7),
					}}
				>
					<InfoIcon name="info-with-circle" {...IconProps(25)} color={'#34aadc'} size={25} />
				</View>
			)}
		/>
	),
}
  
const App = () => {
	
	const routeNameRef = useRef()
	const navigationRef = useRef()

	const [isNetworkReachable, setIsNetworkReachable] = useState(true)
	const [paymentStatus, setpaymentStatus] = useState({
		loading: false,
		success: false,
	})
	const [theme, setTheme] = useState({
		dark: false,
		colors: {
			...APP_COLORS,
		},
	})
  
	function MiniOfflineSign() {
		return (
			<View style={styles.offlineAreaStyle}>
				<View style={styles.offlineContainer}>
					{/* Require_translation */}
					<Text style={styles.offlineText}>Ingen internetforbindelse</Text>
				</View>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<Image
						source={require('./assets/wifi.png')}
						width="120"
						height="120"
					/>
				</View>
			</View>
		)
	}
  
	useEffect(() => {
		SplashScreen.hide()
		const unsubscribe = NetInfo.addEventListener(({isInternetReachable}) => {
			setIsNetworkReachable(
			isInternetReachable != null ? isInternetReachable : true,
			)
		})
		return () => {
			unsubscribe()
		}
	}, [])

	const ChangeAppColors = colorobj => {
		let GeneratedColors = GenerateColorsObject({
			// background: colorobj.bg_color ? '#' + colorobj.bg_color : undefined,
			buttonBackground: colorobj.bg_button_color
			? '#' + colorobj.bg_button_color
			: undefined,
			buttonBorder: colorobj.bg_text_color
			? colorobj.bg_button_color == 'ffffff' ||
				colorobj.bg_button_color == 'fff' ||
				colorobj.bg_button_color == 'white'
				? '#' + colorobj.bg_text_color
				: '#' + colorobj.bg_button_color
			: undefined,
			buttonText: colorobj.bg_text_color
			? '#' + colorobj.bg_text_color
			: undefined,
			primary: colorobj.tab_link_color
			? '#' + colorobj.tab_link_color
			: undefined,
			// text: colorobj.text_color ? '#' + colorobj.text_color : undefined,
		})
		setTheme({
			dark: false,
			colors: {
			...GeneratedColors,
			},
		})
	}

	const changePaymentStatus = (loading, success = false) => {
		setpaymentStatus({
			loading: loading,
			success: success,
		})
	}

	return (
		<StripeProvider
			publishableKey="pk_live_51Jpt7YLH8VJS97EmYjkOYwuTgnpCp82tfTFk7DvuGMSHBrK09KUUCEYRCfJRT5SIVrMLJUMcScj9qJ3S2DuzNsQC00MahPMFCe"
			locale="da"
		>
			<ThemeContext.Provider
				value={{
				theme,
				setTheme,
				ChangeAppColors,
				paymentStatus,
				changePaymentStatus,
				}}
			>
				<PaymentListener
					onCloseModal={isPaymentSuccess => {
						if (isPaymentSuccess) {
						setpaymentStatus({
							loading: false,
							success: true,
						});
						} else {
						//payment process failed
						setpaymentStatus({
							loading: false,
							success: false,
						})
						}
					}}
				/>
				{
					isNetworkReachable ? (
					<GestureHandlerRootView>
						<NavigationContainer
							ref={navigationRef}
							onReady={() => {
								routeNameRef.current =
								navigationRef.current.getCurrentRoute().name
							}}
							onStateChange={() => {
								const previousRouteName = routeNameRef.current
								const currentRoute =
								navigationRef.current.getCurrentRoute()
								if (previousRouteName !== currentRoute.name) {
									Screen_track(currentRoute.name, currentRoute.name)
								}
								routeNameRef.current = currentRoute.name
							}}
							theme={theme}
						>
							<AuthProvider>
								<PlaylistPlayProvider>
									<BottomSheetProvider>
										<PlayListProvider>
											<BottomSheetModalProvider>
												<AppNavigation/>
											</BottomSheetModalProvider>
											<ModalPortal />
										</PlayListProvider>
									</BottomSheetProvider>
								</PlaylistPlayProvider>
							</AuthProvider>
						</NavigationContainer>
						<Toast config={toastConfig} />
					</GestureHandlerRootView>
				)
				:
				<>
					 <SafeAreaView style={{flex: 1, backgroundColor: '#b52424', top: 0}}>
						<StatusBar backgroundColor="#b52424" barStyle="light-content" />
							<MiniOfflineSign />
						</SafeAreaView>
					<SafeAreaView style={{flex: 0, backgroundColor: '#fff'}} />
				</>
				}
				
			</ThemeContext.Provider>
		</StripeProvider>
	)
}

const styles = EStyleSheet.create({
	offlineAreaStyle: {
		flex: 1,
		backgroundColor: '#fff',
	},
	offlineContainer: {
		backgroundColor: '#b52424',
		height: '50rem',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		width,
		zIndex: 2,
	},
	offlineText: {
	  	color: '#fff',
	},
})
export default App