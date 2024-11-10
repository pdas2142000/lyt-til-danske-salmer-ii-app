import React, { useState, useEffect, useContext, useRef } from 'react'
import {
	Text,
	View,
	TouchableOpacity,
	Platform,
	FlatList,
	ActivityIndicator,
	Linking,
	AppState,
} from 'react-native'
import Layout from '../../../components/layout'
import EStyleSheet from 'react-native-extended-stylesheet'
import BoxIcon from '../../../../assets/icons/drawer-icons/box.svg'
import { getDeviceType } from 'react-native-device-info'
import { AuthContext } from '../../../context/auth-context'
import { ShowToast } from '../../../services/toast-message'
import {
	requestSubscription,
	getSubscriptions,
	getAvailablePurchases,
	finishTransaction,
	clearTransactionIOS
} from 'react-native-iap'
import { makeRequest } from '../../../utils/make-request'
import { useTheme, useIsFocused } from '@react-navigation/native'
import { ThemeContext } from '../../../context/theme-context'
import { PlayListContext } from '../../../context/play-list-context'
import { PolicyContainer } from '../../../components/policy-container'
import { IconProps } from '../../../utils/helpers/iconprops'
import ArrowLeftIcon from '../../../../assets/icons/angle-left.svg'
import { SubmitRestore } from '../../../components/payment-listener/SubmitPaymentAPi'

let deviceType = getDeviceType()

const productIds = Platform.select({
	ios: ['com.salmer.sub.basic', 'com.salmer.sub.mid', 'com.salmer.sub.premium'],
	android: [
		'com.salmer.sub.basic',
		'com.salmer.sub.mid',
		'com.salmer.sub.premium',
	],
})

const Subscriptions = ({ navigation }) => {

	const isFocused = useIsFocused()
	const appState = useRef(AppState.currentState)
	const [appStateVisible, setAppStateVisible] = useState(appState.current)
	const { UserData, UpdateUser, ResponseFilter } = useContext(AuthContext)
	const { LoadPlayList } = useContext(PlayListContext)
	const { colors } = useTheme()
	const { paymentStatus, changePaymentStatus } = useContext(ThemeContext)

	const [PurchaseDisabled, SetPurchaseDisabled] = useState(false)

	const [StripePaymentRetry, SetStripePaymentRetry] = useState(false)

	const [Plans, SetPlans] = useState([])

	const [RequestLoading, SetRequestLoading] = useState(false)
	const [RequestLoaded, SetRequestLoaded] = useState(false)

	const [VerifyRequestLoading, SetVerifyRequestLoading] = useState(false)

	const [alreadySubScribed, SetalreadySubScribed] = useState(false)
	const [purchasedProductId, SetpurchasedProductId] = useState(null)
	const [productsPurchased, SetproductsPurchased] = useState(null)

	const [StripeAlreadyCancelled, SetStripeAlreadyCancelled] = useState(false)
	const [StripeAlreadyCancelledMsg, SetStripeAlreadyCancelledMsg] =
		useState('')

	const [CancelLoading, SetCancelLoading] = useState(false)

	const resendVerification = async () => {
		try {
			if (!UserData.token) {
				return
			}
			SetVerifyRequestLoading(true)
			let responseOfApi = await makeRequest(
				'GET',
				`user-profile/resend-verification-email`,
				{},
				UserData.token,
			)
			responseOfApi = ResponseFilter(responseOfApi)
			if (!responseOfApi) {
				SetVerifyRequestLoading(false)
				return
			}
			// console.log(responseOfApi, 'responseOfApi resend')
			if (responseOfApi.error == 1) {
				ShowToast(responseOfApi.msg)
			} else {
				ShowToast(responseOfApi.msg, 'error')
			}
			SetVerifyRequestLoading(false)
		} catch (err) {
			SetVerifyRequestLoading(false)
			console.log('error at resend email', err)
		}
	}

	const getUserSubscriptions = async (paymentFinished = false) => {
		try {
			let responseOfApi = await makeRequest(
				'GET',
				`subscriptions/packages`,
				{},
				UserData && UserData.token ? UserData.token : null,
			)
			// responseOfApi.error = 5
			// console.log('responseOfApi', responseOfApi.error)
			responseOfApi = ResponseFilter(responseOfApi)
			if (!responseOfApi) {
				return
			}

			if (responseOfApi.error == 1) {
				let FetchedPlans = []
				let PlanDetails = {}
				if (responseOfApi.data && Array.isArray(responseOfApi.data)) {
					responseOfApi.data.forEach(item => {
						if (Platform.OS == 'android') {
							FetchedPlans.push(item.google)
							PlanDetails[item.google] = {
								name: item.name,
								content: item.content,
							}
						} else {
							FetchedPlans.push(item.apple)
							PlanDetails[item.apple] = {
								name: item.name,
								content: item.content,
							}
						}
					})
				}
				// console.log("responseOfApi",responseOfApi)

				let StorePlans = await getSubscriptions({ skus: FetchedPlans })
				var temp = [...StorePlans]
				if (StorePlans && Array.isArray(StorePlans)) {
					temp.map(val => {
						val.title =
							PlanDetails[val.productId] && PlanDetails[val.productId].name
								? PlanDetails[val.productId].name
								: val.title
						val.content =
							PlanDetails[val.productId] && PlanDetails[val.productId].content
								? PlanDetails[val.productId].content
								: ''
						return val
					})
				}

				SetPlans(temp)
				if (responseOfApi.active && responseOfApi.active.method) {
					if (
						responseOfApi.active.status &&
						responseOfApi.active.status == 'payment_action_required'
					) {
						SetStripePaymentRetry(true)
					} else {
						if (paymentFinished) {
							LoadPlayList('', true)
							ShowToast('Din betaling er modtaget')
						}
					}
					SetalreadySubScribed(true)
					SetproductsPurchased(responseOfApi.active)
					let purchasedProductId =
						responseOfApi.active && responseOfApi.active.subscription
							? Platform.OS == 'ios'
								? responseOfApi.active.subscription.apple
								: responseOfApi.active.subscription.google
							: ''

					SetpurchasedProductId(purchasedProductId)
					if (StorePlans && Array.isArray(StorePlans)) {
						var temp = [...StorePlans]
						temp.map(val => {
							val.selected = val.productId == purchasedProductId ? true : false
							return val
						})
						SetPlans(temp)
					}
				}else{
					// const purchases = await getAvailablePurchases();
					// const highestIndex = purchases.reduce((maxIndex, transaction, index, array) => 
					// 	transaction.transactionDate > array[maxIndex].transactionDate ? index : maxIndex, 
					// 	0
					// );
					// const previousPurchase=purchases[highestIndex]
					// let apiResult=SubmitRestore(previousPurchase,UserData.token)
					// if(apiResult){
        			// 	await finishTransaction({purchase:previousPurchase,isConsumable: false});
					// }
					// SetPlans(temp)
				}
				SetRequestLoaded(true)
				SetRequestLoading(false)
				// if (responseOfApi.active && responseOfApi.active.method == 'stripe') {
				// if (responseOfApi.active.renew == 0) {
				// 	SetStripeAlreadyCancelled(true)
				// 	SetStripeAlreadyCancelledMsg(responseOfApi.active.message)
				// }
				// }
			}
		} catch (err) {
			console.log(err, 'error at getting sub')
		}
	}

	useEffect(() => {
		if (paymentStatus.success) {
			if (UserData && UserData.token) {
				getUserSubscriptions(true)
			}
			//Require_translation
			// ShowToast('Your order has been placed successfully')
			changePaymentStatus(false, false)
		}
	}, [paymentStatus])

	const CancelSub = async () => {
		try {
			if (productsPurchased.method == 'stripe') {
				if (!productsPurchased.id) {
					return
				}
				SetCancelLoading(true)
				let responseOfApi = await makeRequest(
					'DELETE',
					`subscriptions/cancel/${productsPurchased.id}`,
					{},
					UserData.token,
				)
				responseOfApi = ResponseFilter(responseOfApi)
				if (!responseOfApi) {
					SetCancelLoading(false)
					return
				}
				if (responseOfApi.error == 1) {
					ShowToast(responseOfApi.msg)
					SetalreadySubScribed(false)
					SetpurchasedProductId(null)
					SetproductsPurchased(null)
				} else {
					if (responseOfApi.msg) {
						ShowToast(responseOfApi.msg, 'error')
					}
				}
				SetCancelLoading(false)
			} else {
				if (Platform.OS == 'android') {
					if (purchasedProductId) {
						let packageName = 'dk.lyttildanskesalmer.app'
						Linking.openURL(
							`https://play.google.com/store/account/subscriptions?package=${packageName}&sku=${purchasedProductId}`,
						)
					} else {
						Linking.openURL(
							`https://play.google.com/store/account/subscriptions`,
						)
					}
				} else if (Platform.OS == 'ios') {
					Linking.openURL('https://apps.apple.com/account/subscriptions')
				}
			}
		} catch (err) {
			console.log(err, 'on cancel subscription')
		}
	}

	useEffect(() => {
		if (UserData && UserData.token) {
			if (!UserData.verified) {
				SetPurchaseDisabled(true)
			}
		}
	}, [UserData])

	const GetColorInfoAgain = async () => {
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
			if (resp.error == 1) {
				if (resp.user) {
					UpdateUser({ data: resp.user })
				}
			}
		} catch (err) {
			console.log('failed to get user and color', err)
		}
	}

	useEffect(() => {
		if (isFocused) {
			if (UserData) {
				if (!UserData.verified) {
					GetColorInfoAgain()
				}
			}
		}
	}, [isFocused])

	useEffect(() => {
		initIAP()
		const subscription = AppState.addEventListener('change', nextAppState => {
			if (appState.current.match(/background/) && nextAppState === 'active') {
				if (UserData && UserData.token && !UserData.verified) {
					GetColorInfoAgain()
				}
			}

			appState.current = nextAppState
			setAppStateVisible(appState.current)
		})
		return () => {
			subscription.remove()
		}
	}, [])

	const initIAP = async () => {
		try {
			getUserSubscriptions()
		} catch (err) {
			console.log(err, 'initIAP')
		}
	}

	const StartPayment = async (sku,offerToken) => {
		try {
			changePaymentStatus(true, false)
			if(Platform.OS==="ios"){
				await clearTransactionIOS()
			}
			let purchaseResult=await requestSubscription({ sku,...(offerToken && {subscriptionOffers: [{sku, offerToken}]}), })
		} catch (err) {
			console.log(err.code, err.message)
		}
	}

	const StartPaymentProcess = () => {

		let FoundItem = Plans.find(item => {
			return item.selected
		})
		
		if (FoundItem) {
			
			const offerToken= Platform.OS==="android"?FoundItem.subscriptionOfferDetails[0].offerToken:null
			StartPayment(FoundItem.productId,offerToken)
		} else {
			ShowToast('Vælg et abonnement før du fortsætter', 'error')
		}
	}
	// const GetSubs = async () => {
	//   SetRequestLoading(true)
	//   let response = await API(
	//     'GET',
	//     '/subscriptions/packages',
	//     {},
	//     UserData.token,
	//   )
	//   console.log('Subscriptions', response)
	//   if (response.error == 1) {
	//     SetPlans(response.data)
	//   }
	//   SetRequestLoading(false)
	// }

	// const InitPayment = async SubID => {
	//   let response = await API(
	//     'GET',
	//     `/subscriptions/initiate/${SubID}`,
	//     {},
	//     UserData.token,
	//   )
	//   console.log('init payment', response)
	// }

	const OpenStripeLink = () => {
		try {
			if (productsPurchased.invoice_url) {
				Linking.openURL(invoice_url)
			}
		} catch (error) {
			console.log('failed to open strip url', error)
		}
	}


	return (
		<Layout {...{ title: 'Abonnement', navigation, ShouldShowBack: true }}>
			<View style={styles.Packages}>
				{!RequestLoaded ? (
					<View style={styles.EmptyContainer}>
						<ActivityIndicator color={colors.primary} size={'large'} />
					</View>
				) : (
					<View>
						<View>
							<Text style={[styles.Box_Desc, { color: colors.text, paddingBottom: EStyleSheet.value('10rem'), },]}>
								Du skal oprette et 'Spillelister' eller et 'Spillelister+'
								abonnement, hvis du ønsker at lave spillelister eller at kunne
								høre salmer med rettighedsbelagte melodier.
							</Text>
							<Text style={[styles.Box_Desc, { color: colors.text, paddingBottom: EStyleSheet.value('10rem'), },]}>
								Abonnementspriserne er årlige, og abonnementerne løber indtil du
								annullerer abonnementet.
							</Text>
							{purchasedProductId === 'com.salmer.sub.basic' ? (
								<View style={[styles.Box_Desc, { paddingBottom: EStyleSheet.value('10rem') },]}>
									<Text style={[styles.Box_Desc, { fontWeight: 'bold', color: colors.text },]}>
										Du har et 50 krs. abonnement fra den gamle hjemmeside.
									</Text>
									<Text style={[styles.Box_Desc, { fontWeight: 'bold', color: colors.text },]}>
										Det inkluderer ikke afspilning af rettighedsbelagte salmer.
									</Text>
									<Text style={[styles.Box_Desc, { fontWeight: 'bold', color: colors.text },]}>
										Abonnementet fortsætter indtil din periode er udløbet, men
										når det udløber kan det ikke fornys.
									</Text>
									<Text style={[styles.Box_Desc, { fontWeight: 'bold', color: colors.text },]}>
										Derefter vil du kun kunne vælge mellem de 2 nedenstående
										abonnementer.
									</Text>
									<Text style={[styles.Box_Desc, { fontWeight: 'bold', color: colors.text },]}>
										Hvis du vælger at opgradere dit abonnement nu, inden 30.
										november 2022, refunderer vi de 50 kr. fra dit gamle
										abonnement.
									</Text>
								</View>
							) : null}
							{alreadySubScribed ? (
								<View></View>
							) : (
								<View>
									<Text
										style={[
											styles.Box_Desc,
											{ color: colors.text, paddingBottom: EStyleSheet.value('10rem'), },
										]}
									>
										{!StripeAlreadyCancelled
											? 'Hvis du ikke tidligere har haft et abonnement, trækker vi først pengene fra dit kort efter 7 dage - hvilket giver dig mulighed for at prøve om det er noget for dig. Hvis du annullerer inden de 7 dage er gået, annulleres dit abonnement, og vi trækker ikke penge fra dit kort.'
											: StripeAlreadyCancelledMsg}
									</Text>
								</View>
							)}
						</View>
						<FlatList
							data={Plans}
							scrollEnabled={false}
							keyExtractor={item => item.content.toString()}
							renderItem={({ item }) => {
								const price= Platform.OS==="android"?item.subscriptionOfferDetails[0].pricingPhases.pricingPhaseList[0].formattedPrice:item.localizedPrice
								return (
									<TouchableOpacity
										style={[
											styles.Box,
											{
												borderColor: item.selected ?
													colors.primary : 'transparent',
												backgroundColor: colors.background
											},
										]}
										key={item.productId}
										onPress={() => {
											if (alreadySubScribed) { return }
											var temp = [...Plans]
											temp.map(val => {
												val.selected =
													val.productId == item.productId ? true : false
												return val
											})
											SetPlans(temp)
										}}
									>
										<View style={styles.Box_Inner}>
											<Text style={[styles.Box_Title, { color: colors.text }]}>
												{item.title}
											</Text>
											<Text style={[styles.Box_Desc, { color: colors.text }]}>
												{item.content}
											</Text>
											<Text style={[styles.Box_Price, { color: colors.primary }]}>
												{price} pr. år
											</Text>
										</View>
										<BoxIcon
											name="box"
											{...IconProps(60)}
											style={[styles.Box_Icon, { color: colors.text }]}
										/>
									</TouchableOpacity>
								)
							}}
						/>
					</View>
				)}
			</View>
			<View
				style={[styles.Box,
				{
					borderColor: 'transparent',
					backgroundColor: colors.background,
					marginBottom: EStyleSheet.value('5rem'),
				},
				]}
			>
				<PolicyContainer buttonName={'Køb'} />
			</View>
			<>
				{!alreadySubScribed ? (
					<TouchableOpacity
						disabled={paymentStatus.loading || PurchaseDisabled}
						onPress={() => {
							if (UserData && UserData.token) {
								StartPaymentProcess()
							} else {
								navigation.navigate('Login')
							}
						}}
						style={[
							styles.Plan_Btn,
							{
								backgroundColor:
									paymentStatus.loading || PurchaseDisabled
										? '#e9ebf5'
										: colors.buttonBackground,
								borderColor: colors.buttonBorder,
							},
						]}
					>
						{!paymentStatus.loading ? (
							<Text
								style={[
									styles.Plan_Btn_Text,
									{
										color:
											paymentStatus.loading || PurchaseDisabled
												? colors.text
												: colors.buttonText,
									},
								]}
							>
								Køb
							</Text>
						) : (
							<ActivityIndicator color={colors.buttonText} size={'small'} />
						)}
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						disabled={paymentStatus.loading || StripeAlreadyCancelled}
						onPress={() => { CancelSub() }}
						style={[
							styles.Plan_Btn,
							{
								backgroundColor: colors.buttonBackground,
								borderColor: colors.buttonBorder,
							},
						]}
					>
						{!CancelLoading ? (
							<Text style={[styles.Plan_Btn_Text, { color: colors.buttonText }]}>
								{'Annuller abonnement'}
							</Text>
						) : (
							<ActivityIndicator color={colors.buttonText} size={'small'} />
						)}
					</TouchableOpacity>
				)}
				{UserData && UserData.verified == 0 ? (
					<View
						style={[
							styles.Box,
							{
								flexDirection: 'column',
								alignItems: 'flex-start',
								borderColor: 'transparent',
								backgroundColor: colors.background,
							},
						]}
					>
						<Text style={[styles.Box_Title, { color: colors.text }]}>
							{'Venligst bekræft din emailaddresse, før køb af abonnement.'}
						</Text>
						<TouchableOpacity
							onPress={() => { resendVerification() }}
							style={[
								styles.Plan_Btn,
								{
									width: EStyleSheet.value('100%'),
									alignSelf: 'flex-end',
									backgroundColor: colors.buttonBackground,
									borderColor: colors.buttonBorder,
								},
							]}
						>
							{!VerifyRequestLoading ? (
								<Text style={[styles.Plan_Btn_Text, { color: colors.buttonText }]}>
									{'Send bekræftelsesmail igen'}
								</Text>
							) : (
								<ActivityIndicator color={colors.buttonText} size={'small'} />
							)}
						</TouchableOpacity>
					</View>
				) : null}
			</>
			{StripePaymentRetry ? (
				<View
					style={[
						styles.Box,
						{
							flexDirection: 'column',
							alignItems: 'flex-start',
							borderColor: 'transparent',
							backgroundColor: colors.background,
						},
					]}
				>
					<Text style={[styles.Box_Title, { color: colors.text }]}>
						{'Betalingen af dit abonnement kunne ikke gennemføres. Venligst gennemfør betalingen, for at fortsætte dit abonnement.'}
					</Text>
					<View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
						<View style={{}}>
							<TouchableOpacity
								disabled={paymentStatus.loading || StripeAlreadyCancelled}
								onPress={() => { CancelSub() }}
								style={[
									styles.Plan_Btn,
									{
										// width: EStyleSheet.value('250rem'),
										// alignSelf: 'flex-end',
										backgroundColor: colors.buttonBackground,
										borderColor: colors.buttonBorder,
									},
								]}>
								{!CancelLoading ? (
									<Text
										style={[
											styles.Plan_Btn_Text_Strip,
											{ color: colors.buttonText },
										]}>
										{'Annuller abonnement'}
									</Text>
								) : (
									<ActivityIndicator color={colors.buttonText} size={'small'} />
								)}
							</TouchableOpacity>
						</View>
						<View style={{ marginLeft: EStyleSheet.value('5rem') }}>
							<TouchableOpacity
								onPress={() => { OpenStripeLink() }}
								style={[
									styles.Plan_Btn,
									{
										// width: EStyleSheet.value('250rem'),
										// alignSelf: 'flex-end',
										backgroundColor: colors.buttonBackground,
										borderColor: colors.buttonBorder,
									},
								]}
							>
								<Text
									style={[
										styles.Plan_Btn_Text_Strip,
										{ color: colors.buttonText },
									]}
								>
									{'Bekræft din betaling'}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			) : null}
			<TouchableOpacity
				style={styles.Back_Btn}
				onPress={() => navigation.navigate('Profile')}
			>
				<ArrowLeftIcon
					name="arrow-left"
					{...IconProps(14)}
					style={[styles.Back_Btn_Icon, { color: colors.text }]}
				/>
				<Text style={[styles.Back_Btn_Text, { color: colors.text }]}>
					tilbage til profilen
				</Text>
			</TouchableOpacity>
		</Layout>
	)
}

const styles = EStyleSheet.create({
	Box: {
		padding: deviceType === 'Tablet' ? '14rem' : '20rem',
		marginBottom: deviceType === 'Tablet' ? '10.5rem' : '15rem',
		borderRadius: deviceType === 'Tablet' ? '7rem' : '10rem',
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 3,
	},
	Box_Inner: {
		flex: 1,
		paddingRight: '10rem',
	},
	Box_Title: {
		fontFamily: 'Sen-Bold',
		fontSize: deviceType === 'Tablet' ? '12rem' : '16rem',
		marginBottom: deviceType === 'Tablet' ? '4rem' : '6rem',
		letterSpacing: -0.35,
	},
	Box_Desc: {
		fontFamily: 'Sen-Regular',
		fontSize: deviceType === 'Tablet' ? '11rem' : '14rem',
		marginBottom: deviceType === 'Tablet' ? '4rem' : '6rem',
		letterSpacing: -0.35,
	},
	Box_Price: {
		fontFamily: 'Sen-Bold',
		fontSize: deviceType === 'Tablet' ? '14rem' : '20rem',
		marginBottom: deviceType === 'Tablet' ? '3.5rem' : '5rem',
		letterSpacing: -0.35,
	},
	Box_Sm: {
		fontFamily: 'Sen-Regular',
		fontSize: deviceType === 'Tablet' ? '10rem' : '15rem',
		letterSpacing: -0.35,
	},
	Box_Icon: {
		fontSize: deviceType === 'Tablet' ? '42rem' : '60rem',
		opacity: 0.1,
	},
	Plan_Btn: {
		borderWidth: 1,
		borderRadius: deviceType === 'Tablet' ? '5rem' : '8rem',
		paddingVertical: deviceType === 'Tablet' ? '8.5rem' : '12rem',
		paddingHorizontal: deviceType === 'Tablet' ? '11rem' : '16rem',
		alignItems: 'center',
		marginVertical: deviceType === 'Tablet' ? '7rem' : '10rem',
	},
	Plan_Btn_Text: {
		fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
		fontFamily: 'Sen-Bold',
	},
	Plan_Btn_Text_Strip: {
		fontSize: deviceType === 'Tablet' ? '9rem' : '10.8rem',
		fontFamily: 'Sen-Bold',
	},

	EmptyContainer: {
		height: '200rem',
		justifyContent: 'center',
		alignItems: 'center',
	},
	TCFont_link: {
		fontFamily: 'Sen-Bold',
		textDecorationLine: 'underline',
	},
	TCFont: {
		fontFamily: 'Sen-Regular',
		fontSize: deviceType === 'Tablet' ? '9.5rem' : '14rem',
		marginRight: deviceType === 'Tablet' ? '5.5rem' : '8rem',
	},
	Back_Btn: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: deviceType === 'Tablet' ? '11rem' : '16rem',
	},
	Back_Btn_Icon: {
		fontSize: deviceType === 'Tablet' ? '10rem' : '14rem',
		marginRight: deviceType === 'Tablet' ? '5rem' : '8rem',
	},
	Back_Btn_Text: {
		fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
		fontFamily: 'Sen-Bold',
	},
})

export default Subscriptions
