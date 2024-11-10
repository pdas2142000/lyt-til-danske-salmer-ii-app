/**React Imports */
import React, { useContext } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

/**Libraries */
import { getDeviceType } from 'react-native-device-info'
import { useTheme } from '@react-navigation/native'

/**Local Imports */
import { AuthContext } from '../../context/auth-context'
import { ms } from '../../utils/helpers/metrics'
import { IconProps } from '../../utils/helpers/iconprops'

/**Components */
import Collapsible from 'react-native-collapsible'

/**Icons */
import CaretDownIcon from '../../../assets/icons/caret-down.svg'

/**Styles */
import EStyleSheet from 'react-native-extended-stylesheet'

let deviceType = getDeviceType()

/**Main Export */
const DrawerItem = ({ Item, navigation, MyButtons, SetMyButtons }) => {

	const { ConfirmLogout } = useContext(AuthContext)
	const { colors } = useTheme()

	return (
		<View>
			<TouchableOpacity
				onPress={() => {
					if (Item.title == 'Logout') {
						ConfirmLogout()
					} else {
						SetMyButtons(
							MyButtons.map(val => {
								val.Show = Item.isBtn && Item.id === val.id ? !val.Show : false
								return val
							}),
						)
						!Item?.isBtn && Item?.title && navigation.navigate(Item?.title);
						(!Array.isArray(Item.SubButtons) || !Item.SubButtons.length) && navigation.closeDrawer();
					}
				}}
				key={Item.id}
			>
				<View style={styles.btn_link}>
					<View style={styles.btn_link_inner}>
						<Item.Icon
							{...IconProps(20)}
							name={Item.IconText}
							size={deviceType === 'Tablet' ? 16.5 : 20}
							style={[
								styles.btn_link_icon,
								{ fill: Item.Active ? colors.primary : colors.primary, color: Item.Active ? colors.primary : colors.primary },
							]}
						/>
						<Text
							style={[
								styles.btn_link_text,
								{ color: Item.Active ? colors.text : 'rgba(0,0,0,0.4)' },
							]}
						>
							{Item.ComponentName}
						</Text>
					</View>
					{Item.isBtn && (
						<CaretDownIcon name="caret-down" style={styles.btn_link_caret} {...IconProps(16)} />
					)}
				</View>
			</TouchableOpacity>
			{Array.isArray(Item.SubButtons) ? (
				<Collapsible collapsed={!(Item.Show && Item.SubButtons)}>
					<View style={styles.btns_drop}>
						<View style={styles.line_vert} />
						{Item.SubButtons.map(Sub => {
							return (
								<TouchableOpacity
									onPress={() => { navigation.navigate(Sub.title) }}
									key={Sub.id}
								>
									<View style={styles.btn_drop_link}>
										<View style={styles.btn_link}>
											<Text
												style={[
													styles.btn_link_text,
													{
														color: Sub.Active
															? colors.primary
															: 'rgba(0,0,0,0.4)',
													},
												]}
											>
												{Sub.ComponentName}
											</Text>
										</View>
										<View style={styles.line_hort} />
									</View>
								</TouchableOpacity>
							)
						})}
					</View>
				</Collapsible>
			) : null}
		</View>
	)
}

const styles = EStyleSheet.create({
	btn_link: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: deviceType === 'Tablet' ? '10rem' : '25rem',
		paddingVertical: deviceType === 'Tablet' ? '10rem' : '18rem',
	},
	btn_link_inner: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	btn_link_icon: {
		width: deviceType === 'Tablet' ? '15rem' : '30rem',
		textAlign: 'center',
		marginRight: deviceType === 'Tablet' ? '7rem' : '10rem',
	},
	btn_link_caret: {
		fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
		color: 'rgba(0,0,0,0.4)',
		marginRight: 0,
	},
	btn_link_text: {
		fontFamily: 'Sen-Bold',
		fontSize: deviceType === 'Tablet' ? '10rem' : '16rem',
		letterSpacing: -0.35,
	},
	btns_drop: {
		paddingLeft: deviceType === 'Tablet' ? '17.5rem' : '40rem',
		position: 'relative',
	},
	line_vert: {
		position: 'absolute',
		width: 1,
		left: deviceType === 'Tablet' ? '17.5rem' : '40rem',
		top: 0,
		bottom: deviceType === 'Tablet' ? '15rem' : '26rem',
		backgroundColor: '#ebe8e8',
	},
	btn_drop_link: {
		position: 'relative',
		paddingLeft: deviceType === 'Tablet' ? '5rem' : 0,
	},
	line_hort: {
		position: 'absolute',
		height: 1,
		left: 0,
		right: deviceType === 'Tablet' ? '96%' : '92.5%',
		top: deviceType === 'Tablet' ? '16rem' : '29rem',
		backgroundColor: '#ebe8e8',
	},
})

export default DrawerItem
