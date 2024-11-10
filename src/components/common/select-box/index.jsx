/**React Imports */
import React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'

/**Libraries */
import EStyleSheet from 'react-native-extended-stylesheet'
import {useTheme} from '@react-navigation/native'
import {getDeviceType} from 'react-native-device-info'

/**Local Imports */
import { ms } from '../../../utils/helpers/metrics'
import { IconProps } from '../../../utils/helpers/iconprops'
import { Fonts } from '../../../utils/constants'

/**Icons */
import CloseCircleIcon from '../../../../assets/icons/circle-xmark.svg'

let deviceType = getDeviceType()

	export const SelectionBox = ({
		Heading,
		PlaceHolder,
		OnClick,
		SelctedValue,
		OnCancel,
	}) => {
	const {colors} = useTheme()
	return (
		<View style={styles.Form_Grp}>
			<Text style={[styles.Label, {color: colors.text}]}>{Heading}</Text>
			<View style={[styles.Form_Button,{backgroundColor: colors.lighterBackground},]}>
				<TouchableOpacity
					style={styles.Form_Button_Text_View}
					onPress={OnClick}
				>
				{SelctedValue ? (
					<Text numberOfLines={1} style={[styles.Form_Button_Text, {color: colors.text}]}	>
						{SelctedValue}
					</Text>
				) : (
					<Text
						style={[
							styles.Form_Button_Text,
							styles.Form_Button_PlaceHolder,
							{color: colors.text},
						]}
					>
						{PlaceHolder}
					</Text>
				)}
				</TouchableOpacity>
				{SelctedValue ? (
					<TouchableOpacity
						style={styles.Form_Button_Cancel_View}
						onPress={OnCancel}
					>
						<CloseCircleIcon style={styles.Cancel_Icon} />
					</TouchableOpacity>
				) : null}
			</View>
		</View>
	)
	}

	const styles = EStyleSheet.create({
		Form_Grp: {
		  	marginVertical: deviceType === 'Tablet' ? '5rem' : '7rem',
		},
		Label: {
			fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
			fontFamily: 'Sen-Bold',
			paddingVertical: deviceType === 'Tablet' ? '3.5rem' : '5rem',
		},
		Form_Button: {
			borderRadius: deviceType === 'Tablet' ? '5rem' : '8rem',
			flexDirection: 'row',
		},
		Form_Button_Text: {
			fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
			fontFamily: 'Sen-Regular',
		},
		Form_Button_PlaceHolder: {
		  	opacity: 0.2,
		},
		Cancel_Icon: {
			color: 'rgba(0, 0, 0, 0.3)',
			width: deviceType === 'Tablet' ? '11rem' : '16rem',
			height: deviceType === 'Tablet' ? '11rem' : '16rem',
		},
		Form_Button_Text_View: {
			flex: 1,
			paddingVertical: deviceType === 'Tablet' ? '8.5rem' : '12rem',
			paddingHorizontal: deviceType === 'Tablet' ? '11rem' : '16rem',
		},
		Form_Button_Cancel_View: {
			justifyContent: 'center',
			paddingHorizontal: deviceType === 'Tablet' ? '6rem' : '8rem',
		},
	})
