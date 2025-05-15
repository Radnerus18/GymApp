import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface PostState {
    data: object;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: PostState = {
    data: {},
    status: 'idle',
    error: null,
};

// Async thunk to post data to the server
export const postData = createAsyncThunk(
    'data/postData',
    async (payload: object, { rejectWithValue }) => {
        try {
            const response = await axios.post(import.meta.env.VITE_APP_AXIOS_URL_1+'/api/client/register', payload);
            return response.data;
        } catch (error:unknown) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data || 'Something went wrong');
            }
            return rejectWithValue('Something went wrong');
        }
    }
);

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postData.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(postData.fulfilled, (state, action: PayloadAction<object>) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(postData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string | null;
            });
    },
});

export default dataSlice.reducer;