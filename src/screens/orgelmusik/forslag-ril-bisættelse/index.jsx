/**React Imports */
import React from 'react'
import {Text, View} from 'react-native'

/**Libraries */
import YoutubePlayer from 'react-native-youtube-iframe'
import {getDeviceType} from 'react-native-device-info'
import {useTheme} from '@react-navigation/native'

/**Components */
import Layout from '../../../components/layout'

/**Styles */
import styles from '../../styles/text-block'

let deviceType = getDeviceType()

/**Main Export */
const ForslagRilBisættelse = ({navigation}) => {

  const {colors} = useTheme()

    return (
        <Layout {...{title: 'Forslag til bisættelse', navigation}}>
            <View style={styles.TextBlock}>
                <Text style={[styles.Text, {color: colors.text}]}>
                    Her er vores forslag til orgelmusik til bisættelse/begravelse. Tag den
                    lokale organist med på råd og hør, om den musik I ønsker er på
                    repertoiret, passer til kirkens orgel og evt. om han/hun har andre
                    forslag.
                </Text>
                <View style={styles.Video_Wrap}>
                    <Text  style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        J.S. Bach – Air"
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'LuxbAkxNpcg'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        J.S. Bach – Jesu bleibet meine Freude"
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'kTrhxR47Crg'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        J.S. Bach BWV 555 – 8 Præludier og Fugaer, nr 3"
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'_TfagClr-Lk'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        J.S. Bach BWV 639 – Ich ruf´ zu dir"
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'X9Dh43kVL1Q'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        J.S. Bach BWV 641 – Wenn wie in höchsten"
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'GPMeBNU9fes'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text  style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        J.S. Bach BWV 731 – Liebster Jesu"
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'xfPd2dyugcs'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        Samuel Barber – Adagio for Strings – arr. for orgel"
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'bHazkmSERxQ'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        Johannes Brahms – Es ist ein Ros entsprungen"
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'yPoqaLAHFBI'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        Boëlmann – Suite Gothique opus 25 – Priére"
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'iYWUZdBjiSI'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        Cécar Franck – Prelude, Fugue et Variation"
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'evesBBUH4l0'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        Gammal Fäbodspsalm från Dalarna"
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'-tVmxsbzoB8'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        Jesper Madsen – Nu vågne alle Guds fugle"
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'EXdae8IWp00'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text  style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        Johann Pachelbel – Kanon i D"
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'bqj6ZpAD4L0'}
                    />
                </View>
            </View>
        </Layout>
    )
}

export default ForslagRilBisættelse
