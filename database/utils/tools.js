import { compare, hash, genSalt } from 'bcryptjs';
import { findUserByEmail } from 'database/services/user.service'
import roles from 'database/utils/roles' 

export const passwordHash = async(password) => {
    const salt = await genSalt(10);
    const hashPassword = await hash(password,salt);
    return hashPassword;
}


export const passwordCheck = async(password,hashedPassword) =>{
    const valid = await compare(password,hashedPassword);
    return valid;
}

export const checkRole = async(req,rights)=>{
    const user = await findUserByEmail(req.session.user.email);
    if(!user){
        return false
    }

    const action = rights[0]; // createAny, readAny ....
    const resource = rights[1]; // shows, profile,....

    const permission = roles.can(user.role)[action](resource);
    if(!permission.granted){
        return false
    }
    return true;
}