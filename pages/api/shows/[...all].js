import nc from "next-connect";
import checkAuth from "database/middleware/checkauth";
import connectToDb from "database/db";


const handler = nc();

handler.post(
    "/api/shows/add_show",
    checkAuth,
    async(req,res)=>{
        try{
            await connectToDb();

            /// permission
            


        } catch(error){

        }
    }
)






export default handler;