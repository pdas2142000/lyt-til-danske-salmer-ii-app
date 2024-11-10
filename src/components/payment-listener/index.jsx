/**React Imports */
import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {BASE_URL} from '../../constants/url';
import {SubmitRestore} from './SubmitPaymentAPi';

/**Libraries */
import {
  purchaseErrorListener,
  purchaseUpdatedListener,
  initConnection,
  finishTransaction,
  flushFailedPurchasesCachedAsPendingAndroid,
} from 'react-native-iap';

let apicalled = false;
/**Local Imports */
import {GetDataFromLocal, Storage_Keys} from '../../utils/storage';

/**MaiN Export */
export const PaymentListener = ({onCloseModal}) => {
  useEffect(() => {
    let purchaseUpdateSubscription = null,
      purchaseErrorSubscription = null;
    initConnection()
      .then(async () => {
        // we make sure that "ghost" pending payment are removed
        // (ghost = failed pending payment that are still marked as pending in Google's native Vending module cache)
        if (Platform.OS == 'android') {
          await flushFailedPurchasesCachedAsPendingAndroid();
        }

        purchaseUpdateSubscription = purchaseUpdatedListener(async purchase => {
          try {
            // console.log('purchaseUpdatedListener', purchase)
            const receipt = purchase.transactionReceipt;
            if (receipt) {
              let Userdata = await GetDataFromLocal(
                Storage_Keys.USER_STORAGE_KEY,
              );
              // console.log('userdataListener', Userdata)
              if (Userdata.token && apicalled === false) {
                apicalled = true;
                const apiResult = await SubmitRestore(purchase, Userdata.token);
                if (apiResult) {
                  onCloseModal(true)
                  let result = await finishTransaction({
                    purchase,
                    isConsumable: false,
                  });
                  apicalled =false
                  console.log(result, 'result');
                }
                // // console.log(response,"response")
                // }
                onCloseModal(false)
              } else {
                console.log('user not present or already requested');
              }
            }
          } catch (err) {
            console.log(err,"error at PaymentListener")
          }
        });

        purchaseErrorSubscription = purchaseErrorListener(error => {
          onCloseModal(false);
          console.log('purchaseErrorListener', error);
        });
      })
      .catch(console.log);
    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }
    };
  }, []);

  return null;
};
