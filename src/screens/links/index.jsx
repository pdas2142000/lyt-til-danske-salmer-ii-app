/**React Imports */import React, {useState} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'

/**Libraries */
import {useTheme} from '@react-navigation/native'
import {Linking} from 'react-native'

/**Components */
import Layout from '../../components/layout'
import EStyleSheet from 'react-native-extended-stylesheet'

/**Styles */
import styles from '../styles/text-block'

/**Main Export */
const Links = ({navigation}) => {
        
    const {colors} = useTheme()
    const [Data] = useState([
        {
        id: 'dt01',
        text: 'Den danske salmebog online',
        link: 'https://www.dendanskesalmebogonline.dk',
        },
        {
        id: 'dt02',
        text: 'Dansk Musikerforbund',
        link: 'https://www.dmf.dk',
        },
        {
        id: 'dt03',
        text: 'Dansk organist og kantor samfund',
        link: 'https://www.doks.dk',
        },
        {
        id: 'dt04',
        text: 'Folkekirken',
        link: 'https://www.folkekirken.dk',
        },
        {
        id: 'dt05',
        text: 'Folkekirkens Uddannelses- og Videnscenter',
        link: 'https://www.fkuv.dk',
        },
        {
        id: 'dt06',
        text: 'Danske salmer oversat til fremmedsprog',
        link: 'https://www.interchurch.dk/materialer',
        },
        {
        id: 'dt07',
        text: 'Dansk Kirkemusikerforening',
        link: 'https://www.kirkemusiker.dk',
        },
        {
        id: 'dt08',
        text: 'Kirkemusikskolerne',
        link: 'https://www.kirkemusikskole.dk',
        },
        {
        id: 'dt09',
        text: 'Kirkemusikalsk Kompetencecenter',
        link: 'https://www.kmkc.dk',
        },
        {
        id: 'dt10',
        text: 'KODA',
        link: 'https://www.koda.dk',
        },
        {
        id: 'dt11',
        text: 'Syng nyt – nye salmer',
        link: 'https://www.syngnyt.dk',
        },
        {
        id: 'dt12',
        text: 'Nykomponerede salmer af Poul Raaby',
        link: 'https://www.salmemelodier.dk',
        },
    ])

    return (
        <Layout {...{title: 'Links', navigation}}>
            <View style={styles.TextBlock}>
                <View style={[styles.Text_Table, {backgroundColor: colors.background}]}>
                    {Data.map((item, index) => {
                        return (
                            <View
                                key={item.id}
                                style={EStyleSheet.child(
                                    styles,
                                    'Text_Table_Item',
                                    index,
                                    Data.length,
                                )}
                            >
                                <View style={styles.Text_Table_Item_Inner}>
                                    <Text
                                        style={[
                                            styles.Text,
                                            styles.Text_Sm,
                                            {marginBottom: 0, color: colors.text},
                                        ]}
                                    >
                                        {item.text}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
                                    <Text
                                        style={[
                                            styles.Text_Link,
                                            styles.Text_Link_Sm,
                                            {color: colors.primary},
                                        ]}
                                    >
                                        besøg
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </View>
            </View>
        </Layout>
    )
}
export default Links
