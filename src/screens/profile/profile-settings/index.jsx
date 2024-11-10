/**React Imports */
import React, {useContext, useState} from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

/**Libraries */
import EStyleSheet from 'react-native-extended-stylesheet'
import {getDeviceType} from 'react-native-device-info'
import {useTheme} from '@react-navigation/native'

/**Components */
import Layout from '../../../components/layout'
import { ShowToast } from '../../../services/toast-message'

/**Loacl Imports */
import { AuthContext } from '../../../context/auth-context'
import {openSettings} from 'react-native-permissions'
import { BASE_URL } from '../../../constants/url'
import { IconProps } from '../../../utils/helpers/iconprops'
import { ChooseFromLibrary, UpdateProfile } from './helpers.js'

/**Icons */
import ArrowLeftIcon from '../../../../assets/icons/angle-left.svg'

let deviceType = getDeviceType()

/**Main Export */
const ProfileSettings = ({navigation}) => {

    const {colors} = useTheme()
    const {UserData, UpdateUser, ConfirmDeleteProfile, ResponseFilter} = useContext(AuthContext)
    const [Fields, SetFeilds] = useState({
        firstName: UserData && UserData.first_name ? UserData.first_name : '',
        lastName: UserData && UserData.last_name ? UserData.last_name : '',
        email: UserData && UserData.email ? UserData.email : '',
    })
    const [Img, setImg] = useState(null)
    const [loading, setloading] = useState(false)
    const [deleteloading, setdeleteloading] = useState(false)
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{flex: 1}}
        >
            <Layout {...{title: 'Brugerindstillinger', navigation}}>
                <View style={[styles.Btns_Wrap, {backgroundColor: colors.background}]}>
                    <View style={styles.Profile_Info}>
                        <TouchableOpacity onPress={() => { ChooseFromLibrary(setImg,UserData,ResponseFilter, UpdateUser)}}
                            style={styles.Profile_Img_Wrap}
                        >
                        {Img ? (
                            <Image source={{uri: Img.path}} style={styles.Profile_Img} />
                        ) : (
                            <Image
                                source={
                                    UserData && UserData.image && UserData.image.url
                                    ? {uri: BASE_URL.url + UserData.image.url}
                                    : require('../../../../assets/profile.png')
                                }
                                style={styles.Profile_Img}
                            />
                        )}
                        </TouchableOpacity>
                        {UserData != null ? (
                        <>
                            <Text
                                style={[
                                    styles.Profile_Info_Name,
                                    {
                                    color: colors.text,
                                    },
                                ]}
                            >
                                {UserData.fullName}
                            </Text>
                            <Text
                                style={[styles.Profile_Info_Email, {color: colors.primary}]}
                                ellipsizeMode="tail"
                                numberOfLines={1}
                            >
                                {UserData.email}
                            </Text>
                        </>
                        ) : null}
                    </View>
                    <View style={styles.Form_Grp}>
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
                            editable={true}
                            value={Fields.firstName}
                            onChangeText={txt => {
                                SetFeilds({...Fields, firstName: txt})
                            }}
                            placeholder="indtast fornavn..."
                            placeholderTextColor="rgba(0, 0, 0, 0.3)"
                        />
                    </View>
                    <View style={styles.Form_Grp}>
                        <Text style={[styles.Label, {color: colors.text}]}>Efternavn</Text>
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
                            editable={true}
                            value={Fields.lastName}
                            onChangeText={txt => {
                                SetFeilds({...Fields, lastName: txt})
                            }}
                            placeholder="indtast efternavn..."
                            placeholderTextColor="rgba(0, 0, 0, 0.3)"
                        />
                    </View>
                    <View style={styles.Form_Grp}>
                        <Text style={[styles.Label, {color: colors.text}]}>Email</Text>
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
                            editable={true}
                            onChangeText={txt => {
                                SetFeilds({...Fields, email: txt})
                            }}
                            keyboardType={'email-address'}
                            value={Fields.email}
                            placeholder="indtast email..."
                            placeholderTextColor="rgba(0, 0, 0, 0.3)"
                        />
                    </View>
                    <View style={styles.Form_Grp}>
                        <TouchableOpacity
                            onPress={() => {
                                UpdateProfile(Fields, UserData, navigation, setloading, ResponseFilter, UpdateUser)
                            }}
                            disabled={loading}
                            style={[
                                styles.Submit_Btn,
                                {
                                backgroundColor: colors.buttonBackground,
                                borderColor: colors.buttonBorder,
                                },
                            ]}
                        >
                        {loading ? (
                            <ActivityIndicator color={colors.buttonText} size={'small'} />
                        ) : (
                            <Text style={[styles.Submit_Btn_Text, {color: colors.buttonText}]}>
                                Opdater
                            </Text>
                        )}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.Form_Grp}>
                        <TouchableOpacity
                            onPress={() => {
                                ConfirmDeleteProfile(navigation)
                            }}
                            disabled={deleteloading}
                            style={[
                                styles.Submit_Btn,
                                {
                                backgroundColor: '#d11a2a',
                                borderColor: '#d11a2a',
                                },
                            ]}
                        >
                        {deleteloading ? (
                            <ActivityIndicator color={colors.buttonText} size={'small'} />
                        ) : (
                            <Text style={[styles.Submit_Btn_Text, {color: colors.buttonText}]}>
                                Slet konto helt
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
    Profile_Info: {
        padding: deviceType === 'Tablet' ? '14rem' : '20rem',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Profile_Img_Wrap: {
        marginBottom: deviceType == 'Tablet' ? '7rem' : '10rem',
        height: deviceType == 'Tablet' ? '105rem' : '150rem',
        width: deviceType == 'Tablet' ? '105rem' : '150rem',
        borderRadius: '100rem',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
    },
    Profile_Img: {
        height: deviceType == 'Tablet' ? '98rem' : '140rem',
        width: deviceType == 'Tablet' ? '98rem' : '140rem',
        borderRadius: '100rem',
        resizeMode: 'cover',
    },
    Profile_Info_Name: {
        fontSize: deviceType == 'Tablet' ? '11rem' : '16rem',
        fontFamily: 'Sen-Bold',
        paddingBottom: 2,
    },
    Profile_Info_Email: {
        fontSize: deviceType == 'Tablet' ? '10rem' : '14rem',
        fontFamily: 'Sen-Regular',
        textAlign: 'center',
    },
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

export default ProfileSettings
