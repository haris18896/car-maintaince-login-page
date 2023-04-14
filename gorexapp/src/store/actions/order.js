import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { showToast } from '../../utils/common';

export const getVehicle = createAsyncThunk('/vehicle/user/', async () => {
 try {
  const result = await axiosInstance.get(`/vehicle`);
  return result?.data?.data;
 } catch (error) {
  showToast('Error', error, 'error');
  return error;
 }
});
export const createOrder = createAsyncThunk('/customer/order', async (data) => {
 try {
  const result = await axiosInstance.post(`/customer/order`, data);
  return result?.data?.data;
 } catch (error) {
  showToast('Error', error, 'error');
  return { error };
 }
});
export const getOrders = createAsyncThunk('/customer/order', async () => {
 try {
  const result = await axiosInstance.get(`/customer/order?merchant=merchant`);
  return result?.data?.data;
 } catch (error) {
  showToast('Error', error, 'error');
  return { error };
 }
});
export const orderDetails = createAsyncThunk('/order', async (id) => {
 try {
  const result = await axiosInstance.get(`/order/${id}`);
  return result?.data?.data;
 } catch (error) {
  showToast('Error', error, 'error');
  return { error };
 }
});

export const changeOrderStatus = createAsyncThunk(
 '/customer/order/status',
 async ({ id, status }) => {
  try {
   const result = await axiosInstance.put(`/customer/order/${id}`, {
    status: status,
   });
   return result?.data;
  } catch (error) {
   showToast('Error', error, 'error');
   return { error };
  }
 }
);
