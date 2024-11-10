/**React Imports */
import React, { useContext, useState, useEffect } from 'react'
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
import { getDeviceType } from 'react-native-device-info'
import { useTheme } from '@react-navigation/native'
import { CardField, useConfirmSetupIntent } from '@stripe/stripe-react-native'
import { ShowToast } from '../../../services/toast-message'

/**Local Imports */
import { IconProps } from '../../../utils/helpers/iconprops'
import { makeRequest } from '../../../utils/make-request'
import { AuthContext } from '../../../context/auth-context'



/**Components */
import Layout from '../../../components/layout'
import EStyleSheet from 'react-native-extended-stylesheet'

/**Icons */
import ArrowLeftIcon from '../../../../assets/icons/angle-left.svg'

let deviceType = getDeviceType()

/**Main Export */
const AddCard = ({ navigation }) => {

    const { colors } = useTheme()

    const { confirmSetupIntent, loading } = useConfirmSetupIntent()
    const { UserData } = useContext(AuthContext)
    const [Loading, SetLoading] = useState(false)
    const [ClientKey, SetClientKey] = useState(null)
    const [Button, SetButton] = useState("Gem kort");

    const handlePayPress = async () => {
        SetButton("Gemmer...")
        const { setupIntent, error } = await confirmSetupIntent(ClientKey, {
            paymentMethodType: 'Card'
        })
        if (setupIntent?.status === "Succeeded") {
            setTimeout(() => {
                ShowToast("dine kortoplysninger blev gemt")
                navigation.navigate("Card")
            }, 2000)
        } else {
            console.log("error", error)
            ShowToast("Kortet kunne ikke gemmes", "error")
            SetButton("Gem kort")
        }
    }

    useEffect(() => {
        GetData()
    }, [])

    const GetData = async () => {
        SetLoading(true)
        let Response = await makeRequest("POST", "create-intent", {}, UserData && UserData.token ? UserData.token : null)
        if (Response.error === 1) {
            SetClientKey(Response?.data)
            SetLoading(false)
        }
    }

    return (
        <Layout {...{ title: 'Tilføje kort', navigation, ShouldShowBack: true }}>
            {Loading ? (
                <View style={styles.EmptyContainer}>
                    <ActivityIndicator color={colors.primary} size={'large'} />
                </View>
            ) : (
                <>
                    <View style={[styles.Btns_Wrap, { backgroundColor: colors.background }]}>
                        <View style={{ flex: 1 }}>
                            <CardField
                                postalCodeEnabled={false}
                                placeholders={{
                                    number: 'Kortnummer',
                                    expiration: 'MM/ÅÅ',
                                    cvc: 'CVC',
                                }}
                                cardStyle={{
                                    backgroundColor: colors.lighterBackground,
                                    textColor: '#000000',
                                    placeholderColor: '#c5c1c1'
                                }}
                                style={[
                                    {
                                        width: '100%',
                                        height: 50,
                                    }
                                ]}
                                onCardChange={(cardDetails) => {
                                    console.log('cardDetails', cardDetails)
                                }}
                                onFocus={(focusedField) => {
                                    console.log('focusField', focusedField)
                                }}
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
                                onPress={handlePayPress}
                                disabled={Button !== "Gem kort"}
                            >
                                <Text style={[styles.Submit_Btn_Text, { color: colors.buttonText }]}>
                                    {Button}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.Alert_Text, { color: colors.text }]}>
                            Ved at klikke på &quot;Gem kort&quot; giver du os tilladelse til at gemme dit kort til dine fremtidige abonnementsbetalinger hos os (Lyt til danske salmer).
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.Back_Btn}
                        onPress={() => navigation.navigate('Card')}
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
                </>)}
        </Layout>
    )
}

const styles = EStyleSheet.create({
    Btns_Wrap: {
        paddingHorizontal: deviceType === 'Tablet' ? '21rem' : '30rem',
        paddingVertical: deviceType == 'Tablet' ? '17.5rem' : '25rem',
        borderRadius: deviceType === 'Tablet' ? '21rem' : '30rem',
    },
    Alert_Text: {
        fontFamily: 'Sen-Bold',
        fontSize: deviceType === 'Tablet' ? '10rem' : '14rem',
        fontWeight: 'normal',
    },
    Form_Grp_wrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    Form_expiry: {
        width: "63%",
        paddingVertical: deviceType === 'Tablet' ? '8.5rem' : '12rem',
        borderRadius: 6,
    },
    Form_cvv: {
        width: "33%",
        paddingVertical: deviceType === 'Tablet' ? '8.5rem' : '12rem',
        borderRadius: 6,
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

export default AddCard
