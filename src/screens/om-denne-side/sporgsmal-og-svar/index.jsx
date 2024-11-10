/**React Imports */
import React from 'react'
import {Text, View, TouchableOpacity} from 'react-native';
import {Linking} from 'react-native'

/**Libraries */
import {useTheme} from '@react-navigation/native'

/**Components */
import Layout from '../../../components/layout'

/**Styles */
import styles from '../../styles/text-block'

/**Main Export */
const SporgsmalOgSvar = ({navigation}) => {

  const {colors} = useTheme()

  const BulletListItem = ({title}) => {
        return (
        <View style={styles.List_Item}>
            <View style={[styles.Dot, {backgroundColor: colors.text}]} />
            <Text style={[styles.Text, {color: colors.text}]}>{title}</Text>
        </View>
        )
  }

  const LisItem = ({title}) => {
    return (
        <Text style={[styles.Text, {color: colors.text}]}>{title}</Text>
    )
  }

  const ListHeader = ({title}) => {
    return (
        <Text
            style={[styles.Text, styles.Text_Bold, {color: colors.text}]}
        >
            {title}
        </Text>
    );
  };

    return (
        <Layout {...{title: 'Spørgsmål og svar', navigation}}>
            <View style={styles.TextBlock}>
                <Text
                    style={[
                        styles.Text,
                        styles.Text_Dark_Bold,
                        {color: colors.text},
                    ]}
                >
                    Hvad kan jeg bruge Lyt til danske salmer til?
                </Text>
                <Text
                    style={[styles.Text, styles.Text_Dark, {color: colors.text}]}
                >
                    Du kan:
                </Text>
                <ListHeader title={'Som præst'} />
                <View style={styles.List}>
                    <BulletListItem
                        title={
                        'Finde salmer til højmesser/andre gudstjenester/kirkelige handlinger.'
                        }
                    />
                    <BulletListItem
                        title={
                        'Lade dig inspirere af Kirkemusikalsk Kompetencecenters forslag til salmer til alle årets Højmesser.'
                        }
                    />
                    <BulletListItem title={'Foreslå salmer til vielse.'} />
                    <BulletListItem title={'Foreslå salmer til begravelse/bisættelse.'} />
                    <BulletListItem title={'Foreslå salmer til barnedåb.'} />
                    <BulletListItem
                        title={
                        'Høre forslag til hvordan du kan messe højmessens liturgiske led – og øve dig sammen med indspilningerne.'
                        }
                    />
                    <BulletListItem title={'Lære nye salmer.'} />
                    <BulletListItem
                        title={'Lære nye melodier til allerede kendte salmetekster.'}
                    />
                </View>
                <ListHeader title={'Som kirkesanger'} />
                <View style={styles.List}>
                    <BulletListItem
                        title={
                        'Lære de salmer du skal synge til Højmesse og andre tjenester.'
                        }
                    />
                    <BulletListItem
                        title={
                        'Er dansk ikke dit modersmål, og du er i tvivl om udtale, kan du høre den her.'
                        }
                    />
                </View>
                <ListHeader title={'Som privatperson'} />
                <View style={styles.List}>
                    <BulletListItem
                        title={
                        'Lytte til salmer, hvis du ikke kan komme i kirke, og savner salmesang.'
                        }
                    />
                    <BulletListItem
                        title={
                        'Finde salmer til dåb, vielse, bisættelse, som du kan tage med som forslag til præsten.'
                        }
                    />
                    <BulletListItem
                        title={
                        'Høre forslag til ind- og udgangsmusik til vielse/bisættelse.'
                        }
                    />
                    <BulletListItem
                        title={
                        'Afspille salmer juleaften, hvis der ikke er nogen i familien, der rigtigt tør synge for.'
                        }
                    />
                </View>
                <LisItem title={'Og hvad du ellers kunne tænke dig.'} />
                <ListHeader title={'Hvor er salmernes tekster?'} />
                <LisItem
                    title={
                        'Der er links ved hver salme til teksten på www.dendanskesalmebogonline.dk Der kan du også finde salmernes historie og informationer om forfattere og komponister.'
                    }
                />
                <ListHeader title={'Hvorfor mangler der nogle tekster?'} />
                <LisItem
                    title={
                        'Det er ikke tilladt at vise de rettighedsbelagte salmetekster.'
                    }
                />
                <ListHeader title={'Må man linke til jeres indspilninger?'} />
                <LisItem title={'Alt det du vil.'} />
                <LisItem
                    title={
                        'Hvis du i øvrigt har kommentarer, forslag eller spørgsmål, er du altid velkommen til at maile til os på'
                    }
                />
                <TouchableOpacity onPress={() => Linking.openURL('mailto:info@lyttildanskesalmer.dk')} >
                    <Text
                        style={[
                        styles.Text,
                        styles.Text_Link,
                        {color: colors.primary},
                        ]}>
                        info@lyttildanskesalmer.dk
                    </Text>
                </TouchableOpacity>
            </View>
        </Layout>
    );
};

export default SporgsmalOgSvar;
