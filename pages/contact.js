
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { errorHelper } from "helpers/functions";
import Loader from "helpers/loader";

import { useDispatch } from 'react-redux'
import {
    errorGlobal,
    successGlobal
} from 'store/reducers/notifications.reducer'
import axios from "axios";

const Contact = () => {
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues:{name:"",email:"",message:""},
        validationSchema:Yup.object({
            name:Yup.string().required("Sorry the name is required"),
            email:Yup.string()
            .required("Sorry the email is required")
            .email("This is not a valid email"),
            message:Yup.string().required("Sorry the name is required")
        }),
        onSubmit:(values,{resetForm})=>{
            setLoading(true);
            
            axios.post('/api/email/contact',values)
            .then(()=>{
                dispatch(successGlobal('Thank you!!'))
            }).catch(error=>{
                dispatch(errorGlobal('Error try later'))
            }).finally(()=>{
                resetForm();
                setLoading(false)
            })
        }
    })


    return(
        <div className="container page_container">
            <div className="contact_wrapper">
                <Box
                    component="form"
                    sx={{
                        "& .MuiTextField-root": { margin:"10px 0px", width: "100%" },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}
                >

                    <h1>Contact us</h1>

                    <TextField
                        name="name"
                        label="Enter your name"
                        variant="outlined"
                        {...formik.getFieldProps("name")}
                        {...errorHelper(formik, "name")}
                    />

                    <TextField
                        name="email"
                        label="Enter your email"
                        variant="outlined"
                        {...formik.getFieldProps("email")}
                        {...errorHelper(formik, "email")}
                    />

                    <TextField
                        name="message"
                        label="Enter your message"
                        variant="outlined"
                        multiline
                        rows={4}
                        {...formik.getFieldProps("message")}
                        {...errorHelper(formik, "message")}
                    />

                    { loading ?
                        <Loader/>
                        :
                        <Button
                            variant="contained" 
                            color="primary"
                            type="submit"
                        >
                            Send message
                        </Button>
                    }

                </Box>
            </div>
        </div>
    )

}

export default Contact;