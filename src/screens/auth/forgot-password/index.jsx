/**React Imports */
import React, {useState} from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native'

/**Libraries */
import {getDeviceType} from 'react-native-device-info'
import {useTheme} from '@react-navigation/native'
import EStyleSheet from 'react-native-extended-stylesheet'

/**Components */
import Layout from '../../../components/layout'

/**Local Imports */
import { AUTH } from '../../../services/api'
import { ShowToast } from '../../../services/toast-message'

let deviceType = getDeviceType()

/**Main Export */
const ForgotPassword = ({navigation}) => {

	const {colors} = useTheme()
	const [Email, SetEmail] = useState('')
	const [RequestLoading, SetRequestLoading] = useState(false)

	const validateEmail = email => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			)
	}

	const ForgotPassword = async () => {
		if (!validateEmail(Email)) {
			//Require_translation
			ShowToast('Skriv en korrekt emailadresse', 'error')
			return
		}
		SetRequestLoading(true)
		let response = await AUTH('POST', 'auth/forget-password', {
			username: Email,
		})
		
		if (response.error == 1) {
			SetEmail('')
			ShowToast(response.msg)
			navigation.navigate('Login')
		} else {
			ShowToast(response.msg, 'error')
		}
		SetRequestLoading(false)
	}

	return (
		<Layout {...{title: 'Glemt kodeord', navigation, ShouldShowBack: true}}>
			<View style={[styles.Btns_Wrap, {backgroundColor: colors.background}]}>
				<View style={styles.Form_Grp}>
					<Text style={[styles.Label, {color: colors.text}]}>Email</Text>
					<TextInput
						autoCapitalize="none"
						autoCorrect={false}
						style={[
							styles.Form_Control,
							{color: colors.text, backgroundColor: colors.lighterBackground},
						]}
						keyboardType={'email-address'}
						placeholder="indtast email..."
						returnKeyType={'done'}
						onSubmitEditing={() => {ForgotPassword()}}
						value={Email}
						onChangeText={txt => {SetEmail(txt.trim())}}
						placeholderTextColor="rgba(0, 0, 0, 0.3)"
					/>
					<Text style={[styles.Text_Desc, {color: colors.lighterText}]}>
						Indtast din e-mailadresse. Du vil modtage en e-mail med et link til
						nulstilling af adgangskode
					</Text>
				</View>
				<View style={styles.Form_Grp}>
					<TouchableOpacity
						style={[styles.Submit_Btn,{backgroundColor: colors.buttonBackground,borderColor: colors.buttonBorder,},]}
						disabled={RequestLoading}
						onPress={() => {ForgotPassword()}}
					>
						{RequestLoading ? (
						<ActivityIndicator size={'small'} color={colors.buttonText} />
						) : (
						<Text
							style={[styles.Submit_Btn_Text, {color: colors.buttonText}]}>
							Send
						</Text>
						)}
					</TouchableOpacity>
				</View>
			</View>
			<TouchableOpacity
				style={styles.Outer_Btn}
				onPress={() => navigation.navigate('Login')}
			>
				<Text style={[styles.Outer_Btn_Text, {color: colors.text}]}>
					Tilbage til login
				</Text>
			</TouchableOpacity>
		</Layout>
	)
}

const styles = EStyleSheet.create({
	Btns_Wrap: {
	  paddingHorizontal: deviceType === 'Tablet' ? '21rem' : '30rem',
	  paddingVertical: deviceType == 'Tablet' ? '17.5rem' : '25rem',
	  borderRadius: deviceType === 'Tablet' ? '21rem' : '30rem',
	},
	Form_Grp: {
	  marginBottom: deviceType === 'Tablet' ? '10rem' : '14rem',
	},
	Label: {
	  fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
	  fontFamily: 'Sen-Bold',
	  paddingBottom: deviceType === 'Tablet' ? '3.5rem' : '5rem',
	},
	Form_Control: {
	  fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
	  fontFamily: 'Sen-Regular',
	  borderRadius: deviceType === 'Tablet' ? '5rem' : '8rem',
	  paddingVertical: deviceType === 'Tablet' ? '8.5rem' : '12rem',
	  paddingHorizontal: deviceType === 'Tablet' ? '11rem' : '16rem',
	},
	Submit_Btn: {
	  borderWidth: 1,
	  borderRadius: deviceType === 'Tablet' ? '5rem' : '8rem',
	  paddingVertical: deviceType === 'Tablet' ? '8.5rem' : '12rem',
	  paddingHorizontal: deviceType === 'Tablet' ? '11rem' : '16rem',
	  alignItems: 'center',
	  marginTop: deviceType === 'Tablet' ? '7rem' : '10rem',
	},
	Submit_Btn_Text: {
	  fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
	  fontFamily: 'Sen-Bold',
	},
	Outer_Btn: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  justifyContent: 'center',
	  paddingVertical: deviceType === 'Tablet' ? '11rem' : '16rem',
	},
	Outer_Btn_Text: {
	  fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
	  fontFamily: 'Sen-Bold',
	},
	Text_Desc: {
	  fontSize: deviceType === 'Tablet' ? '9.5rem' : '14rem',
	  fontFamily: 'Sen-Regular',
	  paddingTop: deviceType === 'Tablet' ? '10.5rem' : '15rem',
	},
  })

export default ForgotPassword
