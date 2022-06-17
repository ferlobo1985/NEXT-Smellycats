import { useRef, useState } from 'react'
import LayoutAdmin from "components/ui/layout.admin";
import UploadHandler from 'components/ui/image.upload';

import { useFormik } from 'formik';
import { errorHelper } from 'helpers/functions';
import { showValidation, showFiels } from 'helpers/validations'

import { 
    TextField,
    Button,
    Divider,
    CircularProgress,
    Box
} from '@mui/material';

import { useDispatch } from 'react-redux';
import {  errorGlobal, successGlobal } from 'store/reducers/notifications.reducer'
import axios from 'axios';

//// EDIT //////
import { useRouter} from 'next/router'
import connectToDb from 'database/db';
import { getBySlug } from 'database/services/show.service'
import { toJson } from 'helpers/functions'

//// EDIT /////


const EditShowPage = ({show}) => {
    const router = useRouter(); //// EDIT
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const clearRef = useRef();

    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{
            slug:show.slug,
            title:show.title,
            venue:show.venue,
            excerpt:show.excerpt,
            content:show.content,
            yt:show.yt,
            image:show.image,
            date:show.date,
            time:show.time
        },
        validationSchema:showValidation,
        onSubmit:(values,{ resetForm })=>{
            setLoading(true)
            /// edit //
            axios
            .patch("/api/shows/edit",{
                data: values,
                current: show.slug
            })
            .then(response => {
                if(response.data.slug !== router.query.slug){
                    router.push(`/users/dashboard/shows/${response.data.slug}`)
                }                    
                dispatch(successGlobal('Edited !!'))
            }).catch( error => {
                dispatch(errorGlobal(error.response.data.message))
            }).finally(()=>{
                setLoading(false)
            })
            /// edit ///
        }
    })

    const handlePicValue = (src) => {
        formik.setFieldValue("image",src)
    }

    return(
        <LayoutAdmin title="Edit show">
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { margin:"10px 0px", width: "100%" },
                }}
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}
            >

                <UploadHandler
                    picValue={(src)=>handlePicValue(src)}
                    ref={clearRef}
                    prevImage={show.image}
                />
                
                <Divider className='mt-3 mb-3'/>

                <TextField
                    name="title"
                    label="Enter a title"
                    variant="outlined"
                    {...formik.getFieldProps("title")}
                    {...errorHelper(formik, "title")}
                />

                <TextField
                    name="venue"
                    label="Enter the venue name"
                    variant="outlined"
                    {...formik.getFieldProps("venue")}
                    {...errorHelper(formik, "venue")}
                />

                <TextField
                    name="excerpt"
                    label="Enter a brief description"
                    variant="outlined"
                    multiline
                    rows={4}
                    {...formik.getFieldProps("excerpt")}
                    {...errorHelper(formik, "excerpt")}
                />

                <TextField
                    name="content"
                    label="Enter the content"
                    variant="outlined"
                    multiline
                    rows={6}
                    {...formik.getFieldProps("content")}
                    {...errorHelper(formik, "content")}
                />

                <Divider className='mt-3 mb-3'/>

                <TextField
                    className='date-time-filed'
                    name="date"
                    label="Date of the event"
                    type="date"
                    InputLabelProps={{
                        shrink:true
                    }}
                    {...formik.getFieldProps("date")}
                    {...errorHelper(formik, "date")}
                />


                <TextField
                    className='date-time-filed'
                    name="time"
                    label="Start time"
                    type="time"
                    InputLabelProps={{
                        shrink:true
                    }}
                    InputProps={{ steps: 300}}
                    {...formik.getFieldProps("time")}
                    {...errorHelper(formik, "time")}
                />

                <Divider className='mt-3 mb-3'/>

                <TextField
                    name="yt"
                    label="Enter the yt link"
                    variant="outlined"
                    {...formik.getFieldProps("yt")}
                    {...errorHelper(formik, "yt")}
                />

                <Divider className='mt-3 mb-3'/>

                <TextField
                    name="slug"
                    label="Enter the slug"
                    variant="outlined"
                    {...formik.getFieldProps("slug")}
                    {...errorHelper(formik, "slug")}
                />

                { loading ?
                    <CircularProgress color='secondary' className='mt-3'/>
                :
                    <Button
                        className='mt-3 mb-3'
                        variant='contained'
                        color="primary"
                        type="submit"
                    >
                        Edit show
                    </Button>
                }
            </Box>
        </LayoutAdmin>
    )
}

export const getServerSideProps = async(context)=>{
    await connectToDb();
    const show = await getBySlug(context.params) 

    if(!show){
        return{
            notFound:true
        }
    }

    return {
        props:{
            show:toJson(show[0])
        }
    }

}



export default EditShowPage;