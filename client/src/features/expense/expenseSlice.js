import  {createAsyncThunk, createSlice}   from "@reduxjs/toolkit";
import expenseService from "./expenseService";

const expenseSlice = createSlice(
    {
        name : "expense" ,
        initialState : {
            expense : {} ,
            allExpenses : [] ,
            isLoading : false ,
            isSuccess : false ,
            isError : false
        } , 
        reducers : {},
        extraReducers : (builder) => {
            builder
            .addCase(getAllExpenses.pending , (state , action)    => {
                state.isLoading = true
                state.isSuccess = false 
                state.isError = false
            })
            .addCase(getAllExpenses.fulfilled , (state , action)    => {
                state.isLoading = false
                state.isSuccess = true
                state.allExpenses = action.payload 
                state.isError = false
            })
            .addCase(getAllExpenses.rejected , (state , action)    => {
                state.isLoading = false
                state.isSuccess = false 
                state.isError = true
                state.message = action.payload
            })
             //ADD INCOME CASE
            .addCase(addExpense.pending , (state , action)    => {
                state.isLoading = true
                state.isSuccess = false 
                state.isError = false
            })
            .addCase(addExpense.fulfilled , (state , action)    => {
                state.isLoading = false
                state.isSuccess = true
                state.allExpenses = [action.payload , ...state.allExpenses ]
                state.isError = false
            })
            .addCase(addExpense.rejected , (state , action)    => {
                state.isLoading = false
                state.isSuccess = false 
                state.isError = true
                state.message = action.payload
            })
            //DELETE EXPENSE CASE
            .addCase(deleteExpense.pending , (state , action)    => {
                state.isLoading = true
                state.isSuccess = false 
                state.isError = false
            })
            .addCase(deleteExpense.fulfilled , (state , action)    => {
                state.isLoading = false
                state.isSuccess = true
                state.allExpenses = state.allExpenses.filter(expense => expense._id != action.payload._id)
                state.isError = false
            })
            .addCase(deleteExpense.rejected , (state , action)    => {
                state.isLoading = false
                state.isSuccess = false 
                state.isError = true
                state.message = action.payload
            })
        }
    }
)

export default expenseSlice.reducer

export const getAllExpenses = createAsyncThunk(
    "GET/ALL_EXPENSE" , 
    async (_ , thunkAPI) => {
        let token = thunkAPI.getState().auth.user.token
        try {
            return await expenseService.getAllExpenses(token)
        } catch (error) {
            const message = error.response.data.message
            thunkAPI.rejectWithValue(message)
        }
    }
)

//ADD EXPENSE

export const addExpense = createAsyncThunk(
    "ADD/EXPENSE" , 
    async (formData , thunkAPI) => {
        let token = thunkAPI.getState().auth.user.token
        try {
            return await expenseService.addExpense(formData , token)
        } catch (error) {
            const message = error.response.data.message
            thunkAPI.rejectWithValue(message)
        }
    }
)

//UPDATE EXPENSE

export const updateExpense = createAsyncThunk(
    "UPDATE/EXPENSE" , 
    async ({formData , eid} , thunkAPI) => {
        let token = thunkAPI.getState().auth.user.token
        // console.log(formData , iid)
        try {
            return await expenseService.updateExpense(formData , eid ,  token)
        } catch (error) {
            const message = error.response.data.message
            thunkAPI.rejectWithValue(message)
        }
    }
)


//DELETE INCOME

export const deleteExpense = createAsyncThunk(
    "DELETE/EXPENSE" , 
    async (eid , thunkAPI) => {
        let token = thunkAPI.getState().auth.user.token
        // console.log(formData , iid)
        try {
            return await expenseService.deleteExpense(eid ,  token)
        } catch (error) {
            const message = error.response.data.message
            thunkAPI.rejectWithValue(message)
        }
    }
)
