import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

export const getBranchDetails = createAsyncThunk(
  '/branch/details',
  async id => {
    try {
      const result = await axiosInstance.get(`/branch/${id}`);
      return result?.data?.data;
    } catch (error) {
      return error.response;
    }
  },
);

export const getCategories = createAsyncThunk(
  '/product/categories/branch',
  async id => {
    try {
      const result = await axiosInstance.get(
        `/product/categories/branch/${id}`,
      );

      return result?.data?.data;
    } catch (error) {
      return error.response;
    }
  },
);

export const getProducts = createAsyncThunk(
  '/product',
  async ({branch, category}) => {
    try {
      const result = await axiosInstance.get(
        `/product/branch/${branch}/category/${category}`,
      );

      return result?.data;
    } catch (error) {
      return error.response;
    }
  },
);
export const getServiceTypes = createAsyncThunk('/servicetype', async () => {
  try {
    const result = await axiosInstance.get(`/servicetype`);

    return result?.data;
  } catch (error) {
    return error.response;
  }
});
export const getServiceTypesByBranch = createAsyncThunk(
  '/servicetypeByBranch',
  async id => {
    try {
      const result = await axiosInstance.get(
        `/service/service-types/branch/${id}`,
      );
      console.log('service type branch', result);

      return result?.data;
    } catch (error) {
      console.log('service type error' ,error, id);
      return error.response;
    }
  },
);
export const getServices = createAsyncThunk(
  '/service',
  async ({branch, servicetype}) => {
    try {
      const result = await axiosInstance.get(
        `/service/branch/${branch}/servicetype/${servicetype}`,
      );

      return result?.data;
    } catch (error) {
      return error.response;
    }
  },
);
