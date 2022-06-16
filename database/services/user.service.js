import User from 'database/models/user.model';

export const userExists = async(email) => {
    const checkUser = await User.findOne({email:email});
    if(checkUser) return true;
    return false
}

export const findUserByEmail = async(email,select) => {
    return await User.findOne({email:email}).select(select)
}
