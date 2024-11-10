/**React Imports */
import React, {useRef, useEffect, useMemo, useState, useCallback} from 'react'
import {View, Text, TouchableOpacity, TextInput} from 'react-native'

/**Libraries */
import {BottomSheetModal} from '@gorhom/bottom-sheet'
import {useTheme} from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler'

/**Components */
import { SearchTextInput } from '../common/search-text-input'

/**Local Imports */
import { ModalClose, ModalOpen, SearchList } from './helpers'

/**Styles */
import styles from '../../components/layout/styles'

/**Main Export */
const BottomSheet = ({
	onModalClose,
	BsContent,
	RenderContent,
	isModalOpen,
	OnItemSelect,
}) => {

    const bottomSheetModalRef = useRef(null)
    const {colors} = useTheme()
    const scrollRef = useRef(null)
    const snapPoints = useMemo(() => ['70%'], [])
    const [ScrollIndex, SetScrollIndex] = useState(0)
    const [SearchText, SetSearchText] = useState('')
    const [FilteredList, SetFilteredList] = useState([])
	
    useEffect(() => {
        if (Array.isArray(BsContent)) {
        SetFilteredList(BsContent)
        }
    }, [BsContent])

	useEffect(() => {
        if (isModalOpen) {
            ModalOpen(bottomSheetModalRef)
        } else {
            ModalClose(bottomSheetModalRef, SetSearchText, SetScrollIndex, onModalClose)
        }
    }, [isModalOpen])

	return (
		<>
			{isModalOpen ? <View style={styles.Overlay} /> : null}
			<View style={styles.BottomSheet}>
				<BottomSheetModal
					ref={bottomSheetModalRef}
					snapPoints={snapPoints}
					onChange={index => {
						if (index === -1) {
						// SetBsContent(null)
							ModalClose(bottomSheetModalRef, SetSearchText, SetScrollIndex, onModalClose)
						} else {
						// scrollRef.current.scrollTo({x: 0, y: ScrollIndex})
						}
					}}
					enablePanDownToClose={true}
					animateOnMount={true}
					backgroundStyle={{
						backgroundColor: colors.background,
					}}
					>
					<View style={[styles.BottomSheetWrap,{backgroundColor: colors.background}]}>
						<View style={styles.Title_wrap}>
							<Text style={[styles.Title, {color: colors.text}]}>
								{RenderContent ? RenderContent.text : ''}
							</Text>
						</View>
						<SearchTextInput
							SearchText={SearchText}
							OnTextChange={txt => {
								SearchList(txt, BsContent, SetFilteredList, SetSearchText)
							}}
						/>
						<FlatList
							keyExtractor={item => item.value.toString()}
							data={FilteredList}
							ListEmptyComponent={() => {
							return (
								<View style={styles.Error_Wrap}>
									<Text
										style={[styles.Error_Wrap_Text, {color: colors.text}]}>
										No Results Founds
									</Text>
								</View>
							)
							}}
							renderItem={({item, index}) => {
							return (
								<TouchableOpacity
									key={item.value}
									style={[
										styles.List_Item,
										{backgroundColor: colors.background,},
									]}
									onPress={() => {
										// RenderContent.SetData(temp)
										OnItemSelect(item, RenderContent.heading)
										ModalClose(bottomSheetModalRef, SetSearchText, SetScrollIndex, onModalClose)
									}}
								>
								<Text
									style={[
									styles.Item_Label,
									{color: colors.text,},
									]}
									numberOfLines={1}
									ellipsizeMode="tail"
								>
									{item.label}
								</Text>
								</TouchableOpacity>
							)
							}}
							extraData={FilteredList}
						/>
						<View style={styles.Buttons_wrap}>
							<TouchableOpacity
								style={[
									styles.Btn_Wrap,
									{backgroundColor: colors.lighterBackground},
								]}
								onPress={() => ModalClose(bottomSheetModalRef, SetSearchText, SetScrollIndex, onModalClose)}
							>
								<Text style={[styles.Btn_Text, {color: colors.text}]}>
									Annuller
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</BottomSheetModal>
			</View>
		</>
	)
}

export default BottomSheet
