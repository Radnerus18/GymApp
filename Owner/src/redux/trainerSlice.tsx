import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Trainer {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  email: string;
  phone: string;
  specialty: string;
  experienceYears: string;
  experienceDesc: string;
}

interface TrainerState {
  trainers: Trainer[];
  loading: boolean;
  error: string | null;
}

const initialState: TrainerState = {
  trainers: [],
  loading: false,
  error: null,
};

export const fetchTrainers = createAsyncThunk<Trainer[]>(
  'trainer/fetchTrainers',
  async () => {
    const response = await axios.get<Trainer[]>(
      import.meta.env.VITE_APP_AXIOS_URL_1 + '/api/trainer/getAll'
    );
    return response.data;
  }
);

export const addTrainer = createAsyncThunk<Trainer[], Partial<Trainer>>(
  'trainer/addTrainer',
  async (trainerData) => {
    const response = await axios.post<Trainer[]>(
      import.meta.env.VITE_APP_AXIOS_URL_1 + '/api/trainer/register',
      trainerData
    );
    return response.data;
  }
);

export const updateTrainer = createAsyncThunk<Trainer[], { id: string; trainerData: Partial<Trainer> }>(
  'trainer/updateTrainer',
  async ({ id, trainerData }) => {
    const response = await axios.put<Trainer[]>(
      import.meta.env.VITE_APP_AXIOS_URL_1 + `/api/trainer/update/${id}`,
      trainerData
    );
    return response.data;
  }
);

export const deleteTrainer = createAsyncThunk<Trainer[], string>(
  'trainer/deleteTrainer',
  async (id) => {
    const response = await axios.delete<Trainer[]>(
      import.meta.env.VITE_APP_AXIOS_URL_1 + `/api/trainer/delete/${id}`
    );
    return response.data;
  }
);

const trainerSlice = createSlice({
  name: 'trainers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainers.fulfilled, (state, action: PayloadAction<Trainer[]>) => {
        state.loading = false;
        state.trainers = action.payload;
      })
      .addCase(fetchTrainers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch trainers';
      })
      .addCase(addTrainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTrainer.fulfilled, (state, action: PayloadAction<Trainer[]>) => {
        state.loading = false;
        state.trainers = action.payload;
      })
      .addCase(addTrainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add trainer';
      })
      .addCase(updateTrainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTrainer.fulfilled, (state, action: PayloadAction<Trainer[]>) => {
        state.loading = false;
        state.trainers = action.payload;
      })
      .addCase(updateTrainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update trainer';
      })
      .addCase(deleteTrainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTrainer.fulfilled, (state, action: PayloadAction<Trainer[]>) => {
        state.loading = false;
        state.trainers = action.payload;
      })
      .addCase(deleteTrainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete trainer';
      });
  },
});

export default trainerSlice.reducer;
