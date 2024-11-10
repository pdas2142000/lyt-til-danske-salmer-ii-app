/**Rweact Imports */
import React from 'react'
import {TextInput, View, TouchableOpacity} from 'react-native'

/**Libraries */
import {getDeviceType} from 'react-native-device-info'
import {debounce} from 'lodash'
import {useTheme} from '@react-navigation/native'
import EStyleSheet from 'react-native-extended-stylesheet'

/**Icons */
import CloseCircleIcon from '../../../../assets/icons/circle-xmark.svg'
import SearchIcon from '../../../../assets/icons/search.svg'
import { IconProps } from '../../../utils/helpers/iconprops'

let deviceType = getDeviceType()

/**Main Export */
export const SearchTextInput = ({
  SearchText,
  OnTextChange = null,
  shoulDebounce = false,
  WarpStyle = null,
}) => {
  	const {colors} = useTheme()
	return (
		<View
			style={[
				styles.Search_wrap,
				{backgroundColor: colors.lighterBackground},
				WarpStyle ? WarpStyle : {},
			]}
		>
			<SearchIcon name="search" style={styles.Search_Icon} {...IconProps(16)}/>
			<TextInput
				autoCapitalize="none"
				autoCorrect={false}
				style={[styles.Search_Control, {color: colors.text}]}
				placeholder="Search"
				placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
				value={SearchText}
				onChangeText={text => {
				if (OnTextChange) {
					if (shoulDebounce) {
					debounce(() => {
						OnTextChange(text)
					}, 500)
					} else {
					OnTextChange(text)
					}
				}
				}}
			/>
			<TouchableOpacity
				style={styles.Close_Container}
				onPress={() => {
					if (OnTextChange) {OnTextChange('')}
				}}
			>
				<CloseCircleIcon  style={styles.Search_Icon} {...IconProps(20)}/>
			</TouchableOpacity>
		</View>
	)
}

const styles = EStyleSheet.create({
	Search_wrap: {
		marginHorizontal: deviceType == 'Tablet' ? '17.5rem' : '25rem',
		marginBottom: deviceType == 'Tablet' ? '14rem' : '16rem',
		borderRadius: deviceType === 'Tablet' ? '5rem' : '8rem',
		paddingLeft: deviceType === 'Tablet' ? '11rem' : '16rem',
		flexDirection: 'row',
		alignItems: 'center',
	},
	Search_Icon: {
		color: 'rgba(0, 0, 0, 0.3)',
		fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
	},
	Search_Control: {
		fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
		fontFamily: 'Sen-Regular',
		paddingVertical: deviceType === 'Tablet' ? '8.5rem' : '12rem',
		paddingRight: deviceType === 'Tablet' ? '11rem' : '16rem',
		paddingLeft: deviceType === 'Tablet' ? '8rem' : '12rem',
		letterSpacing: -0.35,
		flex: 1,
	},
	Close_Container: {
	  	paddingHorizontal: deviceType === 'Tablet' ? '8rem' : '12rem',
	},
})
