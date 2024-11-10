/**React Imports */
import React, { useState, useEffect, useContext, useRef } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Linking,
    AppState,
    Dimensions,
} from 'react-native'

/**Libraries */
import { getDeviceType } from 'react-native-device-info'

/**Components */
import Layout from '../../../components/layout'
import EStyleSheet from 'react-native-extended-stylesheet'

/**Local Imports */
import { IconProps } from '../../../utils/helpers/iconprops'
import { BASE_URL } from '../../../constants/url'
import { makeRequest } from '../../../utils/make-request'
import { AuthContext } from '../../../context/auth-context'
import { useTheme, useIsFocused } from '@react-navigation/native'
import { ThemeContext } from '../../../context/theme-context'

/**Icons */
import FileDownloadIcon from '../../../../assets/icons/file-download.svg'
import ArrowLeftIcon from '../../../../assets/icons/angle-left.svg'

const { height } = Dimensions.get('window')

let deviceType = getDeviceType()

/**Main Export */
const Invoices = ({ navigation }) => {

    const { theme } = useContext(ThemeContext)
    const isFocused = useIsFocused()
    const appState = useRef(AppState.currentState)
    const [appStateVisible, setAppStateVisible] = useState(appState.current)
    const [Loading, SetLoading] = useState(false)
    const { UserData, UpdateUser, ResponseFilter } = useContext(AuthContext)

    const { colors } = useTheme()

    const [Invoices, SetInvoices] = useState([])

    const getInvoices = async () => {
        try {
            SetLoading(true)
            let responseOfApi = await makeRequest(
                'GET',
                `invoices`,
                {},
                UserData && UserData.token ? UserData.token : null,
            )
            responseOfApi = ResponseFilter(responseOfApi)
            if (!responseOfApi) {
                return
            }
            if (responseOfApi.error == 1) {
                SetInvoices(responseOfApi.data)
            }
            SetLoading(false)
        } catch (err) {
            SetLoading(false)
            console.log(err, 'error at getting sub')
        }
    }

    const GetColorInfoAgain = async () => {
        try {
            let resp = await makeRequest(
                'GET',
                'get-color',
                {},
                UserData && UserData.token ? UserData.token : null,
            )
            resp = ResponseFilter(resp)
            if (!resp) {
                return
            }
            if (resp.error == 1) {
                if (resp.user) {
                    UpdateUser({ data: resp.user })
                }
            }
        } catch (err) {
            console.log('failed to get user and color', err)
        }
    }

    useEffect(() => {
        if (isFocused) {
            if (UserData) {
                if (!UserData.verified) {
                    GetColorInfoAgain()
                }
            }
        }
    }, [isFocused])

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appState.current.match(/background/) && nextAppState === 'active') {
                if (UserData && UserData.token && !UserData.verified) {
                    GetColorInfoAgain()
                    getInvoices()
                }
            }

            appState.current = nextAppState
            setAppStateVisible(appState.current)
        })
        getInvoices()
        return () => {
            subscription.remove()
        }
    }, [])

    const OpenStripeLink = () => {
        try {
            if (productsPurchased.invoice_url) {
                Linking.openURL(invoice_url)
            }
        } catch (error) {
            console.log('failed to open strip url', error)
        }
    }

    return (
        <Layout {...{ title: 'Faktura', navigation, ShouldShowBack: true }}>
            <View style={styles.Packages}>
                {Loading ? (
                    <View style={styles.EmptyContainer}>
                        <ActivityIndicator color={colors.primary} size={'large'} />
                    </View>
                ) : (
                    <FlatList
                        data={Invoices}
                        scrollEnabled={false}
                        ListEmptyComponent={() => {
                            return (
                                <View
                                    style={[
                                        styles.SongslistEmpty,
                                        { backgroundColor: theme.colors.background },
                                    ]}
                                >
                                    {/* Require_translation */}
                                    <Text
                                        style={[
                                            styles.Playlists_Title,
                                            { color: theme.colors.text },
                                        ]}
                                    >
                                        {'Ingen fakturaer fundet'}
                                    </Text>
                                </View>
                            )
                        }}
                        renderItem={({ item }) => {
                            return (
                                <View
                                    style={[
                                        styles.Box,
                                        {
                                            borderColor: item.selected
                                                ? colors.primary
                                                : 'transparent',
                                            backgroundColor: colors.background,
                                        },
                                    ]}
                                    key={item.id}
                                >
                                    <View style={styles.Box_Inner}>
                                        <View
                                            style={[
                                                styles.TagContainer,
                                                item.status === 'active'
                                                    ? styles.TagContainerGreen
                                                    : styles.TagContainerRed,
                                            ]}
                                        >
                                            <Text style={styles.Tag}>
                                                {item.status === 'active' ? 'Aktiv' : 'Udløbet'}
                                            </Text>
                                        </View>
                                        <Text style={[styles.Box_Title, { color: colors.text }]}>
                                            {item.subscription.name}
                                        </Text>
                                        <Text style={[styles.Box_Desc, { color: colors.text }]}>
                                            {item.from} - {item.to}
                                        </Text>
                                        <Text style={[styles.Box_Price, { color: colors.primary }]}>
                                            {item.subscription.amount_print}
                                        </Text>
                                        {/* <Text style={[styles.Box_Sm, {color: colors.lighterText}]}>
                                    {item.description}
                                </Text> */}
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('PdfViewer', {
                                                id: item.id,
                                                invoice_id:
                                                    'LT' +
                                                    item.method.substring(0, 2).toUpperCase() +
                                                    item.id.toString().padStart(4, '0'),
                                                token: UserData.token, // Replace with the actual token
                                            })
                                        }}
                                    >
                                        <View style={styles.Icon_Wrap}>
                                            <FileDownloadIcon
                                                {...IconProps(21)}
                                                name="file-download"
                                                style={[styles.Box_Icon, { fill: '#000000' }]}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                        keyExtractor={item => item.id}
                    />
                )}
                <TouchableOpacity
                    style={styles.Back_Btn}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <ArrowLeftIcon
                        name="arrow-left"
                        {...IconProps(14)}
                        style={[styles.Back_Btn_Icon, { color: colors.text }]}
                    />
                    <Text style={[styles.Back_Btn_Text, { color: colors.text }]}>
                        tilbage til profilen
                    </Text>
                </TouchableOpacity>
            </View>
        </Layout>
    )
}

const styles = EStyleSheet.create({
    Box: {
        padding: deviceType === 'Tablet' ? '8rem' : '12rem',
        marginBottom: deviceType === 'Tablet' ? '10.5rem' : '15rem',
        borderRadius: deviceType === 'Tablet' ? '7rem' : '10rem',
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderWidth: 3,
        position: 'relative',
        zIndex: 10,
    },
    TagContainer: {
        borderRadius: '40rem',
        paddingVertical: '3.5rem',
        paddingHorizontal: '10rem',
        marginBottom: '5rem',
    },
    TagContainerGreen: {
        backgroundColor: 'rgb(78, 159, 83)',
    },
    TagContainerRed: {
        backgroundColor: 'rgb(182, 38, 50)',
    },
    Tag: {
        color: '#fff',
    },
    Box_Inner: {
        flex: 1,
        paddingRight: '10rem',
        alignItems: 'flex-start',
    },
    Icon_Wrap: {
        backgroundColor: 'rgba(0,0,0,.05)',
        height: '40rem',
        width: '40rem',
        borderRadius: '8rem',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Box_Title: {
        fontFamily: 'Sen-Bold',
        fontSize: deviceType === 'Tablet' ? '12rem' : '18rem',
        letterSpacing: -0.35,
    },
    Box_Desc: {
        fontFamily: 'Sen-Regular',
        fontSize: deviceType === 'Tablet' ? '10rem' : '15rem',
        marginBottom: deviceType === 'Tablet' ? '4rem' : '6rem',
        letterSpacing: -0.35,
    },
    Box_Price: {
        fontFamily: 'Sen-Bold',
        fontSize: deviceType === 'Tablet' ? '14rem' : '21rem',
        letterSpacing: -0.35,
    },
    Box_Sm: {
        fontFamily: 'Sen-Regular',
        fontSize: deviceType === 'Tablet' ? '10rem' : '15rem',
        letterSpacing: -0.35,
    },
    Box_Icon: {
        fontSize: deviceType === 'Tablet' ? '14rem' : '21rem',
        color: '#000',
        opacity: 0.35,
    },
    Plan_Btn: {
        borderWidth: 1,
        borderRadius: deviceType === 'Tablet' ? '5rem' : '8rem',
        paddingVertical: deviceType === 'Tablet' ? '8.5rem' : '12rem',
        paddingHorizontal: deviceType === 'Tablet' ? '11rem' : '16rem',
        alignItems: 'center',
        marginVertical: deviceType === 'Tablet' ? '7rem' : '10rem',
    },
    Plan_Btn_Text: {
        fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
        fontFamily: 'Sen-Bold',
    },
    EmptyContainer: {
        height: '200rem',
        justifyContent: 'center',
        alignItems: 'center',
    },
    SongslistEmpty: {
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.3,
    },
    Playlists_Title: {
        fontFamily: 'Sen-Bold',
        fontSize: deviceType === 'Tablet' ? '14.5rem' : '20rem',
        lineHeight: deviceType === 'Tablet' ? '17.5rem' : '25rem',
        paddingVertical: '7rem',
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

export default Invoices
