import nc from "next-connect";
import checkAuth from "database/middleware/checkauth";
import connectToDb from "database/db";
import { checkRole } from 'database/utils/tools'

import {
    addShow,
    paginateShows
} from 'database/services/show.service'


const handler = nc();

handler.post(
    "/api/shows/add_show",
    checkAuth,
    async(req,res)=>{
        try{
            await connectToDb();

            /// permission
            const permission = await checkRole(req,['createAny','shows']);
            if(!permission){
                return res.status(401).json({message:'Unauthorized'})
            }

            /// database post
            const show = await addShow(req);
            res.status(200).json({show});
        } catch(error){
            res.status(400).json({message:error.message});
        }
    }
)


handler.post(
    "/api/shows/paginate",
    async(req,res)=>{
        try{
            await connectToDb();
            const page = req.body.page ? req.body.page : 1;
            const limit = req.body.limit ? req.body.limit : 5;

            const shows = await paginateShows(page,limit);
            res.status(200).json(shows)
        } catch(error){
            res.status(400).json({message:'Oops i did it again.'});
        }
    }
)






export default handler;