/**React Imports */
import React, {useContext, useState} from 'react'
import {Text, View, TouchableOpacity, Image} from 'react-native'

/**Libraries */
import {getDeviceType} from 'react-native-device-info'
import {useTheme} from '@react-navigation/native'
import DeviceInfo from 'react-native-device-info'

/**Components */
import Layout from '../../components/layout'
import EStyleSheet from 'react-native-extended-stylesheet'

/**Local Imports */
import { IconProps } from '../../utils/helpers/iconprops'
import { AuthContext } from '../../context/auth-context'
import { BASE_URL } from '../../constants/url'
import OtaAppVersion from '../../OtaAppVersion.json'

/**Icons */
import PersonIcon from '../../../assets/icons/person.svg'
import ChevronRightIcon from '../../../assets/icons/chevron-right.svg'
import SettingsIcon from '../../../assets/icons/settings.svg'
import BoxIcon from '../../../assets/icons/drawer-icons/box.svg'
import FileDownloadIcon from '../../../assets/icons/file-download.svg'
import ArrowRightIcon from '../../../assets/icons/arrow-right.svg'
import CardIcon from '../../../assets/icons/card.svg'

let NativeAppVersion = DeviceInfo.getVersion()
let deviceType = getDeviceType()

/**Main Export */
const Profile = ({navigation}) => {
    const {colors} = useTheme()
    const {UserData, ConfirmLogout} = useContext(AuthContext)
    return (
        <Layout {...{title: 'Profil', navigation}}>
            <View style={styles.Profile_Info}>
                <View style={styles.Profile_Img_Wrap}>
                    <Image
                        source={
                        UserData && UserData.image && UserData.image.url
                            ? {uri: BASE_URL.url + UserData.image.url}
                            : require('../../../assets/profile.png')
                        }
                        style={styles.Profile_Img}
                    />
                </View>
                {UserData != null ? (
                <>
                    <Text
                        style={[
                            styles.Profile_Info_Name,
                            {color: colors.text,},
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
            {UserData != null ? (
                <View style={[styles.Btns_Wrap, {backgroundColor: colors.background}]}>
                    <TouchableOpacity
                        style={styles.Btn}
                        onPress={() => navigation.navigate('ProfileSettings')}
                    >
                        <View style={styles.Btn_Wrap}>
                            <View
                                style={[
                                styles.Icon_Wrap,
                                {backgroundColor: colors.lighterBackground},
                                ]}
                            >
                                <PersonIcon
                                    name="person"
                                    {...IconProps(16)}
                                    style={[styles.Icon, {color: colors.text}]}
                                />
                            </View>
                            <Text style={[styles.Text, {color: colors.text}]}>
                                Bruger
                            </Text>
                        </View>
                        <ChevronRightIcon
                            {...IconProps(16)}
                            name="chevron-right"
                            style={[styles.Icon_Right, {color: colors.text}]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.Btn}
                        onPress={() => navigation.navigate('ProfileChangePassword')}
                    >
                        <View style={styles.Btn_Wrap}>
                            <View
                                style={[
                                styles.Icon_Wrap,
                                {backgroundColor: colors.lighterBackground},
                                ]}
                            >
                                <SettingsIcon
                                    {...IconProps(16)}
                                    name="cog"
                                    style={[styles.Icon, {color: colors.text}]}
                                />
                            </View>
                            <Text style={[styles.Text, {color: colors.text}]}>
                                Kodeord
                            </Text>
                        </View>
                        <ChevronRightIcon
                            {...IconProps(16)}
                            name="chevron-right"
                            style={[styles.Icon_Right, {color: colors.text}]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.Btn}
                        onPress={() => navigation.navigate('Subscriptions')}
                    >
                        <View style={styles.Btn_Wrap}>
                            <View
                                style={[
                                styles.Icon_Wrap,
                                {backgroundColor: colors.lighterBackground},
                                ]}
                            >
                                <BoxIcon
                                    name="box"
                                    {...IconProps(16)}
                                    style={[styles.Icon, {color: colors.text}]}
                                />
                            </View>
                            <Text style={[styles.Text, {color: colors.text}]}>
                                Abonnement
                            </Text>
                        </View>
                        <ChevronRightIcon
                            {...IconProps(16)}
                            style={[styles.Icon_Right, {color: colors.text}]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.Btn}
                        onPress={() => navigation.navigate('Invoices')}
                    >
                        <View style={styles.Btn_Wrap}>
                            <View
                                style={[
                                styles.Icon_Wrap,
                                {backgroundColor: colors.lighterBackground},
                                ]}>
                                <FileDownloadIcon
                                {...IconProps(16)}
                                name="file-download"
                                style={[styles.Icon, {color: colors.text}]}
                                />
                            </View>
                            <Text style={[styles.Text, {color: colors.text}]}>
                                Faktura
                            </Text>
                        </View>
                        <ChevronRightIcon
                            name="chevron-right"
                            {...IconProps(16)}
                            style={[styles.Icon_Right, {color: colors.text}]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.Btn}
                        onPress={() => navigation.navigate('Card')}
                    >
                        <View style={styles.Btn_Wrap}>
                            <View
                                style={[styles.Icon_Wrap,  {backgroundColor: colors.lighterBackground},]}
                            >
                                <CardIcon
                                    {...IconProps(16)}
                                    style={[styles.Icon, {color: colors.text}]}
                                />
                            </View>
                            <Text style={[styles.Text, {color: colors.text}]}>
                                Betalingskort
                            </Text>
                        </View>
                        <ChevronRightIcon
                            name="chevron-right"
                            {...IconProps(16)}
                            style={[styles.Icon_Right, {color: colors.text}]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {ConfirmLogout()}}
                        style={[styles.Btn, {borderBottomColor: 'transparent'}]}
                    >
                        <View style={styles.Btn_Wrap}>
                            <View
                                style={[
                                styles.Icon_Wrap,
                                {backgroundColor: colors.lighterBackground},
                                ]}
                            >
                                <ArrowRightIcon
                                    name="arrow-right"
                                    {...IconProps(16)}
                                    style={[styles.Icon, {color: colors.text}]}
                                />
                            </View>
                            <Text style={[styles.Text, {color: colors.text}]}>Log ud</Text>
                        </View>
                        <ChevronRightIcon
                            {...IconProps(16)}
                            name="chevron-right"
                            style={[styles.Icon_Right, {color: colors.text}]}
                        />
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={[styles.Btns_Wrap, {backgroundColor: colors.background}]}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        style={[styles.Btn, {borderBottomColor: 'transparent'}]}
                    >
                        <View style={styles.Btn_Wrap}>
                            <View
                                style={[
                                styles.Icon_Wrap,
                                {backgroundColor: colors.lighterBackground},
                                ]}
                            >
                                <ArrowRightIcon
                                    name="arrow-right"
                                    {...IconProps(16)}
                                    style={[styles.Icon, {fill: colors.text}]}
                                />
                            </View>
                            <Text style={[styles.Text, {color: colors.text}]}>Log ind</Text>
                        </View>
                        <ChevronRightIcon
                            {...IconProps(16)}
                            name="chevron-right"
                            style={[styles.Icon_Right, {color: colors.text}]}
                        />
                    </TouchableOpacity>
                </View>
            )}
            <Text style={[styles.Appversion, {color: colors.text}]}>
                Lyt til danske salmer v{NativeAppVersion}(
                {OtaAppVersion.version})
            </Text>
        </Layout>
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
    paddingVertical: deviceType == 'Tablet' ? '10rem' : '15rem',
    borderRadius: deviceType === 'Tablet' ? '21rem' : '30rem',
  },
  Btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: deviceType === 'Tablet' ? '7rem' : '10rem',
  },
  Btn_Wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  Icon_Wrap: {
    height: deviceType === 'Tablet' ? '28rem' : '40rem',
    width: deviceType === 'Tablet' ? '28rem' : '40rem',
    borderRadius: deviceType === 'Tablet' ? '7rem' : '10rem',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: deviceType === 'Tablet' ? '14rem' : '20rem',
  },
  Icon: {
    fontSize: deviceType == 'Tablet' ? '11rem' : '16rem',
  },
  Text: {
    fontSize: deviceType == 'Tablet' ? '10rem' : '15rem',
    fontFamily: 'Sen-Bold',
  },
  Appversion: {
    fontSize: deviceType == 'Tablet' ? '10rem' : '14rem',
    fontFamily: 'Sen-Bold',
    textAlign: 'center',
    marginVertical: '10rem',
  },
  Icon_Right: {
    fontSize: deviceType === 'Tablet' ? '15.5rem' : '22rem',
    opacity: 0.35,
  },
})

export default Profile
