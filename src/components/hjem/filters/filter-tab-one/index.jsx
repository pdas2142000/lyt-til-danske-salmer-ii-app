/**React Imports */
import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Keyboard,
} from 'react-native'

/**Libraries */
import {getDeviceType} from 'react-native-device-info'
import {useTheme} from '@react-navigation/native'
import Collapsible from 'react-native-collapsible'
import EStyleSheet from 'react-native-extended-stylesheet'

/**Components */
import { SelectionBox } from '../../../common/select-box'

/**Local Imports */
import { ms } from '../../../../utils/helpers/metrics'
import { Fonts } from '../../../../utils/constants'
import { IconProps } from '../../../../utils/helpers/iconprops'
import { SORT_OPTIONS,SelectItem } from './helpers'

/**Icons */
import ArrowRightIcon from '../../../../../assets/icons/right.svg'

let deviceType = getDeviceType()

const FilterTabOne = ({
	RequestNextPage,
	OnSearchPress,
	SearchValues,
	SetSearchValues,
	OpenBottomSheet,
	Options,
	ResetSearchOption,
}) => {

	const {colors} = useTheme()
	const [ShowMoreOptions, SetShowMoreOptions] = useState(false)
	const [KomponistOptions, SetKomponistOptions] = useState(
		Options && Options.composer ? Options.composer : [],
	)
	const [ForfatterOptions, SetForfatterOptions] = useState(
		Options && Options.author ? Options.author : [],
	)
	const [SalmekategoriOptions, SetSalmekategoriOptions] = useState(
		Options && Options.song_category ? Options.song_category : [],
	)
	const [SangerOptions, SetSangerOptions] = useState(
		Options && Options.singer ? Options.singer : [],
	)
	const [OrganistOptions, SetOrganistOptions] = useState(
		Options && Options.organist ? Options.organist : [],
	)
	const [KirkeOptions, SetKirkeOptions] = useState(
		Options && Options.church ? Options.church : [],
	)
	const [Sorter, SetSorter] = useState(SORT_OPTIONS)

	useEffect(() => {
		SetKomponistOptions(Options && Options.composer ? Options.composer : [])
		SetForfatterOptions(Options && Options.author ? Options.author : [])
		SetSalmekategoriOptions(
		Options && Options.song_category ? Options.song_category : [],
		)
		SetSangerOptions(Options && Options.singer ? Options.singer : [])
		SetOrganistOptions(Options && Options.organist ? Options.organist : [])
		SetKirkeOptions(Options && Options.church ? Options.church : [])
	}, [Options])

	return (
		<View style={styles.Filters_Options}>
			<View style={styles.Form_Grp}>
				<Text style={[styles.Text, {color: colors.text}]}>Titel</Text>
				<TextInput
					autoCapitalize="none"
					autoCorrect={false}
					style={[
						styles.Form_Control,
						{color: colors.text, backgroundColor: colors.lighterBackground},
					]}
					onSubmitEditing={() => {
						OnSearchPress({})
					}}
					placeholder="indtast titel..."
					returnKeyType={'search'}
					onChangeText={txt => {
						SetSearchValues(prev => {
						return {...prev, Title: txt}
						})
					}}
					value={SearchValues.Title}
					placeholderTextColor="rgba(0, 0, 0, 0.3)"
				/>
			</View>
			<View style={styles.Form_Grp}>
				<Text style={[styles.Text, {color: colors.text}]}>Salmenummer</Text>
				<TextInput
					autoCapitalize="none"
					autoCorrect={false}
					style={[
						styles.Form_Control,
						{color: colors.text, backgroundColor: colors.lighterBackground},
					]}
					keyboardType={'numbers-and-punctuation'}
					onSubmitEditing={() => {
						OnSearchPress({})
					}}
					returnKeyType={'search'}
					placeholder="indtast salmenummer"
					onChangeText={txt => {
						SetSearchValues(prev => {
						return {...prev, Hymn: txt}
						})
					}}
					value={SearchValues.Hymn}
					placeholderTextColor="rgba(0, 0, 0, 0.3)"
				/>
			</View>
			<View style={styles.Drop_Options}>
				<TouchableOpacity
					style={styles.Drop_Options_Btn}
					onPress={() => {
						SetSearchValues(prev => {
						return {...prev, isTabOpen: !ShowMoreOptions}
						})
						SetShowMoreOptions(!ShowMoreOptions)
					}}
				>
					<ArrowRightIcon
						{...IconProps(16)}
						style={[
							styles.Drop_Options_Icon,
							{color: colors.primary},
							{transform: [{rotate: ShowMoreOptions ? '90deg' : '0deg'}]},
						]}
					/>
					<Text style={[styles.Drop_Options_Text, {color: colors.primary}]}>
						{ShowMoreOptions ? 'Færre' : 'Flere'} muligheder
					</Text>
				</TouchableOpacity>
			</View>
			<Collapsible collapsed={!ShowMoreOptions}>
				<>
					<View style={[styles.Form_Grp_Title,{borderBottomColor: colors.primary + '80'},]}>
						<Text style={[styles.Form_Grp_Title_Text, {color: colors.text}]}>
							Filtrér indspilningerne efter:
						</Text>
					</View>
					<SelectionBox
						Heading={'Komponist'}
						OnClick={() => {
							OpenBottomSheet({
								data: KomponistOptions,
								text: 'Komponist',
								heading: 'Composer',
							})
						}}
						PlaceHolder={'Alle komponister'}
						SelctedValue={
						SearchValues.Composer ? KomponistOptions.find(val => val.value === SearchValues.Composer,).label: null}
						OnCancel={() => {ResetSearchOption('Composer')}}
					/>
					<SelectionBox
						Heading={'Forfatter'}
						OnClick={() => {
						OpenBottomSheet({
							data: ForfatterOptions,
							text: 'Forfatter',
							heading: 'Author',
						})
						}}
						PlaceHolder={'Alle forfattere'}
						SelctedValue={
						SearchValues.Author ? ForfatterOptions.find(val => val.value === SearchValues.Author,).label: null}
						OnCancel={() => {ResetSearchOption('Author')}}
					/>
					<SelectionBox
						Heading={'Salmekategori'}
						OnClick={() => {
						OpenBottomSheet({
							data: SalmekategoriOptions,
							text: 'Salmekategori',
							heading: 'SongCategory',
						})
						}}
						PlaceHolder={'Salmekategori'}
						SelctedValue={
						SearchValues.SongCategory ? SalmekategoriOptions.find(val => val.value === SearchValues.SongCategory,).label: null}
						OnCancel={() => {ResetSearchOption('SongCategory')}}
					/>
					<SelectionBox
						Heading={'Sanger'}
						OnClick={() => {
						OpenBottomSheet({
							data: SangerOptions,
							text: 'Sanger',
							heading: 'Singer',
						})
						}}
						PlaceHolder={'Sanger'}
						SelctedValue={
						SearchValues.Singer ? SangerOptions.find(val => val.value === SearchValues.Singer).label: null}
						OnCancel={() => {ResetSearchOption('Singer')}}
					/>
					<SelectionBox
						Heading={'Organist'}
						OnClick={() => {
						OpenBottomSheet({
							data: OrganistOptions,
							text: 'Organist',
							heading: 'Organist',
						})
						}}
						PlaceHolder={'Organist'}
						SelctedValue={SearchValues.Organist	? OrganistOptions.find(	val => val.value === SearchValues.Organist,).label: null}
						OnCancel={() => {ResetSearchOption('Organist')}}
					/>
					<SelectionBox
						Heading={'Kirke'}
						OnClick={() => {
						OpenBottomSheet({
							data: KirkeOptions,
							text: 'Kirke',
							heading: 'Church',
						})
						}}
						PlaceHolder={'Kirke'}
						SelctedValue={	SearchValues.Church ? KirkeOptions.find(val => val.value === SearchValues.Church).label	: null}
						OnCancel={() => {ResetSearchOption('Church')}}
					/>
					<View style={styles.Form_Grp}>
						<Text style={[styles.Label, {color: colors.text}]}>
							Sortér resultaterne efter
						</Text>
						<View style={styles.Radio_Wrap}>
							<FlatList
								numColumns={2}
								data={Sorter}
								renderItem={({item}) => {
								return (
									<TouchableOpacity
										style={[
											styles.Radio_Btn,
											{backgroundColor: colors.lighterBackground},
											{borderColor: item.selected ? colors.primary: colors.lighterBackground,	},
										]}
										key={item.id}
										onPress={() => SelectItem(item.id, Sorter, SetSorter, SetSearchValues)}
									>
										<Text
											style={[styles.Radio_Btn_Text, {color: colors.text}]}>
											{item.label}
										</Text>
									</TouchableOpacity>
								)
								}}
							/>
						</View>
					</View>
				</>
			</Collapsible>
			<TouchableOpacity
				disabled={RequestNextPage}
				style={styles.Submit_Btn}
				onPress={() => {Keyboard.dismiss(),OnSearchPress({})}}
			>
				<View
					style={[
						styles.Submit_Btn_wrap,
						{borderColor: colors.buttonBorder,backgroundColor: colors.buttonBackground,}
					]}
				>
				{RequestNextPage ? (
					<ActivityIndicator color={colors.buttonText} size={'small'} />
				) : (
					<Text style={[styles.Submit_Btn_Text, {color: colors.buttonText}]}>
						SØG NU
					</Text>
				)}
				</View>
			</TouchableOpacity>
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
	Form_Grp_Title: {
		paddingBottom: deviceType === 'Tablet' ? '7rem' : '10rem',
		marginTop: deviceType === 'Tablet' ? '7rem' : '10rem',
		marginBottom: deviceType === 'Tablet' ? '10rem' : '14rem',
		borderBottomWidth: 1,
	},
	Form_Grp_Title_Text: {
		fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
		fontFamily: 'Sen-Bold',
	},
	Text: {
		fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
		fontFamily: 'Sen-Bold',
		paddingBottom: deviceType === 'Tablet' ? '3.5rem' : '5rem',
	},
	Form_Control: {
		fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
		fontFamily: 'Sen-Regular',
		borderRadius: deviceType === 'Tablet' ? '5rem' : '8rem',
		paddingVertical: deviceType === 'Tablet' ? '8.5rem' : '12rem',
		paddingHorizontal: deviceType === 'Tablet' ? '11rem' : '16rem',
	},
	Label: {
		fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
		fontFamily: 'Sen-Bold',
		paddingBottom: deviceType === 'Tablet' ? '3.5rem' : '5rem',
	},
	Form_Button: {
		borderRadius: deviceType === 'Tablet' ? '5rem' : '8rem',
		paddingVertical: deviceType === 'Tablet' ? '8.5rem' : '12rem',
		paddingHorizontal: deviceType === 'Tablet' ? '11rem' : '16rem',
	},
	Form_Button_Text: {
		fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
		fontFamily: 'Sen-Regular',
	},
	Drop_Options: {
		marginBottom: deviceType === 'Tablet' ? '10rem' : '14rem',
	},
	Drop_Options_Btn: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	Drop_Options_Icon: {
		fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
		marginRight: deviceType === 'Tablet' ? '3.5rem' : '5rem',
	},
	Drop_Options_Text: {
		fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
		fontFamily: 'Sen-Bold',
	},
	Submit_Btn: {
		alignSelf: 'stretch',
	},
	Submit_Btn_wrap: {
		borderWidth: 1,
		borderRadius: deviceType === 'Tablet' ? '5rem' : '8rem',
		paddingVertical: deviceType === 'Tablet' ? '8.5rem' : '12rem',
		paddingHorizontal: deviceType === 'Tablet' ? '35rem' : '50rem',
	},
	Submit_Btn_Text: {
		fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
		fontFamily: 'Sen-Regular',
		textAlign: 'center',
	},
	Radio_Wrap: {},
	Radio_Btn: {
		flex: 1,
		borderRadius: deviceType === 'Tablet' ? '5rem' : '8rem',
		paddingVertical: deviceType === 'Tablet' ? '8.5rem' : '12rem',
		paddingHorizontal: deviceType === 'Tablet' ? '11rem' : '16rem',
		marginBottom: 8,
		marginRight: 8,
		borderWidth: 2,
	},
	Radio_Btn_Text: {
		fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
		fontFamily: 'Sen-Regular',
		textAlign: 'center',
	},
})

export default FilterTabOne
