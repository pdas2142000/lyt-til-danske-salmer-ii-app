/**React Imports */
import React, {useContext} from 'react'
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native'

/**Libraries */
import {Modal, ModalContent} from 'react-native-modals'
// import {useTheme} from '@react-navigation/native'
import {getDeviceType} from 'react-native-device-info'
import EStyleSheet from 'react-native-extended-stylesheet'

/**Local Imports */
import { ThemeContext } from '../../../context/theme-context'

let deviceType = getDeviceType()

/**Main Export */
export const ConfirmationModal = ({
    ShowModal,
    title,
    message,
    isLoading,
    onConfirm,
    onCancel,
    onDismiss,
}) => {
    
    const {theme} = useContext(ThemeContext)
    return (
        <Modal
            visible={ShowModal}
            onTouchOutside={() => {
                onDismiss()
            }}
            width={deviceType === 'Tablet' ? 0.5 : 0.9}
            overlayOpacity={0.2}
            onShow={() => console.log('show')}
            onDismiss={() => console.log('dismiss')}
        >
            <ModalContent style={{marginHorizontal: -18, marginVertical: -24}}>
                <View style={styles.Delete_Popper}>
                    <Text style={[styles.Popper_Title, {color: theme.colors.text}]}>
                        {title}
                    </Text>
                    <Text style={[styles.Popper_Desc, {color: theme.colors.lighterText}]}>
                        {message}
                    </Text>
                    <View style={styles.Popper_Btns}>
                        <TouchableOpacity
                            style={[
                                styles.Popper_Btn,
                                {backgroundColor: theme.colors.lighterBackground},
                               
                            ]}
                            onPress={() => {
                                onCancel()
                            }}
                        >
                            <Text
                                style={[styles.Popper_Btn_Text, {color: 'rgba(0,0,0,0.5)'}]}>
                                Annuller
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={isLoading}
                            style={[
                                styles.Popper_Btn,
                                {
                                backgroundColor: theme.colors.buttonBackground,
                                borderColor: theme.colors.buttonBorder,
                                borderWidth: 1,
                                },
                                title === "Slet konto helt" && styles.DeleteButton,
                            ]}
                            onPress={() => {
                                onConfirm()
                            }}
                        >
                        {isLoading ? (
                            <ActivityIndicator
                                color={theme.colors.buttonText}
                                size={'small'}
                            />
                        ) : (
                            <Text
                                style={[
                                    styles.Popper_Btn_Text,
                                    {color: theme.colors.buttonText},
                                ]}
                            >
                            {
                                title === "Slet konto helt" ? "Slet konto helt" : " OK"
                            }
                            </Text>
                        )}
                        </TouchableOpacity>
                    </View>
                </View>
            </ModalContent>
        </Modal>
    )
}

const styles = EStyleSheet.create({
    Delete_Popper: {
        paddingVertical: deviceType === 'Tablet' ? '17.5rem' : '25rem',
        paddingHorizontal: deviceType === 'Tablet' ? '14rem' : '20rem',
    },
    Popper_Title: {
        fontFamily: 'Sen-Bold',
        fontSize: deviceType === 'Tablet' ? '14rem' : '20rem',
        marginBottom: deviceType === 'Tablet' ? '10.5rem' : '15rem',
        letterSpacing: -1,
    },
    Popper_Desc: {
        fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
        lineHeight: deviceType === 'Tablet' ? '17rem' : '24rem',
        fontFamily: 'Sen-Regular',
        marginBottom: deviceType === 'Tablet' ? '17.5rem' : '25rem',
    },
    DeleteButton: {
        backgroundColor:"#d11a2a",
        borderColor:"#d11a2a"
    },
    Popper_Btns: {
        flexDirection: 'row',
    },
    Popper_Btn: {
        flex: 1,
        paddingVertical: deviceType === 'Tablet' ? '8.5rem' : '12rem',
        paddingHorizontal: deviceType === 'Tablet' ? '11rem' : '16rem',
        borderRadius: 6,
        marginHorizontal: 6,
        alignItems: 'center',
    },
    Popper_Btn_Text: {
        fontFamily: 'Sen-Bold',
    },
})
  