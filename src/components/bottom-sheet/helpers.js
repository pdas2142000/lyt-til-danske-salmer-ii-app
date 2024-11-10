// Function to close the bottom sheet modal
// Parameters:
// - bottomSheetModalRef: Reference to the bottom sheet modal
// - SetSearchText: Function to set the search text state
// - SetScrollIndex: Function to set the scroll index state
// - onModalClose: Callback function to notify parent that the modal has closed
export const ModalClose = (bottomSheetModalRef, SetSearchText, SetScrollIndex, onModalClose) => {
    bottomSheetModalRef.current?.dismiss()
    // Reset fields
    SetSearchText('')
    SetScrollIndex(0)
    // Report to parent that popup has closed
    onModalClose()
}

// Function to filter the list based on the search text
// Parameters:
// - txt: Search text
// - BsContent: Original list to filter
// - SetFilteredList: Function to set the filtered list state
// - SetSearchText: Function to set the search text state
export const SearchList = (txt, BsContent, SetFilteredList, SetSearchText) => {
    let temp = [...BsContent]
    if (txt) {
        temp = temp.filter(item => {
            return item.label.toLowerCase().includes(txt.toLowerCase())
        })
        SetFilteredList(temp)
    } else {
        SetFilteredList(temp)
    }
    SetSearchText(txt)
}

// Function to open the bottom sheet modal
// Parameters:
// - bottomSheetModalRef: Reference to the bottom sheet modal
export const ModalOpen = (bottomSheetModalRef) => {
    bottomSheetModalRef.current?.present()
}
