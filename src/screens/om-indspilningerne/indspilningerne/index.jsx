/**React Imports */
import React from 'react'
import {Text, View,} from 'react-native'
import {Linking} from 'react-native'

/**Libraries */
import {useTheme} from '@react-navigation/native'

/**Components */
import Layout from '../../../components/layout'

/**Styles */
import styles from '../../styles/text-block'

/**Main Export */
const Indspilningerne = ({navigation}) => {
    const {colors} = useTheme();
    return (
        <Layout {...{title: 'Indspilningerne', navigation}}>
            <View style={styles.TextBlock}>
                <Text style={[styles.Text, {color: colors.text}]}>
                    Indspilningerne er tænkt som brugsmusik – en enkel præsentation af
                    salmerne, så man kan lære melodien. Derfor er de ikke så finpudsede,
                    som hvis de skulle have været udgivet på cd.
                </Text>
                <Text style={[styles.Text, {color: colors.text}]}>
                    Vi har tilstræbt at præsentere en bred vifte af stemmetyper.
                </Text>
            </View>
        </Layout>
    );
};

export default Indspilningerne;
