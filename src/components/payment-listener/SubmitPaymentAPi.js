import {finishTransaction} from 'react-native-iap';
import {Platform} from 'react-native';
import {BASE_URL} from '../../constants/url';

export const SubmitRestore = async (purchase, token) => {
  try {
    let responseOfApi = await fetch(`${BASE_URL.url}/iap/user-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? {Authorization: `Bearer ${token}`} : {}),
        'Accept-Language': 'da',
      },
      body: JSON.stringify({
        transactionReceipt: purchase.transactionReceipt,
        packageName: 'dk.lyttildanskesalmer.app',
        productId: purchase.productId,
        ...(purchase.purchaseToken && {purchaseToken: purchase.purchaseToken}),
        subscription: true,
        appType: Platform.OS == 'android' ? 'android' : 'ios',
      }),
    });

    const ResponseData = await responseOfApi.json();
    // console.log(ResponseData,"ResponseData")
    if (ResponseData.error == 1) {
      console.log(ResponseData, 'ResponseData.error');
      let result = await finishTransaction({purchase, isConsumable: false});

      console.log(result, 'result');
      return true;
      // console.log(response,"response")
    } else {
      return false;
    }
  } catch (error) {
    console.log('SubmitRestore error', error);
    return false;
  }
};
