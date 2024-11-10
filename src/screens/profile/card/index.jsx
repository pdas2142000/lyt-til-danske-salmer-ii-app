
/**React Imports */
import React, { useState, useEffect, useContext } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Dimensions,
} from 'react-native'

/**Libraries */
import { getDeviceType } from 'react-native-device-info'
import { useIsFocused, useTheme } from '@react-navigation/native'
import { ThemeContext } from '../../../context/theme-context'
import EStyleSheet from 'react-native-extended-stylesheet'

/**Local Imports */
import { IconProps } from '../../../utils/helpers/iconprops'
import { makeRequest } from '../../../utils/make-request'
import { AuthContext } from '../../../context/auth-context'
import { CardTypes } from './card'

/**Components */
import Layout from '../../../components/layout'
import { ConfirmationModal } from '../../../components/common/confirmation-modal'
import { ShowToast } from '../../../services/toast-message'

/**Icons */
import TrashIcon from '../../../../assets/icons/trash.svg'
import PlusIcon from '../../../../assets/icons/plus.svg'
import ArrowLeftIcon from '../../../../assets/icons/angle-left.svg'
import CardIcon from '../../../../assets/icons/card.svg'

const { height } = Dimensions.get('window')

let deviceType = getDeviceType()

/**Main Export */
const Card = ({ navigation }) => {

    const { colors } = useTheme()
    const IsFocuse = useIsFocused()
    const [Loading, SetLoading] = useState(true)
    const { theme } = useContext(ThemeContext)
    const { UserData } = useContext(AuthContext)
    const [ShowDeleteModal, SetShowDeleteModal] = useState(false)
    const [DeleteCardListLoading, SetDeleteCardListLoading] = useState(false)
    const [Data, SetData] = useState(null)
    const [ActiveCard, SetActiveCard] = useState(null)

    useEffect(() => {
        GetData()
    }, [ShowDeleteModal, IsFocuse])

    const GetData = async () => {
        SetLoading(true)
        console.log(UserData && UserData.token ? UserData.token : null);
        let Response = await makeRequest("GET", "user-card", {}, UserData && UserData.token ? UserData.token : null)
        if (Response.error === 1) {
            SetData(Response)
            SetLoading(false)
        }
    }

    const maskCardNumber = (cardNumber) => {
        return `xxxx xxxx xxxx ${cardNumber.slice(-4)}`
    }

    const DeleteCard = async cardId => {
        let Response = await makeRequest("DELETE", `user-card/${cardId}`, {}, UserData && UserData.token ? UserData.token : null)

        if (Response.error === 1) {
            SetData(Response)
            SetShowDeleteModal(false)
            ShowToast(Response.msg)
        }
    }

    const GetPrimaryData = async (id) => {
        let Response = await makeRequest("PUT", `user-card/toggle/${id}`, {}, UserData && UserData.token ? UserData.token : null)
        if (Response?.error === 1) {
            const updatedCard = Response?.data
            const updatedData = Data?.data?.data?.map(card => card.id === updatedCard.id ? updatedCard : card).map(card => {
                if (card.id !== updatedCard.id) {
                    return { ...card, primary: false }
                }
                return card
            })
            SetData({
                ...Data,
                data: {
                    ...Data?.data,
                    data: updatedData
                }
            })
        }
    }

    return (
        <Layout {...{ title: 'Betalingskort', navigation, ShouldShowBack: true, type: "add_card" }}>
            <View style={styles.Packages}>
                <View style={[styles, { backgroundColor: colors.background }]}>
                    <View style={[styles.Playlist_Head, { borderBottomColor: colors.text + '1A' },]}>
                        <Text style={[styles.Playlist_Head_Title, { color: colors.text }]}>
                            Betalingskort
                        </Text>
                        <View style={styles.Playlist_Head_Inner}>
                            <TouchableOpacity
                                style={[
                                    styles.Playlist_Head_Btn,
                                    { backgroundColor: colors.lighterBackground },
                                ]}
                                onPress={() => navigation.navigate('AddCard')}
                            >
                                <PlusIcon
                                    name="plus"
                                    {...IconProps(12)}
                                    style={[
                                        styles.Playlist_Head_Btn_Icon,
                                        { color: colors.primary, },
                                    ]}
                                />
                                <Text
                                    style={[
                                        styles.Playlist_Head_Btn_Text,
                                        { color: colors.primary },
                                    ]}
                                >
                                    Tilføj kort
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {Loading ? (
                    <View style={styles.EmptyContainer}>
                        <ActivityIndicator color={colors.primary} size={'large'} />
                    </View>
                ) : (
                    <FlatList
                        data={Data?.data?.data}
                        scrollEnabled={false}
                        keyExtractor={item => item.id}
                        ListEmptyComponent={<ContainerEmpty colors={colors} />}
                        renderItem={({ item }) => {
                            const cardType = CardTypes.find((n) => n.type === item.card_type);
                            return (
                                <View
                                    style={[
                                        styles.Box,
                                        {
                                            backgroundColor: colors.background,
                                            borderBottomColor: colors.text + '0D'
                                        },
                                    ]}
                                    key={item.id}
                                >
                                    <View style={styles.Image_holder}>
                                        {item.card_type ?
                                            <cardType.icon_svg style={[styles.sl_card_icon]} /> :
                                            <CardIcon style={styles.sl_icon} />
                                        }
                                    </View>
                                    <View style={styles.Box_Inner}>
                                        <Text style={[styles.Box_Title, { color: colors.text }]}>
                                            {maskCardNumber(item.card_number)}
                                        </Text>
                                        <Text style={[styles.Box_Desc, { color: colors.lighterText }]}>
                                            {item.card_expiration_month}/{item.card_expiration_year}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                GetPrimaryData(item.object_id)
                                            }}
                                            style={[
                                                styles.primary_card,
                                                item.primary ? styles.primary : styles.non_primary
                                            ]}
                                        >
                                            <Text style={item.primary ? styles.primary_text : styles.non_primary_text}>
                                                {item.primary ? "Aktivt kort" : "Skift til dette kort"}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            SetActiveCard(item.object_id)
                                            SetShowDeleteModal(true)
                                        }}
                                    >
                                        <View style={styles.Icon_Wrap}>
                                            <TrashIcon
                                                {...IconProps(12)}
                                                name="trash"
                                                style={[styles.Box_Icon, { fill: 'red' }]}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />)
                }
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
                <ConfirmationModal
                    ShowModal={ShowDeleteModal}
                    onCancel={() => {
                        SetShowDeleteModal(false)
                    }}
                    onDismiss={() => {
                        SetShowDeleteModal(false)
                    }}
                    title={'Slet betalingskort'}
                    message={
                        'Er du sikker på, at du vil slette betalingskortet? Denne handling kan ikke fortrydes.'
                    }
                    onConfirm={() => {
                        DeleteCard(ActiveCard)
                    }}
                    isLoading={DeleteCardListLoading}
                />
            </View>
        </Layout>
    )
}

const ContainerEmpty = ({ colors }) => {
    return (
        <View style={styles.EmptyContainerWrapper}>
            <Text style={[styles.EmptyContainerText, { color: colors.text }]}>
                Ingen betalingskort fundet
            </Text>
        </View>
    )
}

const styles = EStyleSheet.create({
    Box: {
        padding: deviceType === 'Tablet' ? '8rem' : '12rem',
        flexDirection: 'row',
        alignItems: 'flex-start',
        position: 'relative',
        zIndex: 10,
        borderBottomWidth: 1,
    },
    Packages: {
        flex: 1,
    },
    EmptyContainerText: {
        paddingVertical: deviceType === 'Tablet' ? '8rem' : '24rem',
        textAlign: 'center',
        fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
        fontFamily: 'Sen-Bold',
    },
    Playlist_Head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        paddingHorizontal: deviceType === 'Tablet' ? '14rem' : '20rem',
        paddingVertical: deviceType === 'Tablet' ? '8rem' : '12rem',
    },
    Playlist_Head_Title: {
        fontFamily: 'Sen-Bold',
        fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
    },
    sl_type: {
        fontFamily: 'Sen-Bold',
        color: "#000",
        fontSize: deviceType === 'Tablet' ? '12.5rem' : '18rem',
    },
    sl_icon: {
        width: deviceType === 'Tablet' ? '14rem' : '21rem',
        height: deviceType === 'Tablet' ? '14rem' : '21rem',
        color: '#000',
        opacity: 0.35,
    },
    Playlist_Head_Inner: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    Playlist_Head_Btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: deviceType === 'Tablet' ? '3rem' : '4rem',
        paddingHorizontal: deviceType === 'Tablet' ? '7rem' : '10rem',
        paddingVertical: deviceType === 'Tablet' ? '3.5rem' : '5rem',
    },
    Playlist_Head_Btn_Icon: {
        marginRight: 5,
        fontSize: deviceType === 'Tablet' ? '8rem' : '12rem',
    },
    Playlist_Head_Btn_Text: {
        fontFamily: 'Sen-Bold',
        fontSize: deviceType === 'Tablet' ? '10rem' : '14rem',
    },
    Image_holder: {
        height: deviceType == 'Tablet' ? '98rem' : '72rem',
        width: deviceType == 'Tablet' ? '98rem' : '72rem',
        marginRight: deviceType === 'Tablet' ? '10.5rem' : '15rem',
        backgroundColor: 'rgba(0,0,0,.05)',
        borderRadius: '8rem',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sl_card_icon: {
        width: deviceType === 'Tablet' ? '28rem' : '35rem',
        height: deviceType === 'Tablet' ? '28rem' : '35rem',
    },
    Text_Image: {
        height: deviceType == 'Tablet' ? '88rem' : '60rem',
        width: deviceType == 'Tablet' ? '88rem' : '60rem',
        resizeMode: 'contain',
    },
    primary_card: {
        borderRadius: '40rem',
        paddingVertical: '3.5rem',
        paddingHorizontal: '10rem',
        marginTop: '3rem',
    },
    primary: {
        backgroundColor: "#008eff"
    },
    non_primary: {
        backgroundColor: 'rgba(0,0,0,.05)',
    },
    primary_text: {
        color: '#fff',
        fontFamily: 'Sen-Bold',
        fontSize: deviceType === 'Tablet' ? '8rem' : '12rem',
    },
    non_primary_text: {
        color: '#000',
        fontFamily: 'Sen-Bold',
        fontSize: deviceType === 'Tablet' ? '8rem' : '12rem',
    },
    Box_Inner: {
        flex: 1,
        paddingRight: '10rem',
        alignItems: 'flex-start',
    },
    Icon_Wrap: {
        backgroundColor: '#ce39391f',
        height: '32rem',
        width: '32rem',
        borderRadius: '8rem',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Box_Title: {
        fontFamily: 'Sen-Bold',
        fontSize: deviceType === 'Tablet' ? '10.5rem' : '15rem',
        lineHeight: deviceType === 'Tablet' ? '17.5rem' : '25rem',
    },
    Box_Desc: {
        fontFamily: 'Sen-Regular',
        fontSize: deviceType === 'Tablet' ? '9.5rem' : '14rem',
        marginRight: deviceType === 'Tablet' ? '5.5rem' : '8rem',
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
        flex: 1
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

export default Card
