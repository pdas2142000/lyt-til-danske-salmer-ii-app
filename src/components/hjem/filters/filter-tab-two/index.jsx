/**React Imports */
import React, {useState, useContext} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

/**Libraries */
import {useTheme} from '@react-navigation/native'
import Collapsible from 'react-native-collapsible'
import {getDeviceType} from 'react-native-device-info'
import EStyleSheet from 'react-native-extended-stylesheet'

/**Local Imports */
import { TEXT_ONE_OPTIONS, TEXT_TWO_OPTIONS } from './helpers'

/**Components */
import { SelectionBox } from '../../../common/select-box'
import TextStyles from '../../../../screens/styles/text-block'

let deviceType = getDeviceType()

/**Main Export */
const FilterTabTwo = ({OpenBottomSheet, SearchValues, ResetSearchOption}) => {

  const {colors} = useTheme()
  const [ViewMore, SetViewMore] = useState(true)
  const [TextOne, SetTextOne] = useState(TEXT_ONE_OPTIONS)
  const [TextTwo, SetTextTwo] = useState(TEXT_TWO_OPTIONS)

	return (
		<View style={styles.Filters_Options}>
			<View style={styles.Text_Block}>
				<Text style={[TextStyles.Text, {color: colors.text}]}>
					Det virker så enkelt – man går i kirke søndag formiddag, Højmessen
					indledes med et præludium, man synger et par salmer, hører en motet,
					synger et par salmer mere, og det hele afsluttes med at organisten
					spiller et postludium.
				</Text>
				<Text style={[TextStyles.Text, {color: colors.text}]}>
					Det kan da ikke være så svært at vælge to orgelstykker, fem-syv salmer
					og en motet. Enhver præst og organist ved dog, at virkeligheden ikke
					er helt så lige til.
				</Text>
				<Collapsible collapsed={ViewMore}>
				<>
					<Text style={[TextStyles.Text, {color: colors.text}]}>
						Når man som kirkegænger går hjem fra en Højmesse med fornemmelsen
						af, at det hele hang sammen, eller måske rettere uden at noget
						stak ud, er man sjældent klar over, hvor mange tanker præst og
						organist har været igennem for at skabe en rød tråd gennem hele
						gudstjenesten.
					</Text>
					<Text style={[TextStyles.Text, {color: colors.text}]}>
						Salme- og musikvalg til en Højmesse skal tilpasses dagens tekster,
						præstens bønner og tanker i prædikenen, kirkens rum, orglets
						størrelse, antal og konstellation af sangere og i hvilken
						sværhedsgrad de kan synge, om motetten skal være på dansk, om man
						kan bruge latinske tekster eller tekster på andre sprog.
					</Text>
					<Text style={[TextStyles.Text, {color: colors.text}]}>
						Melodivalg til salmerne skal også overvejes kender menigheden
						melodien? Skal melodierne altid tilpasses menighedens ønsker?
						Eller skal den en gang imellem udfordres, så man lærer en ny
						melodi til en tekst, man allerede kender godt?
					</Text>
					<Text style={[TextStyles.Text, {color: colors.text}]}>
						Hertil kommer endnu en overvejelse for præsten og organisten at
						gøre sig over samspillet mellem musik og tekster. Anser man nemlig
						gudstjenesten for et liturgisk og ritualiseret møde mellem Gud og
						menneske, hvori det enkelte menneske, gennem gudstjenestens almene
						tale til og om mennesket, kan finde rum og genklang for sit
						personlige liv, er det i høj grad musikken, der stemmer sindet til
						dette møde og som danner resonansbund for det. Derfor indledes
						gudstjenesten med orgelmusik – og ikke med ord! Og derfor må
						salmernes melodier og tekster sammen reflektere dette møde på en
						måde, så de lægger stemning, følelser og ord til en samtale mellem
						Gud og menneske om taknemmelighed, glæde, sorg, tro, tvivl, angst,
						udvejsløshed, længsel, kærlighed, frustrationer og alt andet
						menneskeligt, som findes spredt og ofte kaotisk i det daglige, og
						som man tager med ind i gudstjenesten.
					</Text>
					<Text style={[TextStyles.Text, {color: colors.text}]}>
						Der er med andre ord en hel del, der skal overvejes og passe
						sammen.
					</Text>
				</>
				</Collapsible>
				<TouchableOpacity onPress={() => SetViewMore(!ViewMore)}>
					<Text style={[styles.Link, {color: colors.primary}]}>
						Vis {ViewMore ? 'mere' : 'mindre'}
					</Text>
				</TouchableOpacity>
				<Text style={[TextStyles.Text, {color: colors.text}]}>
					Kirkemusikalsk Kompetencecenter (kmkc) har bedt forskellige præster og
					organister om at gøre sig nogle overvejelser i forhold til salmevalg.
					Sammen har de skrevet nogle teologiske refleksioner og tanker om musik
					til alle årets helligdage, til begge tekstrækker og giver i fællesskab
					forslag til salmer fra Den Danske Salmebog.
				</Text>
				<Text style={[TextStyles.Text, {color: colors.text}]}>
					Nedenfor er der adgang til kirkeårets helligdage og tekstrækker med
					spillelister indeholdende de givne salmeforslag til alle helligdage.
				</Text>
				<Text style={[TextStyles.Text, {color: colors.text}]}>
					Vi har valgt at lægge alle melodivarianter af de foreslåede salmer på
					listerne.
				</Text>
			</View>
			<View style={styles.Form_Wrap}>
				<SelectionBox
					Heading={'1. Tekstrække'}
					OnClick={() => {
						OpenBottomSheet({
						data: TEXT_ONE_OPTIONS,
						text: '1. Tekstrække',
						heading: 'Text_one',
						})
					}}
					PlaceHolder={'Vælg Tekstrække'}
					SelctedValue={
						SearchValues.Text_one
						? TEXT_ONE_OPTIONS.find(
							val => val.value === SearchValues.Text_one,
							).label
						: null
					}
					OnCancel={() => {
						ResetSearchOption('Text_one')
					}}
				/>
				<SelectionBox
					Heading={'2. Tekstrække'}
					OnClick={() => {
						OpenBottomSheet({
						data: TEXT_TWO_OPTIONS,
						text: '2. Tekstrække',
						heading: 'Text_two',
						})
					}}
					PlaceHolder={'Vælg Tekstrække'}
					SelctedValue={
						SearchValues.Text_two
						? TEXT_TWO_OPTIONS.find(
							val => val.value === SearchValues.Text_two,
							).label
						: null
					}
					OnCancel={() => {
						ResetSearchOption('Text_two')
					}}
				/>
			</View>
		</View>
	)
}

const styles = EStyleSheet.create({
	Filters_Options: {
		marginTop: deviceType === 'Tablet' ? '14rem' : '20rem',
	},
	Form_Grp: {
		marginBottom: deviceType === 'Tablet' ? '10rem' : '14rem',
	},
	Label: {
		fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
		fontFamily: 'Sen-Bold',
		paddingBottom: deviceType === 'Tablet' ? '3.5rem' : '5rem',
	},
	Form_Control: {
		borderRadius: deviceType === 'Tablet' ? '5rem' : '8rem',
		paddingVertical: deviceType === 'Tablet' ? '8.5rem' : '12rem',
		paddingHorizontal: deviceType === 'Tablet' ? '11rem' : '16rem',
	},
	Form_Control_Text: {
		fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
		fontFamily: 'Sen-Regular',
	},
	TextBlock: {
		marginTop: deviceType === 'Tablet' ? '7rem' : '10rem',
	},
	Link: {
		flex: 1,
		fontFamily: 'Sen-Regular',
		fontSize: deviceType === 'Tablet' ? '12rem' : '18rem',
		lineHeight: deviceType === 'Tablet' ? '17.5rem' : '25rem',
		marginBottom: deviceType === 'Tablet' ? '8rem' : '12rem',
		letterSpacing: -0.35,
	},
  })

export default FilterTabTwo

