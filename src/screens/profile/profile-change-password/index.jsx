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

/**Components */
import Layout from '../../../components/layout'
import EStyleSheet from 'react-native-extended-stylesheet'

/**Local Imports */
import { IconProps } from '../../../utils/helpers/iconprops'
import { makeRequest } from '../../../utils/make-request'
import { AuthContext } from '../../../context/auth-context'
import { ShowToast } from '../../../services/toast-message'

/**Icons */
import ArrowLeftIcon from '../../../../assets/icons/angle-left.svg'


let deviceType = getDeviceType()

/**Main Export */
const ProfileChangePassword = ({navigation}) => {

    const {colors} = useTheme()
    const {UserData, ResponseFilter} = useContext(AuthContext)
    const [InputFieldData, SetInputFieldData] = useState({
        oldPassword: '',
        password: '',
        confirmPassword: '',
    })
    const [RequestLoading, SetRequestLoading] = useState(false)
    const UpdatePassword = async () => {
        try {
        if (
            InputFieldData.oldPassword.length < 8 ||
            InputFieldData.password.length < 8
        ) {
            //Require_translation
            ShowToast('Skriv et korrekt kodeord', 'error')
            return
        }
        if (InputFieldData.password != InputFieldData.confirmPassword) {
            //Require_translation
            ShowToast('Kodeord matcher ikke', 'error')
            return
        }
        SetRequestLoading(true)
        let response = await makeRequest(
            'PUT',
            'auth/forget-password/update',
            {
            password: InputFieldData.password,
            password_confirmation: InputFieldData.confirmPassword,
            old: InputFieldData.oldPassword,
            },
            UserData.token,
        )
        response = ResponseFilter(response)
        if (!response) {
            SetRequestLoading(false)
            return
        }
        // console.log('response of update password', response)
        if (response.error == 1) {
            ShowToast(response.msg)
            navigation.navigate('Profile')
        } else {
            ShowToast(response.msg, 'error')
        }
        SetRequestLoading(false)
        } catch (error) {
            SetRequestLoading(false)
            console.log(error)
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{flex: 1}}
        >
            <Layout {...{title: 'Skift kodeord', navigation}}>
                <View style={[styles.Btns_Wrap, {backgroundColor: colors.background}]}>
                    <View style={styles.Form_Grp}>
                        <Text style={[styles.Label, {color: colors.text}]}>
                            Gammelt kodeord
                        </Text>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry
                            placeholder="Gammelt kodeord"
                            value={InputFieldData.oldPassword}
                            placeholderTextColor="rgba(0, 0, 0, 0.3)"
                            onChangeText={txt => {
                                SetInputFieldData({...InputFieldData, oldPassword: txt})
                            }}
                            style={[
                                styles.Form_Control,
                                {color: colors.text, backgroundColor: colors.lighterBackground},
                            ]}
                        />
                    </View>
                    <View style={styles.Form_Grp}>
                        <Text style={[styles.Label, {color: colors.text}]}>
                            Nyt kodeord
                        </Text>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry
                            placeholder="Nyt kodeord"
                            value={InputFieldData.password}
                            placeholderTextColor="rgba(0, 0, 0, 0.3)"
                            onChangeText={txt => {
                                SetInputFieldData({...InputFieldData, password: txt})
                            }}
                            style={[
                                styles.Form_Control,
                                {color: colors.text, backgroundColor: colors.lighterBackground},
                            ]}
                        />
                    </View>
                    <View style={styles.Form_Grp}>
                        <Text style={[styles.Label, {color: colors.text}]}>
                            Bekræft ny adgangskode
                        </Text>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry
                            placeholder="Bekræft ny adgangskode"
                            placeholderTextColor="rgba(0, 0, 0, 0.3)"
                            value={InputFieldData.confirmPassword}
                            onChangeText={txt => {
                                SetInputFieldData({...InputFieldData, confirmPassword: txt})
                            }}
                            style={[
                                styles.Form_Control,
                                {color: colors.text, backgroundColor: colors.lighterBackground},
                            ]}
                        />
                    </View>
                    <View style={styles.Form_Grp}>
                        <TouchableOpacity
                            style={[
                                styles.Submit_Btn,
                                {
                                backgroundColor: colors.buttonBackground,
                                borderColor: colors.buttonBorder,
                                },
                            ]}
                            onPress={() => {
                                UpdatePassword()
                            }}
                            disabled={RequestLoading}
                        >
                        {RequestLoading ? (
                            <ActivityIndicator size={'small'} color={colors.buttonText} />
                        ) : (
                            <Text style={[styles.Submit_Btn_Text, {color: colors.buttonText}]}>
                                Opdater
                            </Text>
                        )}
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.Back_Btn}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <ArrowLeftIcon
                        name="arrow-left"
                        {...IconProps(14)}
                        style={[styles.Back_Btn_Icon, {color: colors.text}]}
                    />
                    <Text style={[styles.Back_Btn_Text, {color: colors.text}]}>
                        tilbage til profilen
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
    Back_Btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: deviceType === 'Tablet' ? '11rem' : '16rem',
    },
    Back_Btn_Icon: {
        fontSize: deviceType === 'Tablet' ? '10rem' : '14rem',
        marginRight: deviceType === 'Tablet' ? '5rem' : '8rem',
    },
    Back_Btn_Text: {
        fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
        fontFamily: 'Sen-Bold',
    },
})

export default ProfileChangePassword
