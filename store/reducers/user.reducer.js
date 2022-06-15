import { createSlice } from "@reduxjs/toolkit"
import {
    registerUser
} from '../actions/user.action';


const DEFAULT_STATE = {
    loading:false,
    data:{
        _id:'',
        email:'',
        firstname:'',
        lastname:'',
        role:'user'
    },
    auth:false
}


export const userSlice =  createSlice({
    name:'user',
    initialState:DEFAULT_STATE,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending,(state)=>{
            state.loading = true;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload;
            state.auth = true;
        })
        .addCase(registerUser.rejected,(state)=>{
            state.loading = false;
        })
    }
});

export default userSlice.reducer;