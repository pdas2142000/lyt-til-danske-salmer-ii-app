/**Local Imports */
import { makeRequest } from "../../../utils/make-request"

/**
 * LoadSongs function to fetch and process song data.
 *
 * @param {boolean} reload - Flag to determine if the request is a reload.
 * @param {function} SetRequestLoading - Function to update the loading state.
 * @param {function} SetData - Function to update the data state.
 * @param {function} SetRequestLoaded - Function to update the loaded state.
 */
export const LoadSongs = async (reload, SetRequestLoading, SetData, SetRequestLoaded) => {
    try {
        // If reload is true, set the request loading state to true
        if (reload) {
            SetRequestLoading(true)
        }

        // Make the API request to fetch the songs
        let resp = await makeRequest('GET', `songs/rituals/TROSBEKENDELSE`, {})

        // If the response contains an error code of 1, process the data
        if (resp.error == 1) {
            let newdata = []

            // Iterate through the response data and add a canPlay property to each item
            for (let i = 0; i < resp.data.length; i++) {
                let newobj = { ...resp.data[i] }
                newobj.canPlay = true
                newdata.push(newobj)
            }

            // Update the data state with the new processed data
            SetData(newdata)
        }

        // Set the request loaded state to true and request loading state to false
        SetRequestLoaded(true)
        SetRequestLoading(false)
    } catch (err) {
        // In case of an error, set the request loading state to false and log the error
        SetRequestLoading(false)
        console.log('Trosbekendelse', err)
    }
}
