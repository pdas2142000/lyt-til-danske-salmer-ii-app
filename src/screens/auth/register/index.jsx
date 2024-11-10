/**React Imports */
import React, {useContext, useState} from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

/**Libraries */
import {getDeviceType} from 'react-native-device-info'
import {useTheme} from '@react-navigation/native'
import EStyleSheet from 'react-native-extended-stylesheet'

/**Components */
import Layout from '../../../components/layout'
import { ShowToast } from '../../../services/toast-message'
import { PolicyContainer } from '../../../components/policy-container'
import { AuthContext, useAuth } from '../../../context/auth-context'

/**Local Imports */
import { AUTH } from '../../../services/api'
let deviceType = getDeviceType()

/**Main Export*/
const Register = ({navigation}) => {

	const {colors} = useTheme()
	const {UpdateUser} = useContext(AuthContext)

	const [InputFieldData, SetInputFieldData] = useState({
		email: '',
		firstname: '',
		lastname: '',
		password: '',
		confirmPassword: '',
	})
	const [RequestLoading, SetRequestLoading] = useState(false)
	
	const validateEmail = email => {
	  return String(email)
		.toLowerCase()
		.match(
		  /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		)
	}
	
	const SignUpUser = async () => {
	  try {
		if (!validateEmail(InputFieldData.email)) {
		  //Require_translation
		  ShowToast('Skriv en korrekt emailadresse', 'error')
		  return
		}
		if (InputFieldData.firstname.length < 2) {
		  //Require_translation
		  ShowToast('Fornavn mangler', 'error')
		  return
		}
  
		if (InputFieldData.lastname.length < 2) {
		  //Require_translation
		  ShowToast('Efternavn mangler', 'error')
		  return
		}
  
		if (InputFieldData.password.length < 8) {
		  //Require_translation
		  ShowToast('Kodeordet skal være mindst 8 tegn', 'error')
		  return
		}
		if (InputFieldData.password != InputFieldData.confirmPassword) {
		  //Require_translation
		  ShowToast('Kodeord matcher ikke', 'error')
		  return
		}
		SetRequestLoading(true)
		let response = await AUTH('POST', 'auth/signup', {
		  first_name: InputFieldData.firstname,
		  last_name: InputFieldData.lastname,
		  email: InputFieldData.email,
		  password: InputFieldData.password,
		  method: Platform.OS == 'android' ? 'android' : 'apple',
		})
		if (response.error == 1) {
		  UpdateUser(response)
		  ShowToast(response.msg)
		  navigation.navigate('Profile')
		} else {
		  ShowToast(response.msg, 'error')
		}
		SetRequestLoading(false)
	  } catch (err) {
		console.log(err, 'signup err')
	  }
	}
	
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			style={{flex: 1}}
		>
			<Layout {...{title: 'Abonner', navigation, ShouldShowBack: true}}>
				<View style={[styles.Btns_Wrap, {backgroundColor: colors.background}]}>
					<View style={styles.Form_Grp}>
						<View style={styles.InputContainer}>
							<Text style={[styles.Label, {color: colors.text}]}>Fornavn</Text>
							<TextInput
								autoCapitalize="none"
								autoCorrect={false}
								style={[
									styles.Form_Control,
									{
									color: colors.text,
									backgroundColor: colors.lighterBackground,
									},
								]}
								placeholder="Indtast fornavn..."
								value={InputFieldData.firstname}
								onChangeText={txt => {
									SetInputFieldData({...InputFieldData, firstname: txt})
								}}
								placeholderTextColor="rgba(0, 0, 0, 0.3)"
							/>
						</View>
						<View style={styles.InputContainer}>
							<Text style={[styles.Label, {color: colors.text}]}>
								Efternavn
							</Text>
							<TextInput
								autoCapitalize="none"
								autoCorrect={false}
								style={[
									styles.Form_Control,
									{
									color: colors.text,
									backgroundColor: colors.lighterBackground,
									},
								]}
								placeholder="Indtast efternavn..."
								value={InputFieldData.lastname}
								onChangeText={txt => {
									SetInputFieldData({...InputFieldData, lastname: txt})
								}}
								placeholderTextColor="rgba(0, 0, 0, 0.3)"
							/>
						</View>
						<View style={styles.InputContainer}>
							<Text style={[styles.Label, {color: colors.text}]}>
								Emailadresse
							</Text>
							<TextInput
								autoCapitalize="none"
								autoCorrect={false}
								style={[
									styles.Form_Control,
									{
									color: colors.text,
									backgroundColor: colors.lighterBackground,
									},
								]}
								keyboardType={'email-address'}
								placeholder="Indtast emailadresse..."
								value={InputFieldData.email}
								onChangeText={txt => {
									SetInputFieldData({...InputFieldData, email: txt.trim()})
								}}
								placeholderTextColor="rgba(0, 0, 0, 0.3)"
							/>
						</View>
						<View style={styles.InputContainer}>
							<Text style={[styles.Label, {color: colors.text}]}>
								Adgangskode
							</Text>
							<TextInput
								autoCapitalize="none"
								autoCorrect={false}
								secureTextEntry
								style={[
									styles.Form_Control,
									{
									color: colors.text,
									backgroundColor: colors.lighterBackground,
									},
								]}
								value={InputFieldData.password}
								onChangeText={txt => {
									SetInputFieldData({...InputFieldData, password: txt})
								}}
								placeholder="Indtast adgangskode..."
								placeholderTextColor="rgba(0, 0, 0, 0.3)"
							/>
						</View>
						<View style={styles.InputContainer}>
							<Text style={[styles.Label, {color: colors.text}]}>
								Gentag adgangskode
							</Text>
							<TextInput
								autoCapitalize="none"
								autoCorrect={false}
								secureTextEntry
								style={[
									styles.Form_Control,
									{
									color: colors.text,
									backgroundColor: colors.lighterBackground,
									},
								]}
								value={InputFieldData.confirmPassword}
								onChangeText={txt => {
									SetInputFieldData({...InputFieldData, confirmPassword: txt})
								}}
								placeholder="Gentag adgangskode..."
								placeholderTextColor="rgba(0, 0, 0, 0.3)"
							/>
						</View>
						<PolicyContainer />
					</View>
					<View style={styles.Form_Grp}>
						<TouchableOpacity
							style={[
								styles.Submit_Btn,
								{backgroundColor: colors.buttonBackground,borderColor: colors.buttonBorder,},
							]}
							disabled={RequestLoading}
							onPress={() => {SignUpUser()}}
						>
							{RequestLoading ? (
							<ActivityIndicator size={'small'} color={colors.buttonText} />
							) : (
							<Text style={[styles.Submit_Btn_Text, {color: colors.buttonText}]}>
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
	Text_Desc: {
		fontSize: deviceType === 'Tablet' ? '9.5rem' : '14rem',
		fontFamily: 'Sen-Regular',
		paddingTop: deviceType === 'Tablet' ? '10.5rem' : '15rem',
	},
	InputContainer: {
	  	marginBottom: deviceType === 'Tablet' ? '10.5rem' : '15rem',
	},
})

export default Register
