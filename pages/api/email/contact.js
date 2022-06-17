import nc from 'next-connect';
import connectToDb from 'database/db';

const handler = nc();

handler
.post(async(req,res)=>{
    try{
        await connectToDb();

        
       
    } catch(error){
       
    }
})


export default handler