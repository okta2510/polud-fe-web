import axios from '../../../utils/axios';
import { filter, map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';

const API_URL = '/api/data/task/card';

interface StateType {
    taskCards: any[];
    taskCardSearch: string;
    sortBy: string;
    total: number;
    filters: {
        id: string;
        taskCard: string;
        type: string;
        category: string;
        description: string;
        status: string;
    };
    error: string;
}

const initialState = {
    taskCards: [],
    taskCardSearch: '',
    sortBy: 'id',
    total: 0,
    filters: {
        id: 'All',
        taskCard: 'All',
        type: 'All',
        category: 'All',
        description: 'All',
        status: 'All',
    },
    error: '',
};

export const TaskCardSlice = createSlice({
    name: 'taskCards',
    initialState,
    reducers: {
        hasError(state: StateType, action) {
            state.error = action.payload;
        },

        getTaskCards: (state, action) => {
            state.taskCards = action.payload;
        },
        SearchTaskCard: (state, action) => {
            state.taskCardSearch = action.payload;
        },

        sortBy(state, action) {
            state.sortBy = action.payload;
        },

        filterById(state, action) {
            state.filters.id = action.payload.id;
        },

        filterByTaskCard(state, action) {
            state.filters.taskCard = action.payload.taskCard;
        },

        filterByCategory(state, action) {
            state.filters.category = action.payload.category;
        },

        filterByDescription(state, action) {
            state.filters.description = action.payload.description;
        },

        filterByType(state, action) {
            state.filters.type = action.payload.type;
        },

        filterByStatus(state, action) {
            state.filters.status = action.payload.status;
        },

        filterReset(state) {
            state.filters.id = 'All';
            state.filters.taskCard = 'All';
            state.filters.category = 'All';
            state.filters.description = 'All';
            state.filters.status = 'All';
            state.filters.type = 'All';
            state.sortBy = 'taskId';
        },
    },
});
export const {
    hasError,
    getTaskCards,
    SearchTaskCard,
    sortBy,
    filterById,
    filterByTaskCard,
    filterByCategory,
    filterByDescription,
    filterByType,
    filterByStatus,
    filterReset,
} = TaskCardSlice.actions;

export const fetchTaskCards = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${API_URL}`);
        dispatch(getTaskCards(response.data));
    } catch (error) {
        dispatch(hasError(error));
    }
};

export default TaskCardSlice.reducer;