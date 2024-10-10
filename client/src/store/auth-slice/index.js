import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios';

const initialState = {
    isAuthenticated : false,
    isLoading: false,
    user:null
};

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

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers:{
        setUser: () => {},
        extraReducers : (builder) => {
            builder.addCase (registerUser.pending, (state) =>
               { state.isLoading = true }
            ).addCase(registerUser.fulfilled, (state, action)=>{
                state.isLoading =false;
                state.user = action.payload;
                state.isAuthenticated = true;
            }).addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false
            })
            builder.addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload || "Failed to register"; // Optional error state
            });
            
        }       
    },
});

export const {setUser} = authSlice.actions;
export default authSlice.reducer;

