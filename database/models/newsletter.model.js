import mongoose from "mongoose";

const newsletterSchema = mongoose.Schema({
    email:{
        required:[true,'The email is required'],
        type:String,
        unique:true
    }   
});

const NewsLetter = mongoose.models.NewsLetter || mongoose.model('NewsLetter',newsletterSchema)
export default NewsLetter;