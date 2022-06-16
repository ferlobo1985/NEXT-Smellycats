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