import Show from 'database/models/show.model';

import { showValidation } from 'helpers/validations';
import { validateBody } from '../utils/tools';

export const addShow = async(req) => {
    const body = req.body;
    try{
        //// validation
        const valid = await validateBody(showValidation,body);
        if(!valid){
            throw new Error('Check your form')
        }

        const show = new Show({
            ...body
        })
        await show.save();
        return show;
    } catch(error){
        throw error;
    }
}