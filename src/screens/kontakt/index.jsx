/**React Imports */
import React, {useEffect, useState} from 'react'
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
import {Linking} from 'react-native'
import {useTheme} from '@react-navigation/native'

/**Components */
import Layout from '../../components/layout'
import { ShowToast } from '../../services/toast-message'

/**Local Import */
import { makeRequest } from '../../utils/make-request'

/**Styles */
import styles from '../styles/text-block'

/**Main Export */
const Kontakt = ({navigation}) => {

    const {colors} = useTheme()
    const [RequestLoading, SetRequestLoading] = useState(false)
    const [Fields, SetFields] = useState({
        name: '',
        email: '',
        message: '',
        phone: '',
    })

    const validateEmail = email => {
        return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    }

    const SubmitResults = async () => {
        try {
            if (!validateEmail(Fields.email)) {
                //Require_translation
                ShowToast('Skriv en korrekt emailadresse', 'error')
                return
            }
            if (Fields.name.length < 2) {
                //Require_translation
                ShowToast('Skriv et korrekt navn', 'error')
                return
            }
            if (Fields.message.length < 2) {
                //Require_translation
                ShowToast('Skriv en besked', 'error')
                return
            }
            if (Fields.phone.length < 2) {
                //Require_translation
                ShowToast('Skriv et korrekt mobilnummer', 'error')
                return
            }
            SetRequestLoading(true)
            let response = await makeRequest('POST', `feedbacks`, {
                name: Fields.name,
                email: Fields.email,
                message: Fields.message,
                phone: Fields.phone,
            })
            // console.log('response of feeback', response)
            if (response.error == 1) {
                ShowToast("Din besked er sendt, tak")
                SetFields({
                    name: '',
                    email: '',
                    message: '',
                    phone: '',
                })
            }
            SetRequestLoading(false)
        } catch (err) {
            SetRequestLoading(false)
            console.log('eer at feedback', err)
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{flex: 1}}
        >
            <Layout {...{title: 'Kontakt', navigation}}>
                <View style={styles.TextBlock}>
                    <TouchableOpacity
                        onPress={() =>  Linking.openURL('mailto:info@lyttildanskesalmer.dk') }
                    >
                        <Text  style={[styles.Text, styles.Text_Link, {color: colors.primary}]}>
                            info@lyttildanskesalmer.dk
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.Contact_Form}>
                        <View
                            style={[
                                styles.Contact_Form_Wrap,
                                {
                                backgroundColor: colors.background,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.Text,
                                    styles.Text_Dark_Bold,
                                    {color: colors.text},
                                ]}
                            >
                                Tag kontakt
                            </Text>
                            <View style={styles.Contact_Form_Wrap_Inner}>
                                <View style={styles.Form_Grp}>
                                    <View style={styles.Input_Wrap}>
                                        <Text  style={[styles.Label,{color: colors.text,},]}>
                                            Dit navn
                                        </Text>
                                        <TextInput
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={[styles.Form_Control, {color: colors.text}]}
                                            placeholder="Dit navn"
                                            value={Fields.name}
                                            onChangeText={txt => {
                                                SetFields({...Fields, name: txt})
                                            }}
                                            placeholderTextColor="rgba(0, 0, 0, 0.3)"
                                        />
                                    </View>
                                    <View style={styles.Input_Wrap}>
                                        <Text
                                            style={[
                                                styles.Label,
                                                {
                                                color: colors.text,
                                                },
                                            ]}
                                        >
                                            Din emailadresse
                                        </Text>
                                        <TextInput
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={[styles.Form_Control, {color: colors.text}]}
                                            placeholder="Din emailadresse"
                                            placeholderTextColor="rgba(0, 0, 0, 0.3)"
                                            value={Fields.email}
                                            keyboardType={'email-address'}
                                            onChangeText={txt => {
                                                SetFields({...Fields, email: txt})
                                            }}
                                        />
                                    </View>
                                    <View style={styles.Input_Wrap}>
                                        <Text
                                            style={[
                                                styles.Label,
                                                {
                                                color: colors.text,
                                                },
                                            ]}
                                        >
                                            Dit telefonnummer
                                        </Text>
                                        <TextInput
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={[styles.Form_Control, {color: colors.text}]}
                                            placeholder="Dit telefonnummer"
                                            keyboardType={'number-pad'}
                                            placeholderTextColor="rgba(0, 0, 0, 0.3)"
                                            value={Fields.phone}
                                            onChangeText={txt => {
                                                SetFields({...Fields, phone: txt})
                                            }}
                                        />
                                    </View>
                                </View>
                                <View style={styles.Form_Grp}>
                                    <View style={styles.Input_Wrap}>
                                        <Text
                                            style={[
                                                styles.Label,
                                                { color: colors.text, },
                                            ]}
                                        >
                                            Besked
                                        </Text>
                                        <TextInput
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={[styles.Form_Control, {color: colors.text}]}
                                            placeholder="Besked"
                                            placeholderTextColor="rgba(0, 0, 0, 0.3)"
                                            multiline={true}
                                            value={Fields.message}
                                            onChangeText={txt => {
                                                SetFields({...Fields, message: txt})
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.Submit_Area}>
                                <TouchableOpacity
                                    style={[
                                        styles.Submit_Btn,
                                        {
                                        backgroundColor: colors.buttonBackground,
                                        borderColor: colors.buttonBorder,
                                        },
                                    ]}
                                    onPress={() => {
                                        SubmitResults()
                                    }}
                                    disabled={RequestLoading}>
                                {RequestLoading ? (
                                    <ActivityIndicator
                                    color={colors.buttonText}
                                    size={'small'}
                                    />
                                ) : (
                                    <Text
                                        style={[
                                            styles.Submit_Btn_Text,
                                            {color: colors.buttonText},
                                        ]}
                                    >
                                        Send besked
                                    </Text>
                                )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Layout>
        </KeyboardAvoidingView>
    )
}

export default Kontakt
