import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDb from "database/db";

import { findUserByEmail } from 'database/services/user.service';
import { passwordCheck } from 'database/utils/tools'

export default NextAuth({
    session:{
         /// secret $ openssl rand -base64 32
        jwt:true
    },
    providers:[
        CredentialsProvider({
           async authorize(credentials){
                await connectToDb();

                //// check if the user exists
                const user = await findUserByEmail(credentials.email,{});
                if(!user){
                    throw new Error('No email was found')
                }

                //// password
                if(!await passwordCheck(credentials.password,user.password)){
                    throw new Error('Wrong password')
                }
                
                return {
                    email: user.email
                }
           } 
        })
    ]
})