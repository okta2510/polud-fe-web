import axios from '../../../utils/axios';
import { filter, map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';

const API_URL = '/api/data/defect-task';

interface StateType {
    defectTasks: any[];
    defectTasksSearch: string;
    sortBy: string;
    total: number;
    filters: {
        isDefect: boolean;
        isTask: boolean;
        isWorkOrder: boolean;
        isAll: boolean;
    };
    error: string;
}

const initialState = {
    defectTasks: [],
    defectTasksSearch: '',
    sortBy: 'id',
    total: 0,
    filters: {
        isDefect: false,
        isTask: false,
        isWorkOrder: false,
        isAll: true,
    },
    error: '',
};

export const DefectTaskSlice = createSlice({
    name: 'defectTasks',
    initialState,
    reducers: {
        hasError(state: StateType, action) {
            state.error = action.payload;
        },

        getDefectTasks: (state, action) => {
            state.defectTasks = action.payload;
        },
        SearchDefectTasks: (state, action) => {
            state.defectTasksSearch = action.payload;
        },

        sortBy(state, action) {
            state.sortBy = action.payload;
        },

        filterByIsDefect(state, action) {
            state.filters.isDefect = action.payload.isDefect;
        },

        filterByIsTask(state, action) {
            state.filters.isTask = action.payload.isTask;
        },

        filterByIsAll(state, action) {
            state.filters.isAll = action.payload.isAll;
        },

        filterByIsWorkOrder(state, action) {
            state.filters.isWorkOrder = action.payload.isWorkOrder;
        },

        filterReset(state) {
            state.filters.isAll = true;
            state.filters.isDefect = false;
            state.filters.isTask = false;
            state.filters.isWorkOrder = false;
            state.sortBy = 'id';
        },
    },
});
export const {
    hasError,
    getDefectTasks,
    SearchDefectTasks,
    sortBy,
    filterByIsAll,
    filterByIsDefect,
    filterByIsTask,
    filterByIsWorkOrder,
    filterReset,
} = DefectTaskSlice.actions;

export const fetchDefectTasks = () => async (dispatch: AppDispatch) => {
    try {
        const cachedData = localStorage.getItem('defectTaskData');
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            if (parsedData && parsedData.length > 0) {
                dispatch(getDefectTasks(parsedData));
                return;
            }
        }

        const response = await axios.get(`${API_URL}`);
        localStorage.setItem('defectTaskData', JSON.stringify(response.data));
        dispatch(getDefectTasks(response.data));
    } catch (error) {
        dispatch(hasError(error));
    }
};

export default DefectTaskSlice.reducer;