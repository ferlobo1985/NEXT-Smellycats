import axios from 'axios';
import React,{ useEffect, useState, forwardRef, useImperativeHandle } from 'react'

const UploadHandler = forwardRef((props,ref) => {
    const imageInputRef = React.useRef();
    const [createObjectURL,setCreateObjectURL] = useState(null)

    useImperativeHandle(ref,()=>({
        clearPic(){
            imageInputRef.current.value = "";
            setCreateObjectURL(null)
        }
    }))

    const showImage = (event) => {
        if(event.target.files && event.target.files[0]){
            const img =  event.target.files[0];
            setCreateObjectURL(URL.createObjectURL(img));
            uploadImage(img)
        }
    }


    const uploadImage = async(img) => {
        const body = new FormData();
        body.append("file",img);

        try{
            const request = await axios.post("/api/uploads/image",body);
            props.picValue(request.data.filename)
        } catch(error){
            console.log(error)
        }

    }


    

    return(
        <div className="file-uploader">
            <img src={createObjectURL}/>
            <div className="form-group">
                <input
                    type="file"
                    name="myImage"
                    ref={imageInputRef}
                    onChange={showImage}
                />
            </div>
        </div>
    )
})



export default UploadHandler;