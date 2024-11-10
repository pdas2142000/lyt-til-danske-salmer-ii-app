const qs = require('qs')
import { makeRequest } from '../../utils/make-request';
import { BASE_URL } from '../../constants/url';


export async function AUTH(method, path, data, header = {}) {
	
	try {
		const headers = {
			...header,
			'Accept-Language': 'da',
		};
	
		// Extract authToken from headers if it exists
		const authToken = headers.Authorization ? headers.Authorization.replace('Bearer ', '') : null;
	
		// Determine if data should be sent as queryParams or bodyRequest
		const bodyRequest = (method === 'POST' || method === 'PUT' || method === 'PATCH') ? data : null;
		const queryParams = (method === 'GET' || method === 'DELETE') ? data : {};
	
		const response = await makeRequest(method, path, queryParams, authToken, bodyRequest);
		// console.log("response", response);
		return response;
	  } catch (e) {
		console.log(e, 'network error');
		return { response: false, error: 0, msg: 'Network Failed' };
	  }
	
}

// export async function API(method, path, data, accessToken = null, header = {}) {
//   try {
//     let url = BASE_URL.url + `${path}`;
//     let headers = {
//       ...header,
//       'Accept-Language': 'da',
//     };
//     if (accessToken) {
//       headers.Authorization = 'Bearer ' + accessToken;
//     }
//     // console.log(url, method, path, data, accessToken,headers);
//     if (method.toUpperCase() == 'GET') {
//       // console.log(headers, data, url);
//       const response = await axios.get(url, {headers: headers, params: data});
//       // console.log(response);

//       return response.data;
//     } else {
//       const response = await axios({method, url, headers, data});
//       // console.log(response);
//       return response.data;
//     }
//   } catch (e) {
//     (e, 'network error ' + path);
//     //await AsyncStorage.removeItem(USER_STORAGE_KEY);
//     return {response: false, error: 0, msg: 'Network Failed'};
//   }
// }


export const Api = {
  baseurl: (headPoint, params) => {
    return `${BASE_URL.url}/${headPoint}${params && Object.keys(params).length ? `?${qs.stringify(params)}` : ''}`;
  },
};
