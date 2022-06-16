import formidable from "formidable";
import fs from 'fs';

export const config = {
    api:{
        bodyParser: false
    }
}


const saveFile = (file) => {
    const data = fs.readFileSync(file.filepath)
    const newFilename = Date.now() + '-' + file.originalFilename;

    fs.writeFileSync(`./public/images/venues/uploads/${newFilename}`,data);
    fs.unlinkSync(file.filepath);
    return newFilename;
} 


const handler = (req,res) => {
    if(req.method === 'POST'){
        const form =  new formidable.IncomingForm({multiples:true})
    
        form.parse(req,(err,fields,files)=>{
            if(err){
                return res.status(400).json({errors:err})
            }
            const upload = saveFile(files.file);
            return res.status(201).json({message:'ok',filename:upload})
        })
    }
}

export default handler;