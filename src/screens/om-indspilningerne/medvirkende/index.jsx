/**React Imports */
import React from 'react'
import {Text, View,} from 'react-native'

/**Libraries */
import {useTheme} from '@react-navigation/native'

/**Components */
import Layout from '../../../components/layout'

/**Styles */
import styles from '../../styles/text-block'

/**Main Export */
const Medvirkende = ({navigation}) => {

  	const {colors} = useTheme()
	const ListTitle = ({title}) => {
		return (
			<Text
				style={[
					styles.Text,
					styles.Text_Dark_Bold,
					{color: colors.text},
				]}
			>
				{title}
			</Text>
		)
	}

	return (
		<Layout {...{title: 'Medvirkende', navigation}}>
			<View style={styles.TextBlock}>
				<Text style={[styles.Text, styles.Text_Bold, {color: colors.text}]}>
					Sangere
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
				<ListTitle title={'AT – Anders Tangaa Jensen, '} />
					Baryton. Trinitatis Kirke Kbh
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					<ListTitle title={'BG – Brian Grønbæk Jensen, '} />
					Baryton. Trinitatis Kirke Kbh
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					<ListTitle title={'CTB – Camilla Toldi Bugge, '} />
					Sopran. Trinitatis Kirke Kbh./DR KoncertKoret
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					<ListTitle title={'JR – Jens Rademacher, '} />
					Tenor. Københavns Domkirke/DR KoncertKoret/Den Kgl. Operas Kor
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					<ListTitle title={'LT – Lauritz Thomsen, '} />
					Baryton. Københavns Domkirke/ DR Koncertkoret/Musica Ficta
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
				<ListTitle title={'RL – Rikke Lender, '} />
					Mezzosopran. Trinitatis Kirke Kbh./DR VokalEnsemblet
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					<ListTitle title={'UH – Uffe Henriksen, '} />
					Bas. Den Kgl. Operas Kor/ DR KoncertKoret
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					<ListTitle title={'UW – Ulla Wittenburg, '} />
					Alt. Københavns Domkirke/DR KoncertKoret
				</Text>
				<Text style={[styles.Text, styles.Text_Bold, {color: colors.text}]}>
					Organister
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					<ListTitle title={'HK – Hanne Kuhlmann, '} />
					Domorganist. Vor Frue Kirke, Københavns Domkirke
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					<ListTitle title={'HW – Hans Westenholz, '} />
					Garnisons Kirke, København
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					<ListTitle title={'MD – Mads Damlund, '} />
					Jægersborg Kirke, Gentofte
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					<ListTitle title={'PM – Peter Bjerregaard, '} />
					Godthaabskirken, Frederiksberg
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					<ListTitle title={'SCV – Søren Christian Vestergaard, '} />
					Trinitatis Kirke, København
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					<ListTitle title={'SG – Søren Gleerup Hansen, '} />
					Sankt Mariæ Kirke, Helsingør
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					<ListTitle title={'VA – Vibeke Astner, '} />
					Mølholm Kirke, Vejle
				</Text>
				<Text style={[styles.Text, styles.Text_Bold, {color: colors.text}]}>
					Producere
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					<ListTitle title={'CB – Claus Byrith. '} />
					Gennem knap 40 år ansat som lydteknisk konsulent og leder af
					lydstudiet ved Det jyske Musikkonservatorium. Har specialiseret sig i
					overspilning af 78-plader til cd og restaurering af lyden. Har vundet
					flere priser for sit arbejde.
				</Text>
				<Text style={[styles.Text, {color: colors.text}]}>
					<ListTitle title={'MM – Morten Mogensen. '} />
					Står sammen med Claus Byrith bag en lang række orkesterproduktioner
					for DaCapo. Har debuteret som pianist Fra Det kgl. Danske
					Musikkonservatorium med omfattende koncertvirksomhed. Ansat som
					producer for DR Radiosymfoniorkestret.
				</Text>
				<Text style={[styles.Text, styles.Text_Bold, {color: colors.text}]}>
					Kirker
				</Text>
				<ListTitle title={'GO – Godthaabskirken, Frederiksberg'} />
				<ListTitle title={'LH – Lundehus Kirke, Østerbro'} />
				<ListTitle title={'TR – Trinitatis Kirke, København'} />
			</View>
		</Layout>
	)
}

export default Medvirkende
