/**React Imports */
import React, {useState} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  StatusBar,
} from 'react-native'

/**Libraries */
import {WebView} from 'react-native-webview'
import EStyleSheet from 'react-native-extended-stylesheet'
import Modal from 'react-native-modal'
import DeviceInfo from 'react-native-device-info'
import {getDeviceType} from 'react-native-device-info'
import {useTheme} from '@react-navigation/native'

/**Local Imports */
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import { OpenLink, CloseModal } from './helpers'
import { IconProps } from '../../utils/helpers/iconprops'

/**Icons */
import CaretLeftIcon from '../../../assets/icons/caretleft.svg'

let deviceType = getDeviceType()

/**Main Export */
export const PolicyContainer = ({buttonName = 'Send'}) => {

	const insets = useSafeAreaInsets()
	const statusBarHeight = insets.top
	const {colors} = useTheme()
	const [webViewModal, setWebViewModal] = useState(false)
	const [webViewUrl, setwebViewUrl] = useState(null)

	
	return (
		<SafeAreaView>
			<View>
				<Text style={[styles.TCFont, {color: colors.lighterText}]}>
					Når du klikker på {buttonName}, accepterer du samtidig vores{' '}
				<Text
					style={[styles.TCFont_link, {color: colors.lighterText}]}
					onPress={() => {
						OpenLink('https://lyttildanskesalmer.dk/terms', setwebViewUrl, setWebViewModal);
					}}
				>
					vilkår for anvendelse
				</Text>{' '}
				og{' '}
				<Text
					style={[styles.TCFont_link, {color: colors.lighterText}]}
					onPress={() => {
						OpenLink('https://lyttildanskesalmer.dk/privacy', setwebViewUrl, setWebViewModal);
					}}
				>
					privatlivspolitik
				</Text>
				.
				</Text>
				<Modal
					isVisible={webViewModal}
					onBackButtonPress={() => CloseModal(setWebViewModal)}
                    onBackdropPress={() => CloseModal(setWebViewModal)}
					useNativeDriverForBackdrop
					style={{margin: 0}}
				>
					<View style={{flex: 1}}>
						<View
							style={{
								height: 20 + parseInt(statusBarHeight),
								backgroundColor: colors.background,
								justifyContent: 'flex-end',
							}}
						>
							<TouchableOpacity
								style={{flexDirection: 'row'}}
								onPress={() => {CloseModal(setWebViewModal)}}
							>
								<View style={styles.Center}>
									<CaretLeftIcon name="caretleft" style={styles.Back_link} {...IconProps(16)}/>
								</View>
								<View style={styles.Center}>
									<Text style={styles.Back_link}>
										{DeviceInfo.getApplicationName()}
									</Text>
								</View>
							</TouchableOpacity>
						</View>
						<View style={{flex: 1}}>
							<WebView source={{uri: webViewUrl}} />
						</View>
					</View>
				</Modal>
			</View>
		</SafeAreaView>
	)
}

const styles = EStyleSheet.create({
	TCFont_link: {
		fontFamily: 'Sen-Bold',
		textDecorationLine: 'underline',
	},
	TCFont: {
		fontFamily: 'Sen-Regular',
		fontSize: deviceType === 'Tablet' ? '9.5rem' : '14rem',
		marginRight: deviceType === 'Tablet' ? '5.5rem' : '8rem',
	},
	Back_link: {
		color: 'black',
		fontFamily: 'Sen-Bold',
	},
	Center: {
		justifyContent: 'center',
	},
})
