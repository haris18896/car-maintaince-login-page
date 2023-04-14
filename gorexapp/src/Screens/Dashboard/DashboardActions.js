import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

export const getBranches = createAsyncThunk('/branch', async () => {
  try {
    const result = await axiosInstance.get(`/branch`);
    return result?.data?.data;
  } catch (error) {
    return error.response;
  }
});
export const getBranchesByFilter = createAsyncThunk(
  '/branch/service-type',
  async ({id, lat, lon}) => {
    try {
      const result = await axiosInstance.get(
        `/branch/service-type/${id}/${lat}/${lon}`,
      );

      return result?.data?.data;
    } catch (error) {
      return error.response;
    }
  },
);
