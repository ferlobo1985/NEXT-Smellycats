import { createAsyncThunk } from '@reduxjs/toolkit';
import { errorGlobal, successGlobal } from '../reducers/notifications.reducer';

import { signIn } from 'next-auth/react'
import axios from 'axios';

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async({values,router},{ dispatch })=>{
        try{
            const user = await axios.post('/api/auth/register',values);

            //// SIGN IN CREDENTIALS
            await signIn('credentials',{
                redirect:false,
                email:user.data.email,
                password:values.password
            });

            dispatch(successGlobal('Welcome !!!'))
            router.push('/users/dashboard')

            return user.data
        } catch(error){
            dispatch(errorGlobal(error.response.data.message))
            throw error;
        }
    }
)




export const signInUser = createAsyncThunk(
    'user/signInUser',
    async({values,router},{ dispatch })=>{
        try{
            const result = await signIn('credentials',{
                redirect:false,
                email:values.email,
                password:values.password
            });
            if(result.error){
                return dispatch(errorGlobal(result.error))
            }
            
            //// GET REST OF USER DATA
            const user = await axios.get('/api/users/user');

            dispatch(successGlobal('Welcome !!!'))
            router.push('/users/dashboard')

            return user.data
        } catch(error){
            dispatch(errorGlobal(error.response.data.message))
            throw error
        }
    }
)