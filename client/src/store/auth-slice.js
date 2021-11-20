import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk(
    "user/getUsers",
    async(dispatch, getState) => {
        return await fetch('/api/current_user')
        .then(
            res => res.json()
        );
    }
)

//https://www.youtube.com/watch?v=7ujSgXRnyig&ab_channel=HongLy

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        users: {},
        status: null
    },
    extraReducers: {
        [getUsers.pending]: (state, action) => {
            state.status = "loading"
        },
        [getUsers.fulfilled]: (state, action) => {
            state.status = "success"
            state.users = action.payload 
        },
        [getUsers.rejected]: (state, action) => {
            state.status = "failed"
            state.users = false
        }
    }

})

// export const authActions = authSlice.actions;

export default authSlice;