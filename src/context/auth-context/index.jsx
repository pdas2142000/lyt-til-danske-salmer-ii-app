/**React Imports */
import React, {createContext, useState, useEffect, useContext} from 'react'
import {Platform, AppState} from 'react-native'
import { useNavigation } from '@react-navigation/native';

/**Libraries */
import {request, PERMISSIONS} from 'react-native-permissions'

/**Local Imports */
import {  
    SavaDataToLocal,
    GetDataFromLocal,
    ClearDataOfKey,
    Storage_Keys,
} from '../../utils/storage'
import { makeRequest } from '../../utils/make-request'

/**Components */
import { ConfirmationModal } from '../../components/common/confirmation-modal'

export const AuthContext = createContext()

/**MaiN Export */
export const AuthProvider = ({children}) => {
	const navigation = useNavigation();
	const [AuthInfoLoaded, SetAuthInfoLoaded] = useState(false)
	const [UserData, SetUserData] = useState(null)
	const [oneSignalID, setoneSignalID] = useState('')
	const [Token, SetToken] = useState(null)
	const [RefreshToken, SetRefreshToken] = useState(null)
	const [LogoutLoading, SetLogoutLoading] = useState(false)
	const [ShowLogoutModal, SetShowLogoutModal] = useState(false)

	const [DeleteProfileLoading, SetDeleteProfileLoading] = useState(false)
	const [ShowDeleteProfileModal, SetShowDeleteProfileModal] = useState(false)

	const [TrackingPermissionEnabled, SetTrackingPermissionEnabled] = useState(
		Platform.OS == 'ios' ? false : true,
	)

	const [TempNavigation, SetTempNavigation] = useState(null)
	useEffect(() => {
		InitializeAuth()
	}, [])

	useEffect(() => {
		if (Platform.OS !== 'ios') {
		return // don't create listeners on other platforms
		}

		const requestPermission = () => {
		request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
			.then(result => {
			if (result == 'unavailable' || result == 'granted') {
				SetTrackingPermissionEnabled(true)
			}
			})
			.catch(error => console.log(error))
		}

		// if the app is active when the effect is fired, request immediately
		if (AppState.currentState === 'active') {
		return requestPermission()
		}

		// otherwise setup a listener…
		const listener = AppState.addEventListener('change', status => {
		if (status === 'active') {
			// …which will perform the request once the app is active
			requestPermission()
		}
		})

    	return listener.remove
  	}, [])

	const InitializeAuth = async () => {
		try {
		const value = await GetDataFromLocal(Storage_Keys.USER_STORAGE_KEY)
		// console.log(value, 'Init auth')
		if (value != null) {
			SetToken(value.token)
			// SetRefreshToken(user.refreshToken)
			SetUserData(value)
			SetAuthInfoLoaded(true)
			// RefreshTokenFn(user)
		} else {
			SetAuthInfoLoaded(true)
		}
		} catch (e) {
		console.log(e)
		SetAuthInfoLoaded(true)
		}
	}

	const RefreshTokenFn = async user => {
		try {
		// const deviceState = await OneSignal.getDeviceState()
		let response = await makeRequest(
			'PUT',
			`auth/login/${user.id}`,
			{
			refreshToken: encodeURIComponent(user.refreshToken),
			// onesignal:deviceState.userId,
			},
			user.token,
			null
		)

		if (ResponseFilter(response)) {
			UpdateUser(response)
			SetAuthInfoLoaded(true)
		}
		} catch (err) {
		console.log('failed on refresh')
		}
	}

	const UpdateUser = async userinfo => {
		try {
		let user = userinfo.data

		// if(userinfo.data.phone.toString().length>10){
		//   userinfo.data.phone=userinfo.data.phone.toString().substring(2)
		// }
		let UpdatedToken =
			userinfo.token && userinfo.token.token ? userinfo.token.token : Token
		let UpdatedRefreshToken =
			userinfo.token && userinfo.token.refreshToken
			? userinfo.token.refreshToken
			: null
		user.token = UpdatedToken
		user.refreshToken = UpdatedRefreshToken
		SetUserData(user)
		SetToken(UpdatedToken)
		SetRefreshToken(UpdatedRefreshToken)
		await SavaDataToLocal(Storage_Keys.USER_STORAGE_KEY, user)
		} catch (err) {
		console.log('failed while updating user', err)
		}
	}

	// const UpdateUserDetails = async userinfo => {
	//   const value = await GetDataFromLocal(Storage_Keys.USER_STORAGE_KEY)
	//   if (value !== null) {
	//     let user = value
	//     // if(userinfo.phone.toString().length>10){
	//     //   userinfo.phone=userinfo.phone.toString().substring(2)
	//     // }
	//     let profileInfo = {...user, ...userinfo}
	//     profileInfo.token = user.token
	//     profileInfo.refreshToken = user.refreshToken
	//     SetToken(user.token)
	//     SetUserData(profileInfo)
	//     await SavaDataToLocal(Storage_Keys.USER_STORAGE_KEY, profileInfo)
	//   }
	// }

	const ConfirmLogout = () => {
		SetShowLogoutModal(true)
	}

	const Logout = async () => {
		try {
		SetLogoutLoading(true)
		let response = await makeRequest(
			'DELETE',
			`auth/login/${UserData.id}`,
			{},
			Token,
		)
		console.log(response, 'logout')
		if (response.error == 1 || response.error == 5) {
			await ClearDataOfKey(Storage_Keys.USER_STORAGE_KEY)
			SetUserData(null)
			SetToken(null)
			SetRefreshToken(null)
			navigation.navigate('Hjem'); 
		}
		SetLogoutLoading(false)
		} catch (err) {
		console.log('failed to logout', err)
		SetLogoutLoading(false)
		}
	}

	const LogoutUserOnTokenFail = async () => {
		await ClearDataOfKey(Storage_Keys.USER_STORAGE_KEY)
		SetUserData(null)
		SetToken(null)
		SetRefreshToken(null)
	}

	const ConfirmDeleteProfile = nav => {
		SetShowDeleteProfileModal(true)
		SetTempNavigation(nav)
	}

	const LogoutUserFromLocal = async () => {
		try {
		SetDeleteProfileLoading(true)

		let response = await makeRequest('GET', `user-profile/delete`, {}, Token)
		if (response.error == 1) {
			await ClearDataOfKey(Storage_Keys.USER_STORAGE_KEY)
			SetShowDeleteProfileModal(false)
			SetUserData(null)
			SetToken(null)
			SetRefreshToken(null)
			SetDeleteProfileLoading(false)
			if (TempNavigation != null) {
			TempNavigation.navigate('Hjem')
			SetTempNavigation(null)
			}
		} else {
			ShowToast(response.msg, 'error')
		}
		} catch (err) {
		console.log('failed to delte profile', err)
		SetDeleteProfileLoading(false)
		}
	}

	const ResponseFilter = response => {
		// console.log(response.type, Token, 'type of user')
		
		if (
		response.error == 5 ||
		(response.type &&
			response.type.toLowerCase() === 'guest' &&
			Token != null)
		) {
		LogoutUserOnTokenFail()
		} else {
		return response
		}
		return false
	}

	return (
		<AuthContext.Provider
			value={{
				AuthInfoLoaded,
				UserData,
				SetUserData,
				UpdateUser,
				Logout,
				Token,
				RefreshToken,
				ResponseFilter,
				LogoutLoading,
				ConfirmLogout,
				ConfirmDeleteProfile,
				TrackingPermissionEnabled,
			}}
		>
			{children}
			<ConfirmationModal
				isLoading={LogoutLoading}
				title={'Log ud'}
				message={'Er du sikker på at du vil logge ud?'}
				ShowModal={ShowLogoutModal}
				onConfirm={() => {
					Logout()
					SetShowLogoutModal(false)
				}}
				onDismiss={() => {
					SetShowLogoutModal(false)
				}}
				onCancel={() => {
					SetShowLogoutModal(false)
				}}
			/>
			<ConfirmationModal
				isLoading={DeleteProfileLoading}
				title={'Slet konto helt'}
				message={
				'Bemærk at dette vil slette alle dine data fra vores server, og vi vil ikke kunne genoprette din konto derefter, i henhold til persondatalovgivningen. Du kan sagtens oprette din konto påny - men det vil være forfra, både i forhold til spillelister og abonnement.'
				}
				ShowModal={ShowDeleteProfileModal}
				onConfirm={() => {
					LogoutUserFromLocal()
					SetShowDeleteProfileModal(false)
				}}
				onDismiss={() => {
					SetShowDeleteProfileModal(false)
				}}
				onCancel={() => {
					SetShowDeleteProfileModal(false)
				}}
			/>
		</AuthContext.Provider>
	)
}


export const useAuth = () => {
	const context = useContext(AuthContext)
	if(!context) {
		throw new Error('use auth is required')
	}
}