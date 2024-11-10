// Array defining sorting options for a specific application
export const SORT_OPTIONS = [
	{
		id: '01',
		label: 'Titel',
		selected: true,
		value: 'title',
	},
	{
		id: '02',
		label: 'Salmenummer',
		selected: false,
		value: 'number',
	},
	{
		id: '03',
		label: 'Komponistnavn',
		selected: false,
		value: 'composer_lastname_firstname',
	},
	{
		id: '04',
		label: 'Forfatternavn',
		selected: false,
		value: 'author_lastname_firstname',
	},
]

// Function to handle selecting an item from the Sorter list
export const SelectItem = (id, Sorter, SetSorter, SetSearchValues) => {
    // Create a copy of Sorter array
    var temp = [...Sorter]
    // Iterate over each item in the temp array
    temp.map(val => {
        // Check if the ID of the current item matches the selected ID
        if (val.id === id) {
            // Set the 'selected' property of the current item to true
            val.selected = true
            // If the item is selected, update the SortBy value in SearchValues state
            if (val.selected) {
                SetSearchValues(prev => {
                    return {...prev, SortBy: val.value}
                })
            } else {
                // If the item is not selected, it can be reset if needed
                // ResetSearchOption('SortBy')
            }
        } else {
            // If the ID doesn't match, set 'selected' property to false
            val.selected = false
        }
        // Return the modified val
        return val
    })
    // Update the Sorter state with the modified temp array
    SetSorter(temp)
}
