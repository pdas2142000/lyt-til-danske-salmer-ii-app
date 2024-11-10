/**React Imports */
import React, {useState} from 'react'
import {Text, View} from 'react-native'

/**Libraries */
import {useTheme} from '@react-navigation/native'

/**Components */
import Layout from '../../components/layout'

/**Local Imports */
import { Data } from './helpers'

/**Styles */
import styles from '../styles/text-block'

/**Main Export */
const StotOs = ({navigation}) => {

    const {colors} = useTheme()

    return (
        <Layout {...{title: 'Projektstøtte', navigation}}>
            <View style={styles.TextBlock}>
                <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                    Appen er udviklet med økonomisk støtte fra:
                </Text>
                <View style={styles.List}>
                    <View style={styles.List_Item}>
                        <View style={[styles.Dot, {backgroundColor: colors.text}]} />
                        <Text style={[styles.Text_Link, {color: colors.text}]}>
                            Salling Fondene
                        </Text>
                    </View>
                <View style={styles.List_Item}>
                    <View style={[styles.Dot, {backgroundColor: colors.text}]} />
                    <Text style={[styles.Text_Link, {color: colors.text}]}>
                        Jubilæumsfonden af 12/8 1973
                    </Text>
                </View>
                <View style={styles.List_Item}>
                    <View style={[styles.Dot, {backgroundColor: colors.text}]} />
                    <Text style={[styles.Text_Link, {color: colors.text}]}>
                        Knud og Rigmor Wiedemanns Fond
                    </Text>
                </View>
                </View>
                <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                    Hjemmesiden er etableret med økonomisk støtte fra:
                </Text>
                <View style={styles.List}>
                    <View style={styles.List_Item}>
                        <View style={[styles.Dot, {backgroundColor: colors.text}]} />
                        <Text style={[styles.Text_Link, {color: colors.text}]}>
                            Geheimråd Brandts Legat
                        </Text>
                    </View>
                    <View style={styles.List_Item}>
                        <View style={[styles.Dot, {backgroundColor: colors.text}]} />
                        <Text style={[styles.Text_Link, {color: colors.text}]}>
                            Jubilæumsfonden af 12/8 1973
                        </Text>
                    </View>
                    <View style={styles.List_Item}>
                        <View style={[styles.Dot, {backgroundColor: colors.text}]} />
                        <Text style={[styles.Text_Link, {color: colors.text}]}>
                            Det Sønderjyske Salmelegat
                        </Text>
                    </View>
                    <View style={styles.List_Item}>
                        <View style={[styles.Dot, {backgroundColor: colors.text}]} />
                        <Text style={[styles.Text_Link, {color: colors.text}]}>
                            Aalborg Stift
                        </Text>
                    </View>
                    <View style={styles.List_Item}>
                        <View style={[styles.Dot, {backgroundColor: colors.text}]} />
                        <Text style={[styles.Text_Link, {color: colors.text}]}>
                            Viborg Stift
                        </Text>
                    </View>
                    <View style={styles.List_Item}>
                        <View style={[styles.Dot, {backgroundColor: colors.text}]} />
                        <Text style={[styles.Text_Link, {color: colors.text}]}>
                            DOKS (Dansk Organist og Kantor Samfund)
                        </Text>
                    </View>
                    <View style={styles.List_Item}>
                        <View style={[styles.Dot, {backgroundColor: colors.text}]} />
                        <Text style={[styles.Text_Link, {color: colors.text}]}>
                            Menighedsplejen ved Trinitatis Kirke, Kbh
                        </Text>
                    </View>
                </View>
                <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                    Og menighedsrådene i:
                </Text>
                <View style={styles.List_Sm}>
                    {Data.map(val => {
                        return (
                            <View style={styles.List_Item_Sm} key={val.id}>
                                <Text style={[styles.Text,   styles.Text_Sm,{color: colors.lighterText}]}>
                                    {val.text}
                                </Text>
                            </View>
                        )
                    })}
                </View>
            </View>
        </Layout>
    )
}

export default StotOs
