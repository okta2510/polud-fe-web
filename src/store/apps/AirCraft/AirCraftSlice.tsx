import axios from '@/utils/axios';
import { filter, map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '@/store/store';

const API_URL = '/api/data/aircraft';

interface StateType {
  aircraft: any[];
  aircraftSearch: string;
  sortBy: string;
  total: number;
  filters: {
    id: string;
  };
  error: string;
}

const initialState = {
  aircraft: [],
  aircraftSearch: '',
  sortBy: 'newest',
  total: 0,
  filters: {
    id: 'All',
  },
  error: '',
};

export const AirCraftSlice = createSlice({
  name: 'aircraft',
  initialState,
  reducers: {
    // HAS ERROR

    hasError(state: StateType, action) {
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProducts: (state, action) => {
      state.aircraft = action.payload;
    },
    
    SearchProduct: (state, action) => {
      state.aircraftSearch = action.payload;
    },

    //  SORT  PRODUCTS
    sortBy(state, action) {
      state.sortBy = action.payload;
    },
    filterAircraft(state, action) {
      state.filters.id = action.payload.id;
    },

    filterReset(state) {
      state.filters.id = 'All';
      state.sortBy = 'newest';
    },
  },
});
export const {
  hasError,
  getProducts,
  SearchProduct,
  sortBy,
  filterAircraft,
  filterReset,
} = AirCraftSlice.actions;

export const fetchAirCraft = () => async (dispatch: AppDispatch) => {
  try {
    const cachedData = localStorage.getItem('aircraftData');
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      if (parsedData && parsedData.length > 0) {
        // If data exists, directly dispatch it
        dispatch(getProducts(parsedData));
        return;
      }
    }

    const response = await axios.get(`${API_URL}`);
    localStorage.setItem('aircraftData', JSON.stringify(response.data)); // Cache data in localStorage
    dispatch(getProducts(response.data));
  } catch (error) {
    dispatch(hasError(error));
  }
};

export default AirCraftSlice.reducer;
