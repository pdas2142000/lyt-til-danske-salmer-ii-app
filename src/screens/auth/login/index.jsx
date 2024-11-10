/**React Imports */
import React, {useContext, useState} from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView
} from 'react-native'

/**Libraries */
import {getDeviceType} from 'react-native-device-info'
import {useTheme} from '@react-navigation/native'
import EStyleSheet from 'react-native-extended-stylesheet'

/**Components */
import Layout from '../../../components/layout'

/**Local Imports */
import { Fonts } from '../../../utils/constants'
import { ShowToast } from '../../../services/toast-message'
import { AuthContext } from '../../../context/auth-context'
import { AUTH } from '../../../services/api'
let deviceType = getDeviceType()

/**Main Export */
const Login = ({navigation}) => {

	const {colors} = useTheme()
	const {UpdateUser} = useContext(AuthContext)
	const [InputFieldData, SetInputFieldData] = useState({
		email: '',
		password: '',
	})
	const [RequestLoading, SetRequestLoading] = useState(false)
	const validateEmail = email => {
		return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		)
	}
	
	const LoginUser = async () => {

		try {
			if (!validateEmail(InputFieldData.email)) {
				//Require_translation
				ShowToast('Skriv en korrekt emailadresse', 'error')
				return
			}
			if (InputFieldData.password.length < 8) {
				//Require_translation
				ShowToast('Kodeordet skal være mindst 8 tegn', 'error')
				return
			}
			SetRequestLoading(true)
			let response = await AUTH('POST', 'auth/login', {
				username: InputFieldData.email,
				password: InputFieldData.password,
				method: Platform.OS == 'android' ? 'android' : 'apple',
			})
			if (response.error == 1) {
				UpdateUser(response)
				ShowToast(response.msg)
				navigation.navigate('Hjem')
			} else {
				console.log(response, 'login response');
				ShowToast(response.msg, 'error')
			}
			SetRequestLoading(false)
		} catch (error) {
			SetRequestLoading(false)
			console.log(error, 'login err')
		}
	}

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{flex: 1}}
		>
            <Layout {...{title: 'Log ind', navigation, ShouldShowBack: true}}>
                <View style={[styles.Btns_Wrap, {backgroundColor: colors.background}]}>
					<View style={styles.Form_Grp}>
						<Text style={[styles.Label, {color: colors.text}]}>
							Emailadresse
						</Text>
						<TextInput
							autoCapitalize="none"
							autoCorrect={false}
							style={[
								styles.Form_Control,
								{color: colors.text, backgroundColor: colors.lighterBackground},
							]}
							keyboardType={'email-address'}
							value={InputFieldData.email}
							onChangeText={txt => {
								SetInputFieldData({...InputFieldData, email: txt.trim()})
							}}
							placeholder="Indtast emailadresse..."
							placeholderTextColor="rgba(0, 0, 0, 0.3)"
						/>
					</View>
					<View style={styles.Form_Grp}>
						<Text style={[styles.Label, {color: colors.text}]}>
							Adgangskode
						</Text>
						<TextInput
							autoCapitalize="none"
							autoCorrect={false}
							secureTextEntry
							style={[
								styles.Form_Control,
								{color: colors.text, backgroundColor: colors.lighterBackground},
							]}
							value={InputFieldData.password}
							onChangeText={txt => {
								SetInputFieldData({...InputFieldData, password: txt})
							}}
							returnKeyType={'done'}
							onSubmitEditing={() => {
								LoginUser()
							}}
							placeholder="indtast adgangskode..."
							placeholderTextColor="rgba(0, 0, 0, 0.3)"
						/>
					</View>
					<View style={styles.Form_Grp}>
						<TouchableOpacity
							onPress={() => {
								LoginUser()
							}}
							disabled={RequestLoading}
							style={[
								styles.Submit_Btn,
								{
								backgroundColor: colors.buttonBackground,
								borderColor: colors.buttonBorder,
								},
							]}
						>
							{RequestLoading ? (
								<ActivityIndicator size={'small'} color={colors.buttonText} />
							) : (
								<Text style={[styles.Submit_Btn_Text, {color: colors.buttonText}]}>
									Log ind
								</Text>
							)}
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate('ForgotPassword')
							}}
						>
							<Text style={[styles.Text_Link, {color: colors.primary}]}>
								Glemt kodeord?
							</Text>
						</TouchableOpacity>
					</View>
                </View>
                <TouchableOpacity
					style={styles.Outer_Btn}
					onPress={() => navigation.navigate('Register')}
				>
					<Text style={[styles.Outer_Btn_Text, {color: colors.primary}]}>
						Har du ikke en konto? Opret den nu.
					</Text>
                </TouchableOpacity>
             
            </Layout>
        </KeyboardAvoidingView>
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
	Text_Link: {
		fontSize: deviceType === 'Tablet' ? '10rem' : '14rem',
		fontFamily: 'Sen-Bold',
		paddingTop: deviceType === 'Tablet' ? '10.5rem' : '15rem',
		textAlign: 'center',
	},
	Alert_Text: {
		fontFamily: 'Sen-Bold',
		fontSize: deviceType === 'Tablet' ? '10rem' : '14rem',
		fontWeight: 'normal',
	},
	Alert_Box: {
		padding: deviceType === 'Tablet' ? '14rem' : '20rem',
		marginBottom: deviceType === 'Tablet' ? '10.5rem' : '15rem',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: '10rem',
		borderRadius: '14rem',
	},
})

export default Login
