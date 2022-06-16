import { createAsyncThunk } from '@reduxjs/toolkit';

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


            console.log('WELCOME !!!!')
            router.push('/users/dashboard')
            return user.data
        } catch(error){
            console.log(error.response.data.message)
            throw error;
        }
    }
)