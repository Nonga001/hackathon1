import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios';

const initialState = {
    isAuthenticated : false,
    isLoading: false,
    user:null
};

//Register Thunk
export const registerUser = createAsyncThunk('./auth/register', 
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', formData, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data); 
        }
    }
);

//Login Thunk
export const loginUser = createAsyncThunk('./auth/login', 
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data); 
        }
    }
);

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers:{
        setUser: () => {},
        extraReducers : (builder) => {
            builder
            .addCase (registerUser.pending, (state) =>
               { state.isLoading = true }
            ).addCase(registerUser.fulfilled, (state, action)=>{
                state.isLoading =false;
                state.user = action.payload;
                state.isAuthenticated = true;
            }).addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload || "Failed to register"; // Optional error state
            })
            .addCase (loginUser.pending, (state) =>
                { state.isLoading = true }
            ).addCase(loginUser.fulfilled, (state, action)=>{
                state.isLoading =false;
                state.user = !action.payload.success ?  action.payload : null;
                state.isAuthenticated = !action.payload.success ? true : false;
            }).addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false
            }).addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload || "Failed to Loggin"; 
            });
            
        }       
    },
});

export const {setUser} = authSlice.actions;
export default authSlice.reducer;

