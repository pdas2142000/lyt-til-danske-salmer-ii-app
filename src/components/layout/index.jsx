/**React Imports */
import React, {useContext} from 'react'
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native'

/**Libraries */
import {getDeviceType} from 'react-native-device-info'
import {useRoute} from '@react-navigation/native'
import {useTheme} from '@react-navigation/native'

/**Components */
import { ScreenTitle } from '../common/screen-title'

/**Local Imports */
import { AuthContext } from '../../context/auth-context'
import { IconProps } from '../../utils/helpers/iconprops'
import { BASE_URL } from '../../constants/url'

/**Icons */
import Logo from '../../../assets/logo.svg'
import MenuIcon from '../../../assets/icons/menu-burger.svg'
import ChevronLeftIcon from '../../../assets/icons/arrow-left.svg'

/**Styles */
import styles from './styles'

let deviceType = getDeviceType()

/**Main Export */
const ScrollEnabledView = ({children, type}) => {

	const route = useRoute()
	const {colors} = useTheme()

	const isScrollViewNeeded =
		route.name == 'Hjem' ||
		route.name == 'Spilleliste' ||
		route.name == 'Trosbekendelse' ||
		route.name == 'Kvindestemme' ||
		route.name == 'Mandsstemme' ||
		route.name == 'Bryllup' ||
		route.name == 'Begravelse'
		? false
		: true
	return isScrollViewNeeded ? (
		<ScrollView style={[styles.Wrapper, {backgroundColor: colors.lighterBackground}]} contentContainerStyle={ type === 'add_card' ? { flexGrow: 1 } : null}>
			{children}
		</ScrollView>
	) : (
		<View style={[styles.Wrapper, {backgroundColor: colors.lighterBackground}]}>
			{children}
		</View>
	)
}

const Layout = ({
	children,
	title,
	navigation,
	ignoreStyles,
	type,
	ShouldShowBack = false,
}) => {
		
	const {colors} = useTheme()
	const route = useRoute()
	const {UserData} = useContext(AuthContext)

		return (
			<>
			<SafeAreaView style={[styles.Container, {backgroundColor: colors.background}]}	>
				<StatusBar
					backgroundColor={colors.background}
					barStyle="dark-content"
				/>
			</SafeAreaView>
			<View style={[styles.Header, {backgroundColor: colors.background}]}>
				<View style={styles.HeaderWrap}>
					<TouchableOpacity
						onPress={() => navigation.navigate('Hjem')}
						style={styles.HeaderWrapLogo}
					>
						<Logo style={styles.HeaderWrapIcon} height={35} width={35} />
						<Text style={[styles.HeaderWrapText, {color: colors.text}]}>
							Lyt til danske salmer
						</Text>
					</TouchableOpacity>
					<View style={styles.HeaderWrapInner}>
						{UserData && UserData.token ? (
							<TouchableOpacity
								style={styles.ProfileBtn}
								onPress={() => navigation.navigate('Profile')}
							>
								<Image
									source={
										UserData && UserData.image && UserData.image.url
										? {uri: BASE_URL.url + UserData.image.url}
										: require('../../../assets/profile.png')
									}
									style={styles.ProfileIcon}
								/>
							</TouchableOpacity>
						) : null}

						{deviceType == 'Handset' &&
						route.name != 'Login' &&
						route.name != 'Register' &&
						route.name != 'ForgotPassword' &&
						route.name != 'Subscriptions' &&
						route.name != 'Invoices' && 
						route.name != 'Card' &&
						route.name != 'AddCard' ? (
							<TouchableOpacity
								style={styles.MenuBtn}
								onPress={() => navigation.openDrawer()}
							>
								<MenuIcon
									{...IconProps(25)}
									fill={colors.primary}
									name="menu"
									style={styles.menu}
								/>
							</TouchableOpacity>
						) : null}
						{ShouldShowBack ? (
							<TouchableOpacity
								style={styles.MenuBtn}
								onPress={() => navigation.goBack()}
							>
								<ChevronLeftIcon
								{...IconProps(18)}
									color={colors.text}
									name="chevron-left"
									style={styles.BackIcon}
								/>
							</TouchableOpacity>
						) : null}
					</View>
				</View>
			</View>
			<View style={styles.Main}>
				<View style={styles.Main_Container}>
					<ScrollEnabledView type={type}>
						<View style={ignoreStyles ? {} : type === "add_card" ? styles.AddCard : styles.Content}>
							{title && <ScreenTitle title={title} />}
							{children}
						</View>
					</ScrollEnabledView>
				</View>
			</View>
			</>
		)
}

export default Layout
