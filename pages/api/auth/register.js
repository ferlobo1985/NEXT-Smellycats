import connectToDb from "database/db";
import User from 'database/models/user.model'

import { passwordHash } from 'database/utils/tools'
import { userExists } from 'database/services/user.service';

const handler = async(req,res) => {
    await connectToDb();

    if(req.method === 'POST'){
        const {email, password} = req.body;

        /// check if exists
        if(await userExists(email)){
            res.status(400).json({message:'User exists'})
            return;
        }

        /// hash pass
        const hashedPass = await passwordHash(password);

        //save
        try{
            const user = new User({
                email,
                password:hashedPass
            });
            await user.save();
            res.status(200).json({
                _id: user._id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role
            })
        } catch(error) {
            res.status(500).json({
                message:'Error adding user to the db',
                error:error.errors
            })
        }
    }

}

export default handler;
