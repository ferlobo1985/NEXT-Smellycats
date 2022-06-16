import connectToDb from "database/db";
import nc from 'next-connect';
import checkAuth from 'database/middleware/checkauth'

import { findUserByEmail } from 'database/services/user.service'

const handler = nc();

handler
.use(checkAuth)
.get(async(req,res)=>{
    try{
        await connectToDb();
        const user = await findUserByEmail(req.session.user.email,{password:0})
        res.status(200).json(user);
    } catch(error){
        res.status(400).json({message:'oops somethig wrong'});
    }
})

export default handler;
