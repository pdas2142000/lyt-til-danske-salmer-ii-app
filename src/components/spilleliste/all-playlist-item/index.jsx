/**React Imports */
import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

/**Libraries */
import EStyleSheet from 'react-native-extended-stylesheet'

/**Local Imports */
import { IconProps } from '../../../utils/helpers/iconprops'

/**Icons */
import PlayListPlayIcon from '../../../../assets/icons/playlistplay.svg'
import ArrowRightIcon from '../../../../assets/icons/angle-right.svg'
import {getDeviceType} from 'react-native-device-info'
import {useTheme} from '@react-navigation/native'

let deviceType = getDeviceType()

/**Main Export */
export const AllPlaylistItem = ({title, id, songCount, onItemPress}) => {
  const {colors} = useTheme()
	return (
		<TouchableOpacity
			style={[
				styles.Playlist_Btn,
				{backgroundColor: colors.background,borderBottomColor: colors.text + '0D',},
			]}
			onPress={onItemPress}
			key={id}
		>
		<View style={styles.All_Playlists_Inner}>
			<PlayListPlayIcon
				name="playlist-play"
				{...IconProps(25)}
				style={[styles.Playlist_Btn_Icon, {color: colors.text + '4D'}]}
			/>
			<View>
				<Text style={[styles.Playlists_Title, {color: colors.text}]}>
					{title}
				</Text>
				<Text
					style={[
						styles.Playlists_Count,
						{color: colors.lighterText},
					]}
				>
					{songCount} indspilninger
				</Text>
			</View>
		</View>
		<ArrowRightIcon
			name="angle-right"
			{...IconProps(16)}
			style={[styles.Playlist_Btn_Icon_Abs,{color: colors.lighterText},]}
		/>
		</TouchableOpacity>
	)
}

const styles = EStyleSheet.create({
	Playlist_Btn: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: deviceType === 'Tablet' ? '14rem' : '20rem',
		paddingVertical: deviceType === 'Tablet' ? '10rem' : '14rem',
		borderBottomWidth: 1,
		position: 'relative',
	},
	All_Playlists_Inner: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	Playlist_Btn_Icon_Abs: {
		fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
  	},
	Playlist_Btn_Icon: {
		fontSize: deviceType === 'Tablet' ? '17.5rem' : '25rem',
		marginRight: deviceType === 'Tablet' ? '4rem' : '6rem',
	},
	Playlists_Title: {
		fontFamily: 'Sen-Bold',
		fontSize: deviceType === 'Tablet' ? '10.5rem' : '15rem',
		lineHeight: deviceType === 'Tablet' ? '17.5rem' : '25rem',
	},
	Playlists_Count: {
		fontFamily: 'Sen-Regular',
		fontSize: deviceType === 'Tablet' ? '9.5rem' : '14rem',
		marginRight: deviceType === 'Tablet' ? '5.5rem' : '8rem',
	},
})
