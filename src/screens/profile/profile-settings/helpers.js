// helpers.js

/**Libraries */
import ImagePicker from 'react-native-image-crop-picker'
import { openSettings } from 'react-native-permissions'

/**Local Imports */
import { BASE_URL } from '../../../constants/url'

/**Components */
import { ShowToast } from '../../../services/toast-message'

export const ChooseFromLibrary = async (setImg, UserData, ResponseFilter, UpdateUser) => {
    try {
        ImagePicker.openPicker({
            height: 800,
            width: 800,
            cropping: true,
            compressImageQuality: 0.7,
        })
        .then(async image => {
            // Set the selected image in the state
            setImg(image);

            // Call UpdateProfileImage to update the profile image
            await UpdateProfileImage(image, UserData, ResponseFilter, UpdateUser);
        })
        .catch(err => {
            console.log('permission error', err.message)
            // If permission is denied, prompt the user to open settings
            if (
                err.message ==
                'Cannot access images. Please allow access if you want to be able to select images.'
            ) {
                openSettings()
            }
        })
    } catch (error) {
        console.log('Error selecting image:', error)
    }
}


export const UpdateProfileImage = async (Img, UserData, ResponseFilter, UpdateUser) => {
    console.log("testing")
    
    try {
        // Create form data for updating profile
        const formData = new FormData();
        // Append image data if available
        if (Img != null) {
            let ImageName = Img.path.split('/');
            ImageName = ImageName[ImageName.length - 1];
            let imageType = Img.mime.split('/');
            let endType = imageType[imageType.length - 1] ? imageType[imageType.length - 1] : 'jpg';
            formData.append('image', {
                name: ImageName ? ImageName : 'profile.' + endType,
                type: Img.mime,
                uri: Img.path,
                size: Img.size,
            });
        }

        // Update user profile via API call
        let resp = await fetch(BASE_URL.url + `/update-profile`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + UserData?.token,
                'Accept-Language': 'da',
            },
            body: formData,
        });
        
        let response = await resp.json();
        
        // Filter response data
        response = ResponseFilter(response);
        // Handle response based on error status
        if (response.error == 1) {
            // If there is an error, show toast message and update user data
            ShowToast(response.msg);
            UpdateUser(response); // Assuming UpdateUser is defined elsewhere
        } else {
            // If there is no error, show error toast message
            ShowToast(response.msg, 'error');
        }
    } catch (err) {
        // Catch and handle errors
        console.log(err, 'error on update profile');
        return null;
    }
}


export const UpdateProfile = async (Fields, UserData, navigation, setloading, ResponseFilter, UpdateUser) => {
    try {
        // Validate user input fields
        if (Fields.firstName.length < 2) {
            //Require_translation
            ShowToast('Skriv et korrekt fornavn', 'error');
            return;
        }
        if (Fields.lastName.length < 2) {
            //Require_translation
            ShowToast('Skriv et korrekt efternavn', 'error');
            return;
        }
        if (Fields.email.length < 2) {
            //Require_translation
            ShowToast('Skriv en korrekt emailadresse', 'error');
            return;
        }
        // Set loading state to true
        setloading(true);
        // Create form data for updating profile
        const formData = new FormData();
        formData.append('first_name', Fields.firstName);
        formData.append('last_name', Fields.lastName);
        formData.append('email', Fields.email);
        // Update user profile via API call
        let resp = await fetch(BASE_URL.url + `/user-profile`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + UserData.token,
                'Accept-Language': 'da',
            },
            body: formData,
        });
        let response = await resp.json();
        // Filter response data
        response = ResponseFilter(response);
        if (!response) {
            // If response is empty, navigate back and return
            setloading(false);
            navigation.goBack();
            return;
        }
        // Handle response based on error status
        if (response.error == 1) {
            // If there is an error, show toast message and update user data
            ShowToast(response.msg);
            UpdateUser(response); // Assuming UpdateUser is defined elsewhere
        } else {
            // If there is no error, show error toast message
            ShowToast(response.msg, 'error');
        }
        // Set loading state to false
        setloading(false);
    } catch (err) {
        // Catch and handle errors
        setloading(false);
        console.log(err, 'error on update profile');
    }
}

