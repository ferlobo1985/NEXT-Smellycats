import User from 'database/models/user.model';

export const userExists = async(email) => {
    const checkUser = await User.findOne({email:email});
    if(checkUser) return true;
    return false
}

export const findUserByEmail = async(email,select) => {
    return await User.findOne({email:email}).select(select)
}


export const updateUser = async(_id,body) => {
    try{

        const user = await User.findOneAndUpdate(
            {_id},
            {"$set":body},
            {new:true}
        ).select({password:0})
        
        if(!user) throw new Error('No user was found');
        return user;
    } catch(error){
        throw error;
    }
}