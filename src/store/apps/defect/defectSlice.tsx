import axios from '@/utils/axios';
import { filter, map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '@/store/store';

const API_URL = '/api/data/defect';

interface StateType {
  defect: any[];
  defectSearch: string;
  sortBy: string;
  total: number;
  filters: {
    id: string;
  };
  error: string;
}

const initialState = {
  defect: [],
  defectSearch: '',
  sortBy: 'newest',
  total: 0,
  filters: {
    id: 'All',
  },
  error: '',
};

export const DefectSeriesSlice = createSlice({
  name: 'defect',
  initialState,
  reducers: {
    // HAS ERROR

    hasError(state: StateType, action) {
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProducts: (state, action) => {
      state.defect = action.payload;
    },
    
    SearchProduct: (state, action) => {
      state.defectSearch = action.payload;
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
} = DefectSeriesSlice.actions;

export const fetchDefect = () => async (dispatch: AppDispatch) => {
  try {
    const cachedData = localStorage.getItem('defectData');
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      console.log(parsedData)
      if (parsedData && parsedData.length > 0) {
        // If data exists, directly dispatch it
        dispatch(getProducts(parsedData));
        return;
      }
    }
    
    const response = await axios.get(`${API_URL}`);
    localStorage.setItem('defectData', JSON.stringify(response.data)); // Cache data in localStorage
    dispatch(getProducts(response.data));
  } catch (error) {
    dispatch(hasError(error));
  }
};

export default DefectSeriesSlice.reducer;
