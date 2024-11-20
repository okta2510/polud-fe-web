import axios from '../../../utils/axios';
import { filter, map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';

const API_URL = '/api/data/task';

interface StateType {
    taks: any[];
    taskSearch: string;
    sortBy: string;
    total: number;
    filters: {
        taskId: string;
        category: string;
        classification: string;
        description: string;
        status: string;
    };
    error: string;
}

const initialState = {
    taks: [],
    taskSearch: '',
    sortBy: 'taskId',
    total: 0,
    filters: {
        taskId: 'All',
        category: 'All',
        classification: 'All',
        description: 'All',
        status: 'All',
    },
    error: '',
};

export const TaskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        hasError(state: StateType, action) {
            state.error = action.payload;
        },

        getTasks: (state, action) => {
            state.taks = action.payload;
        },
        SearchTask: (state, action) => {
            state.taskSearch = action.payload;
        },

        sortBy(state, action) {
            state.sortBy = action.payload;
        },

        filterByTaskId(state, action) {
            state.filters.taskId = action.payload.taskId;
        },

        filterByCategory(state, action) {
            state.filters.category = action.payload.category;
        },

        filterByDescription(state, action) {
            state.filters.description = action.payload.description;
        },

        filterByClassification(state, action) {
            state.filters.classification = action.payload.classification;
        },

        filterByStatus(state, action) {
            state.filters.status = action.payload.status;
        },

        filterReset(state) {
            state.filters.taskId = 'All';
            state.filters.category = 'All';
            state.filters.description = 'All';
            state.filters.status = 'All';
            state.filters.classification = 'All';
            state.sortBy = 'taskId';
        },
    },
});
export const {
    hasError,
    getTasks,
    SearchTask,
    sortBy,
    filterByTaskId,
    filterByCategory,
    filterByDescription,
    filterByClassification,
    filterByStatus,
    filterReset,
} = TaskSlice.actions;

export const fetchTasks = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${API_URL}`);
        dispatch(getTasks(response.data));
    } catch (error) {
        dispatch(hasError(error));
    }
};

export default TaskSlice.reducer;