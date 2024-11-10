/**React Imports */
import React, { useState, useEffect, useContext } from 'react'
import { View } from 'react-native'

/**Libraries */
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { getDeviceType } from 'react-native-device-info'
import EStyleSheet from 'react-native-extended-stylesheet'

/**Components */
import DrawerItem from './drawer-item'

/**Icons */
import HomeIcon from '../../assets/icons/drawer-icons/home.svg'
import MusicalNotesIcon from '../../assets/icons/drawer-icons/musical_notes.svg'
import BulbIcon from '../../assets/icons/drawer-icons/lightbulb.svg'
import RecordingIcon from '../../assets/icons/drawer-icons/recording.svg'
import FlagIcon from '../../assets/icons/drawer-icons/flag.svg'
import HorizontalRulerIcon from '../../assets/icons/drawer-icons/horizontal_ruler.svg'
import LinkIcon from '../../assets/icons/drawer-icons/link.svg'
import StarIcon from '../../assets/icons/drawer-icons/star.svg'
import ChartBoxIcon from '../../assets/icons/drawer-icons/chatbox_ellipses.svg'
import BoxIcon from '../../assets/icons/drawer-icons/box.svg'
import LoginIcon from '../../assets/icons/drawer-icons/login.svg'
import SignOutIcon from '../../assets/icons/drawer-icons/sign_out.svg'

/**Components */
import { AppOrWeb } from '../constants/app-or-web'
import { AuthContext } from '../context/auth-context'

let deviceType = getDeviceType()

/**Main Export */
const Drawer = props => {
	const { UserData } = useContext(AuthContext)
	const [MyButtons, SetMyButtons] = useState([
		{
			id: 'scrn01',
			title: 'Hjem',
			ComponentName: 'Hjem',
			Icon: HomeIcon,
			IconText: 'home',
			Active: true,
		},
		{
			id: 'scrn02',
			title: 'Spilleliste',
			ComponentName: 'Spilleliste',
			Icon: MusicalNotesIcon,
			IconText: 'musical-notes',
			Active: false,
		},
		{
			id: 'scrn03',
			ComponentName: AppOrWeb.OmLytTilDanskeSalmer,
			Icon: BulbIcon,
			IconText: 'lightbulb',
			Active: false,
			isBtn: true,
			Show: false,
			SubButtons: [
				{
					id: 'slmin01',
					Active: false,
					title: 'Generelt',
					ComponentName: 'Generelt',
				},
				{
					id: 'slmin02',
					Active: false,
					title: 'SporgsmalOgSvar',
					ComponentName: 'Spørgsmål og svar',
				},
			],
		},
		{
			id: 'scrn04',
			ComponentName: 'Om indspilningerne',
			Icon: RecordingIcon,
			IconText: 'ios-recording',
			Active: false,
			isBtn: true,
			Show: false,
			SubButtons: [
				{
					id: 'slmin01',
					Active: false,
					title: 'Indspilningerne',
					ComponentName: 'Indspilningerne',
				},
				{
					id: 'slmin02',
					Active: false,
					title: 'Medvirkende',
					ComponentName: 'Medvirkende',
				},
				{
					id: 'slmin03',
					Active: false,
					title: 'KirkerOgOrgler',
					ComponentName: 'Kirker og orgler',
				},
				{
					id: 'slmin04',
					Active: false,
					title: 'Rettigheder',
					ComponentName: 'Rettigheder',
				},
			],
		},
		{
			id: 'scrn05',
			ComponentName: 'Ritualer',
			Icon: FlagIcon,
			IconText: 'flag',
			Active: false,
			isBtn: true,
			Show: false,
			SubButtons: [
				{
					id: 'slmin01',
					Active: false,
					title: 'Mandsstemme',
					ComponentName: 'Mandsstemme',
				},
				{
					id: 'slmin02',
					Active: false,
					title: 'Kvindestemme',
					ComponentName: 'Kvindestemme',
				},
				{
					id: 'slmin03',
					Active: false,
					title: 'Trosbekendelse',
					ComponentName: 'Trosbekendelse',
				},
			],
		},
		{
			id: 'scrn06',
			ComponentName: 'Orgel',
			Icon: HorizontalRulerIcon,
			IconText: 'ruler-horizontal',
			Active: false,
			isBtn: true,
			Show: false,
			SubButtons: [
				{
					id: 'slmin01',
					Active: false,
					title: 'Bryllup',
					ComponentName: 'Bryllup',
				},
				{
					id: 'slmin02',
					Active: false,
					title: 'Begravelse',
					ComponentName: 'Begravelse',
				},
			],
		},
		{
			id: 'scrn07',
			title: 'Links',
			ComponentName: 'Links',
			Icon: LinkIcon,
			IconText: 'link',
			Active: false,
		},
		{
			id: 'scrn08',
			title: 'StotOs',
			ComponentName: 'Projektstøtte',
			Icon: StarIcon,
			IconText: 'star',
			Active: false,
		},
		{
			id: 'scrn09',
			title: 'Kontakt',
			ComponentName: 'Kontakt',
			Icon: ChartBoxIcon,
			IconText: 'chatbox-ellipses',
			Active: false,
		},
		{
			id: 'scrn10',
			title: 'Subscriptions',
			ComponentName: 'Abonnement',
			Icon: BoxIcon,
			IconText: 'box',
			Active: false,
		},
		{
			id: 'scrn11',
			title: 'Logout',
			ComponentName: 'Log ud',
			Icon: SignOutIcon,
			IconText: 'logout',
			Active: false,
		},
		{
			id: 'scrn12',
			title: 'Login',
			ComponentName: 'Log ind',
			Icon: LoginIcon,
			IconText: 'login',
			Active: false,
		},
	])

	useEffect(() => {
		if (props)
			SetMyButtons(
				MyButtons.map(val => {
					val.Active =
						val.title === props.state.routeNames[props.state.index]
							? true
							: false
					val.SubButtons &&
						val.SubButtons.map(innerVal => {
							if (
								innerVal.title === props.state.routeNames[props.state.index]
							) {
								val.Active = true
								innerVal.Active = true
							} else {
								innerVal.Active = false
							}
						})
					return val
				}),
			)
	}, [props])

	return (
		<DrawerContentScrollView {...props}>
			{
				props.navigation ? <View style={styles.drawerContent}>
					{MyButtons.map(Item => {
						if (Item.title == 'Login' || Item.title == 'Logout') {
							if (UserData && UserData.token && Item.title == 'Login') {
								return null
							}
							if (!(UserData && UserData.token) && Item.title == 'Logout') {
								return null
							}
						}
						return (
							<DrawerItem
								{...{
									Item,
									MyButtons,
									SetMyButtons,
								}}
								navigation={props.navigation}
								key={Item.id}
							/>
						)
					})}
				</View> : null
			}
		</DrawerContentScrollView>
	)
}

const styles = EStyleSheet.create({
	drawerContent: {
		marginTop: deviceType === 'Tablet' ? '7rem' : '10rem',
	},
})

export default Drawer
