import nc from 'next-connect';
import connectToDb from 'database/db';
import { contactEmail } from 'database/services/email.service';

const handler = nc();

handler
.post(async(req,res)=>{
    try{
        await connectToDb();
        await contactEmail(req.body);
        res.status(200).json({success:true});
    } catch(error){
        res.status(400).json({message:'Try again later',error:error});
    }
})


export default handler;