import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const authSlice = createSlice(
   {
        name : "auth" ,
        initialState : {
            user : JSON.parse(localStorage.getItem('user')) || null ,
            isLoading : false ,
            isError : false ,
            isSuccess : false ,
            message : ""
        },
        reducers : {} ,
        extraReducers : (builder) => {
            builder
            .addCase(signInUser.pending , (state ,action) => {
                state.isLoading = true
            })
            .addCase(signInUser.fulfilled , (state ,action) => {
                state.isLoading = false ,
                state.user = action.payload,
                state.isSuccess = true
            })
            .addCase(signInUser.rejected , (state ,action) => {
                state.isLoading = false ,
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            //LOGOUT
            .addCase(logoutUser.fulfilled , (state , action) => {
                state.user = null
            })
        }
   }
)

export default authSlice.reducer


export const signInUser = createAsyncThunk(
    "AUTH/USER" , 
    async (formData , thunkAPI) => {

        try {
            return await authService.register(formData)
        } catch (error) {
            const message = error.response.data.message
            thunkAPI.rejectWithValue(message)
        }

    }
)

export const logoutUser = createAsyncThunk(
    "AUTH/LOGOUT" , 
    async (formData , thunkAPI) => {

        try {
            return await authService.logout(formData)
        } catch (error) {
            const message = error.response.data.message
            thunkAPI.rejectWithValue(message)
        }

    }
)