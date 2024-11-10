/**React Imports */
import React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import {Linking} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import OtaAppVersion from '../../../OtaAppVersion.json'

/**Libraries */
import {useTheme} from '@react-navigation/native'

/**Components */
import Layout from '../../../components/layout'

/**Styles */
import styles from '../../styles/text-block'

let NativeAppVersion = DeviceInfo.getVersion()
/**Main Export */
const Generelt = ({navigation}) => {
    const {colors} = useTheme()
    return (
        <Layout {...{title: 'Generelt', navigation}}>
            <View style={styles.TextBlock}>
                <Text style={[styles.Text, {color: colors.text}]}>
                    Denne app er opstået ud fra et ønske om at skabe et sted på
                    nettet, hvor man kan høre alle salmerne fra Den Danske Salmebog
                    indsunget i deres fulde længde. Tanken er, at appen både skal
                    være et salmeopslagsværk og et arbejdsredskab for præster,
                    teologistuderende, organister og kirkesangere.
                </Text>
                <Text style={[styles.Text, {color: colors.text}]}>
                    Den Danske Salmebog fra 2003 er indspillet i komplet udgave ud fra
                    salmebogen med noder; alle salmer, i de givne tonearter, alle vers, på
                    alle melodier – i alt 1129 salmer.
                </Text>
                <Text style={[styles.Text, {color: colors.text}]}>
                    Alle salmer kan streames gratis i fuld længde.
                </Text>
                <Text style={[styles.Text, {color: colors.text}]}>
                    Højmessens liturgiske led messet finder du under overskriften Ritualer
                    í Mandsstemme/Kvindestemme.
                </Text>
                <Text style={[styles.Text, {color: colors.text}]}>
                    Appen udvikles løbende.
                </Text>
                <TouchableOpacity onPress={() => Linking.openURL('mailto:info@lyttildanskesalmer.dk')}>
                <Text
                    style={[styles.Text, styles.Text_Link, {color: colors.primary}]}>
                    info@lyttildanskesalmer.dk
                </Text>
                </TouchableOpacity>
                <Text style={[styles.Text, {color: colors.text}]}>
                    CVR: 35 32 92 93{'\n'}Kontonummer: 3118 10876613
                </Text>
                <Text style={[styles.Appversion, {color: colors.text}]}>
                    Lyt til danske salmer v{NativeAppVersion}(
                    {OtaAppVersion.version})
                </Text>
            </View>
        </Layout>
    );
};

export default Generelt;
