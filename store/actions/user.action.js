import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async({values,router},{ dispatch })=>{
        try{
            const user = await axios.post('/api/auth/register',values);

            //// SIGN IN CREDENTIALS


            console.log('WELCOME !!!!')
            router.push('/users/dashboard')
            return user.data
        } catch(error){
            console.log(error.response.data.message)
            throw error;
        }
    }
)