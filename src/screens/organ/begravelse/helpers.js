/**Local Import */
import { makeRequest } from "../../../utils/make-request";

export const LoadSongs = async (reload, setRequestLoading, setRequestLoaded, setData, userData) => {
    try {
        if (reload) {
            setRequestLoading(true);
        }
        let resp = await makeRequest(
            'GET',
            `songs/organ/Begravelse`,
            {},
            userData && userData.token ? userData.token : null,
        );
        if (resp.error == 1) {
            let newdata = [];
            for (let i = 0; i < resp.data.length; i++) {
                let newobj = { ...resp.data[i] };
                newobj.songtype = 'organ';
                newdata.push(newobj);
            }
            setData(newdata);
        }
        setRequestLoaded(true);
        setRequestLoading(false);
    } catch (err) {
        setRequestLoading(false);
        console.log('Trosbekendelse', err);
    }
};
