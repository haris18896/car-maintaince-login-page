import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { showToast } from '../../utils/common';

export const getVhicleForm = createAsyncThunk('vhecileForm', async () => {
 try {
  const result = await axiosInstance.get(`/vehicle/form`);
  return result?.data?.form;
 } catch (error) {
  return error.response;
 }
});
export const addVehicle = createAsyncThunk('/add/vehicle', async (data) => {
 try {
  const result = await axiosInstance.post(`/vehicle`, data);
  return result?.data?.data;
 } catch (error) {
  return error.response;
 }
});

export const getSignupForm = createAsyncThunk('/user/form', async () => {
 try {
  const result = await axiosInstance.get(
   `/user/form/customer?formtype=customer-signup`
  );
  return result?.data?.form;
 } catch (error) {
  return error.response;
 }
});
export const updateUser = createAsyncThunk(
 '/driver/profile',
 async ({ data, id }) => {
  try {
    console.log('updating user', data, id)
   const result = await axiosInstance.put(`/driver/profile/${id}`, data);
   return result?.data?.data;
  } catch (error) {
   showToast('Error!', error);
   return error;
  }
 }
);

export const registerUser = createAsyncThunk('/register/user', async (data) => {
 try {
  const result = await axiosInstance.post(`/user`, data);
  return result?.data?.data;
 } catch (error) {
  showToast('Error!', error, 'error');
  return error;
 }
});
