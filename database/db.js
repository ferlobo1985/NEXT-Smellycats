import mongoose from 'mongoose'

export default async function connectToDb(){
    if(mongoose.connection.readyState >= 1) return;

    return mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`)
}