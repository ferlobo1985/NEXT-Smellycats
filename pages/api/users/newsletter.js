import nc from 'next-connect';
import NewsLetter from 'database/models/newsletter.model';
import connectToDb from 'database/db';

const handler = nc();

handler
.post(async(req,res)=>{
    try{
        await connectToDb();
        ////
        const email = await NewsLetter.findOne({email:req.body.email});
        if(email){
            return res.status(400).json({message:'You are on the list, knock it out.'})
        }

        const newsletter = new NewsLetter({
            email:req.body.email
        });
        await newsletter.save();
        res.status(200).json(newsletter);
    } catch(error){
        res.status(400).json({message:'Oop, somwthing wrong',error:error});
    }
})


export default handler