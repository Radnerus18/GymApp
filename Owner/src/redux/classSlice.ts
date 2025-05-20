import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Class {
    id: number;
    name: string;
    // add other class properties as needed
}

interface ClassState {
    classes: Class[];
    loading: boolean;
    error: string | null;
}

const initialState: ClassState = {
    classes: [],
    loading: false,
    error: null,
};
// Pass adminId as an argument to the thunk
export const fetchClasses = createAsyncThunk<Class[], string>(
    'classes/fetchClasses',
    async (adminId) => {
        const response = await axios.get<Class[]>(
            import.meta.env.VITE_APP_AXIOS_URL_1 + '/api/classes/getClasses',
            { params: { adminId } }
        );
        return response.data;
    }
);
export const updateClass = createAsyncThunk<Class[], { classId: string; classData: Class }>(
    'classes/updateClass',
    async ({ classId, classData }) => {
        const response = await axios.put<Class[]>(
            import.meta.env.VITE_APP_AXIOS_URL_1 + `/api/classes/update/`,
            classData,
            { params: { classId } }
        );
        return response.data;
    }
);
export const deleteClass = createAsyncThunk<Class[], { adminId: string; classId: number }>(
    'classes/deleteClass',
    async ({ classId }) => {
        const response = await axios.delete<Class[]>(
            import.meta.env.VITE_APP_AXIOS_URL_1 + `/api/classes/delete/`,
            { params: { classId } }
        );
        return response.data;
    }
);
const classSlice = createSlice({
    name: 'classes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClasses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchClasses.fulfilled, (state, action: PayloadAction<Class[]>) => {
                state.loading = false;
                state.classes = action.payload;
            })
            .addCase(fetchClasses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch classes';
            })
            .addCase(deleteClass.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteClass.fulfilled, (state, action: PayloadAction<Class[]>) => {
                state.loading = false;
                state.classes = action.payload;
            })
            .addCase(deleteClass.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch classes';
            })
            .addCase(updateClass.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateClass.fulfilled, (state, action: PayloadAction<Class[]>) => {
                state.loading = false;
                state.classes = action.payload;
            })
            .addCase(updateClass.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch classes';
            });
    },
});

export default classSlice.reducer;