import { createSlice } from "@reduxjs/toolkit"
import {
    registerUser,
    signInUser,
    autoSignIn
} from '../actions/user.action';

import { signOut } from 'next-auth/react'

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
        signOutUser:(state)=>{
            signOut({redirect:false});

            state.data = DEFAULT_STATE.data
            state.auth = false;
        }
    },
    extraReducers:(builder)=>{
        builder
        /// REGISTER
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
        /// SIGN IN
        .addCase(signInUser.pending,(state)=>{
            state.loading = true;
        })
        .addCase(signInUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload;
            state.auth = true;
        })
        .addCase(signInUser.rejected,(state)=>{
            state.loading = false;
        })
        //// AUTO SIGN IN
        .addCase(autoSignIn.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.auth = true;
        })
    }
});

export const { signOutUser } =  userSlice.actions
export default userSlice.reducer;