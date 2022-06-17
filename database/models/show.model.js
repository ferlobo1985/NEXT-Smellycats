import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const showSchema = new mongoose.Schema({
    slug:{
        unique:[true,'The slug must be unique'],
        required:[true,'The slug is required'],
        type:String,
        maxlength:250
    },
    title:{
        required:[true,'The title is required'],
        type:String,
        maxlength:250
    },
    venue:{
        required:[true,'The Venue is required'],
        type:String,
        maxlength:250
    },
    excerpt:{
        required:[true,'The excerpt is required'],
        type:String,
        maxlength:2000
    },
    content:{
        required:[true,'The content is required'],
        type:String,
        maxlength:10000
    },
    yt:{
        required:[true,'The yt link is required'],
        type:String,
        maxlength:250
    },
    image:{
        type:String,
        maxlength:2000,
        default:"na.jpg",
    },
    date:{
        type:String,
        required:[true,'The data is required'],
    },
    time:{
        type:String,
        required:[true,'The time is required'],
    }
})


showSchema.plugin(aggregatePaginate);
const Show = mongoose.models.Show || mongoose.model('Show',showSchema)
export default Show;