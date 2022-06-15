import connectToDb from "database/db";


const handler = async(req,res) => {
    await connectToDb();

    

}

export default handler;
