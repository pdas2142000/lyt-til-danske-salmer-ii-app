/**React Imports */
import React from 'react'
import {Text, View} from 'react-native'

/**Libraries */
import {getDeviceType} from 'react-native-device-info'
import {useTheme} from '@react-navigation/native'
import YoutubePlayer from 'react-native-youtube-iframe'

/**Components */
import Layout from '../../../components/layout'

/**Styles */
import styles from '../../styles/text-block'

let deviceType = getDeviceType()

/**Main Export */
const ForslagTilVielse = ({navigation}) => {

    const {colors} = useTheme()

    return (
        <Layout {...{title: 'Forslag til vielse', navigation}}>
            <View style={styles.TextBlock}>
                <Text style={[styles.Text, {color: colors.text}]}>
                    Her er vores forslag til orgelmusik til bisættelse/begravelse. Tag den
                    lokale organist med på råd og hør, om den musik I ønsker er på
                    repertoiret, passer til kirkens orgel og evt. om han/hun har andre
                    forslag.
                </Text>
                <View style={styles.Video_Wrap}>
                <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                    J.S. Bach – Air
                </Text>
                <YoutubePlayer
                    height={deviceType === 'Tablet' ? 250 : 200}
                    videoId={'LuxbAkxNpcg'}
                />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text
                        style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        J.S. Bach – Jesu bleibet meine Freude
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'kTrhxR47Crg'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text  style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        J.S. Bach BWV 552 – Præludium i Eb
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'1fRCYSQCeSc'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text  style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        J.S.Bach BWV 553 – 8 Præludier og Fugaer, nr 1
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'3-grdfTr9FA'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text  style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        J.S.Bach BWV 554 – 8 Præludier og Fugaer, nr 2
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'PJzBfKCG3uI'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text  style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        J.S.Bach BWV 556 – 8 Præludier og Fugaer, nr 4
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'UM5BqVpoRcA'}
                />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        J.S. Bach BWV 645 – Wachet auf
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'md5lDmPbX8Y'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text  style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        Boëlmann – Suite Gothique opus 25 – Menuet
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'2jxPl-gDCk4'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        Boëlmann – Suite Gothique opus 25 – Toccata
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'yVLePFstCx0'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        Dubois – Toccata
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'wWPF7C1gPNg'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text  style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        Cécar Franck – Sortie
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'iS_gD4JQpDo'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        Guilmant – Finale af Sonate nr 1 opus 42
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'BEXdG-KDCBM'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        Händel – Arrival of the Queen of Sheba
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'ShB-v7tHASQ'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        Karg-Elert – Nun danket alle Gott
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'NtPdR6_6d2M'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        Jesper Madsen – Denne er dagen
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'A6sndtPit3M'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        Mendelssohn-Bartholdy – Allegro Maestoso i C
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'mXE8BWEzJj4'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        Mendelssohn-Bartholdy – Bryllupsmarch
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'Z-yUOBft96Y'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text  style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        Knut Nystedt – Bryllupsmarsj
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'BoxSW5GS_Co'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        Johann Pachelbel – Canon i D
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'bqj6ZpAD4L0'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        Purcell – Trumpet Tune
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'N6FA7k9vwVQ'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text  style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        John Rutter – Toccata in seven
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'EZh0KSkNspU'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        Wagner – Brudekoret
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'P6rX3wlDsVI'}
                    />
                </View>
                <View style={styles.Video_Wrap}>
                    <Text style={[styles.Text, styles.Text_Dark_Bold, {color: colors.text}]}>
                        Widor – Toccata fra Orgelsymfoni nr 5
                    </Text>
                    <YoutubePlayer
                        height={deviceType === 'Tablet' ? 250 : 200}
                        videoId={'b0tmUCHA6fo'}
                    />
                </View>
            </View>
        </Layout>
    )
}
export default ForslagTilVielse
