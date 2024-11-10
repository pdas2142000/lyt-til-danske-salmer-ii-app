import AsyncStorage from '@react-native-async-storage/async-storage';
export const SavaDataToLocal = async (key, data) => {
  try {
    let result = await AsyncStorage.setItem(key, JSON.stringify(data));
    return result;
  } catch (err) {
    console.log('failed to save in local', err, key, data);
    return false;
  }
};

export const GetDataFromLocal = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  } catch (err) {
    console.log('failed to get from local', err, key);
    return null;
  }
};

export const ClearDataOfKey = async key => {
  try {
    let result = await AsyncStorage.removeItem(key);
    return result;
  } catch (err) {
    console.log('failed to delete key', err, key);
    return false;
  }
};

export const ClearLocal = async () => {
  try {
    let result = await AsyncStorage.clear();
    return result;
  } catch (err) {
    console.log('failed to clear all', err);
    return false;
  }
};

export const Storage_Keys = {
  USER_STORAGE_KEY: '@USER_INFO',
  USER_SEARCH_OPTIONS: '@SEARCH_OPTIONS',
};
