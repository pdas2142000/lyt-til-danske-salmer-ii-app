/**React Imports */
import React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import {Linking} from 'react-native'

/**Libraries */
import {useTheme} from '@react-navigation/native'

/**Components */
import Layout from '../../../components/layout'

/**Styles */
import styles from '../../styles/text-block'

/**Main Export */
const Rettigheder = ({navigation}) => {
	const {colors} = useTheme()
	return (
		<Layout {...{title: 'Rettigheder', navigation}}>
			<View style={styles.TextBlock}>
				<Text style={[styles.Text, {color: colors.text}]}>
					Alle rettighedshavende komponister tilgodeses via aftale med
				</Text>
				<TouchableOpacity onPress={() => Linking.openURL('https://koda.dk')}>
					<Text style={[styles.Text, styles.Text_Link, {color: colors.primary}]}>
						KODA
					</Text>
				</TouchableOpacity>
			</View>
		</Layout>
	)
}

export default Rettigheder
