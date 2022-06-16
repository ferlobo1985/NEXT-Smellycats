import Show from 'database/models/show.model';



export const addShow = async(req) => {
    const body = req.body;
    try{
        //// validation

        const show = new Show({
            ...body
        })
        await show.save();
        return show;
    } catch(error){
        throw error;
    }
}