import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { hp } from './responsiveSizes';
import { Platform } from 'react-native';

export const getData = async () => {
 try {
  const jsonValue = await AsyncStorage.getItem('cart');
  return jsonValue != null ? JSON.parse(jsonValue) : null;
 } catch (e) {
  // error reading value
 }
};
export const getServicesData = async () => {
 try {
  const jsonValue = await AsyncStorage.getItem('services');
  return jsonValue != null ? JSON.parse(jsonValue) : null;
 } catch (e) {
  // error reading value
 }
};

export const setToken = async (data) => {
 try {
  const jsonValue = JSON.stringify(data);
  await AsyncStorage.setItem('tokens', jsonValue);
 } catch (e) {
  // error reading value
 }
};
export const removeToken = async () => {
 try {
  await AsyncStorage.removeItem('tokens');
 } catch (e) {
  // error reading value
 }
};

export const setUser = async (data) => {
 try {
  const jsonValue = JSON.stringify(data);
  await AsyncStorage.setItem('user', jsonValue);
 } catch (e) {
  // error reading value
 }
};

export const getUser = async () => {
 try {
  const jsonValue = await AsyncStorage.getItem('user');
  return jsonValue != null ? JSON.parse(jsonValue) : null;
 } catch (e) {
  // error reading value
 }
};
export const getToken = async () => {
 try {
  const jsonValue = await AsyncStorage.getItem('tokens');
  return jsonValue != null ? JSON.parse(jsonValue) : null;
 } catch (e) {
  // error reading value
 }
};

export const showToast = (
 title = 'title',
 message = 'message',
 type = 'success'
) => {
 Toast.show({
  type: type,
  text1: title,
  text2: message,
  topOffset: Platform.OS === 'ios' ? hp(50) : hp(15),
 });
};

export const groupBy = (objectArray, property) => {
 return objectArray.reduce(function (acc, obj) {
  var key = obj[property];
  if (!acc[key]) {
   acc[key] = [];
  }
  acc[key].push(obj);
  return acc;
 }, {});
};
