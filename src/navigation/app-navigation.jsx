/**React Imports */
import React, { useState, useContext } from 'react'
import { Dimensions, View, Text } from 'react-native'

/**Libraries */
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { getDeviceType } from 'react-native-device-info'
import EStyleSheet from 'react-native-extended-stylesheet'
import { useTheme } from '@react-navigation/native'

// screens
import Hjem from '../screens/hjem'
import Login from '../screens/auth/login'
import Register from '../screens/auth/register'
import ForgotPassword from '../screens/auth/forgot-password'
import Spilleliste from '../screens/spilleliste'
import Generelt from '../screens/om-denne-side/generelt'
import SporgsmalOgSvar from '../screens/om-denne-side/sporgsmal-og-svar'
import Indspilningerne from '../screens/om-indspilningerne/indspilningerne'
import Medvirkende from '../screens/om-indspilningerne/medvirkende'
import KirkerOgOrgler from '../screens/om-indspilningerne/kirker-og-orgler'
import Rettigheder from '../screens/om-indspilningerne/rettigheder'
import Kvindestemme from '../screens/ritualer/kvindestemme'
import Mandsstemme from '../screens/ritualer/mandsstemme'
import Trosbekendelse from '../screens/ritualer/trosbekendelse'
import Bryllup from '../screens/organ/bryllup'
import Begravelse from '../screens/organ/begravelse'
import Links from '../screens/links'
import StotOs from '../screens/stot-os'
import Kontakt from '../screens/kontakt'
import ForslagTilVielse from '../screens/orgelmusik/forslag-til-vielse'
import ForslagRilBisættelse from '../screens/orgelmusik/forslag-ril-bisættelse'
import Profile from '../screens/profile'
import ProfileSettings from '../screens/profile/profile-settings'
import ProfileChangePassword from '../screens/profile/profile-change-password'
import PdfViewer from '../screens/profile/pdf-viewer'
import Invoices from '../screens/profile/invoices'
import Subscriptions from '../screens/profile/subscriptions'
import Card from '../screens/profile/card'
import AddCard from '../screens/profile/add-card'

/**Custom Drawer */
import Drawer from './drawer'

const { width } = Dimensions.get('window')

// stacks and drawers
const MyDrawer = createDrawerNavigator()
const AppStack = createNativeStackNavigator()

// global functions
let deviceType = getDeviceType()

const DrawerStack = () => {
	const { colors } = useTheme()
	const [MyScreens] = useState([
		{
		id: 'scrn01',
		title: 'Hjem',
		Component: Hjem,
		},
		{
		id: 'scrn02',
		title: 'Spilleliste',
		Component: Spilleliste,
		},
		{
		id: 'scrn03',
		title: 'Generelt',
		Component: Generelt,
		},
		{
		id: 'scrn04',
		title: 'SporgsmalOgSvar',
		Component: SporgsmalOgSvar,
		},
		{
		id: 'scrn05',
		title: 'Indspilningerne',
		Component: Indspilningerne,
		},
		{
		id: 'scrn06',
		title: 'Medvirkende',
		Component: Medvirkende,
		},
		{
		id: 'scrn07',
		title: 'KirkerOgOrgler',
		Component: KirkerOgOrgler,
		},
		{
		id: 'scrn08',
		title: 'Rettigheder',
		Component: Rettigheder,
		},
		{
		id: 'scrn09',
		title: 'Mandsstemme',
		Component: Mandsstemme,
		},
		{
		id: 'scrn10',
		title: 'Kvindestemme',
		Component: Kvindestemme,
		},
		{
		id: 'scrn11',
		title: 'Trosbekendelse',
		Component: Trosbekendelse,
		},
		{
		id: 'scrn12',
		title: 'ForslagTilVielse',
		Component: ForslagTilVielse,
		},
		{
		id: 'scrn13',
		title: 'ForslagTilBisættelse',
		Component: ForslagRilBisættelse,
		},
		{
		id: 'scrn14',
		title: 'Links',
		Component: Links,
		},
		{
		id: 'scrn15',
		title: 'StotOs',
		Component: StotOs,
		},
		{
		id: 'scrn15',
		title: 'Kontakt',
		Component: Kontakt,
		},
		{
		id: 'scrn16',
		title: 'Profile',
		Component: Profile,
		},
		{
		id: 'scrn17',
		title: 'ProfileSettings',
		Component: ProfileSettings,
		},
		{
		id: 'scrn18',
		title: 'ProfileChangePassword',
		Component: ProfileChangePassword,
		},
		{
		id: 'scrn19',
		title: 'LoginInApp',
		Component: Login,
		},
		{
		id: 'scrn20',
		title: 'RegisterInApp',
		Component: Register,
		},
		{
		id: 'scrn21',
		title: 'SubscriptionsInApp',
		Component: Subscriptions,
		},
		{
		id: 'scrn22',
		title: 'ForgotPasswordInApp',
		Component: ForgotPassword,
		},
		{
		id: 'scrn23',
		title: 'Begravelse',
		Component: Begravelse,
		},
		{
		id: 'scrn24',
		title: 'Bryllup',
		Component: Bryllup,
		},
	])

    return (
        <MyDrawer.Navigator
			useLegacyImplementation={false}
			drawerContent={props => <Drawer {...props} />}
			screenOptions={() => ({
				headerShown: false,
				drawerType: deviceType === 'Tablet' ? 'permanent' : 'front',
				drawerStyle:
				deviceType === 'Tablet'
					? {
					backgroundColor: colors.background,
					width: EStyleSheet.value('165rem'),
					}
					: {
					backgroundColor: colors.background,
					width: Math.floor(width * 0.8),
					},
			})}
		>
            {MyScreens.map(item => {
                return (
                <MyDrawer.Screen
                    name={item.title}
                    component={item.Component}
                    key={item.id}
                />
                )
            })}
        </MyDrawer.Navigator>
    )
}

const AppNavigation = () => {
    return (
        <AppStack.Navigator
            initialRouteName="Home"
            screenOptions={{headerShown: false,}}
		>
            <AppStack.Screen name="Home" component={DrawerStack} />
            <AppStack.Screen name="Login" component={Login} />
            <AppStack.Screen name="Register" component={Register} />
			<AppStack.Screen name="Subscriptions" component={Subscriptions} />
            <AppStack.Screen name="ForgotPassword" component={ForgotPassword} />
			<AppStack.Screen name="Invoices" component={Invoices} />
			<AppStack.Screen name="PdfViewer" component={PdfViewer} />
			<AppStack.Screen name="Card" component={Card} />
			<AppStack.Screen name="AddCard" component={AddCard} />
        </AppStack.Navigator>
    )
}

export default AppNavigation