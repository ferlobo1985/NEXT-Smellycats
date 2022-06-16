import { getSession } from 'next-auth/react'

const checkAuth = async(req,res,next) => {
    const session  = await getSession({req:req});
    if(!session){
        return res.status(401).json({message:'You need to be auth'})
    }

    req.session = session;
    next();
}


export default checkAuth;
