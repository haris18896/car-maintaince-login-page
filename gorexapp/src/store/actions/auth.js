import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { getUser, showToast } from '../../utils/common';

export const loginAction = createAsyncThunk('/auth/login', async (data) => {
 try {
  const result = await axiosInstance.post(
   `/auth/login?type=${data?.type}`,
   data
  );
  return result?.data?.data;
 } catch (error) {
  showToast('Error', error, 'error');
  return error;
 }
});

export const loginForm = createAsyncThunk('/auth/form/login', async () => {
 try {
  const result = await axiosInstance.get(`/auth/form/login`);
  console.log('login result', result?.data?.form);
  return result?.data?.form;
 } catch (error) {
  console.log('error', error);
  return error.response;
 }
});

export const sendPasswordAction = createAsyncThunk(
 '/user/forgot-password',
 async (data) => {
  try {
   const result = await axiosInstance.post(`/user/forgot-password`, data);
   return result?.data?.data;
  } catch (error) {
   showToast('Error', error, 'error');
   return error;
  }
 }
);

export const getProfile = createAsyncThunk('/profile/user', async () => {
 try {
  const user = await getUser();
  const result = await axiosInstance.get(`/user?id=${user.id}`);
  return result?.data?.data;
 } catch (error) {
  showToast('Error', error, 'error');
  return error;
 }
});

export const deleteAccount = createAsyncThunk('/profile/delete', async () => {
 try {
  const user = await getUser();
  console.log('user in delete action : ', user);
  console.log(`/user/de-active/${user?.id}`);
  const result = await axiosInstance.get(`/user/de-active/${user?.id}`);
  console.log('result de-active', result);

  return result?.data;
 } catch (error) {
    console.log('error in delete account', error);
  showToast('Error', error, 'error');
  return error;
 }
});

export const changePassword = createAsyncThunk(
 '/user/password',
 async (data) => {
  try {
   const user = await getUser();
   const result = await axiosInstance.put(`/user/${user?.id}/password`, data);

   return result?.data;
  } catch (error) {
   showToast('Error', error, 'error');
   return error;
  }
 }
);

export const logout = createAsyncThunk('/logout', async () => {
 return 'logout';
});
