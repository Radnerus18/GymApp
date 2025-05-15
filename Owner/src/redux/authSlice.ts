// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerAdmin = createAsyncThunk(
  'auth/registerAdmin',
  async (adminData:{ name: string; email: string; phoneNumber: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(import.meta.env.VITE_APP_AXIOS_URL_1+'/api/admin/register', adminData);
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

interface Admin {
  id: string;
  username: string;
  email: string;
  // Add other fields as needed
}

interface AuthState {
  admin: Admin | null;
  adminId:string,
  loading: boolean;
  error: unknown | null;
  loginSuccess:boolean
}

const initialState: AuthState = {
  admin: null,
  adminId:"",
  loading: false,
  error: null,
  loginSuccess:false
};

export const adminLogin = createAsyncThunk(
  'auth/adminLogin',
  async (
    credentials: { adminId: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_APP_AXIOS_URL_1 + '/api/admin/login',
        credentials
      );
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);
export const fetchAdminMe = createAsyncThunk(
  'auth/fetchAdminMe',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_AXIOS_URL_1 + '/api/admin/me',
        { withCredentials: true }
      );
      console.log('@@@ fetchme',response.data.adminId)
      return response.data.adminId;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          // Optionally handle unauthorized access here
          console.warn("Unauthorized access. Please log in.");
        }
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Define synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAdmin.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state: AuthState, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(registerAdmin.rejected, (state: AuthState, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(adminLogin.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state: AuthState, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(adminLogin.rejected, (state: AuthState, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAdminMe.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminMe.fulfilled, (state: AuthState, action) => {
        state.loading = false;
        state.adminId = action.payload;
      })
      .addCase(fetchAdminMe.rejected, (state: AuthState, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
