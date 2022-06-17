import LayoutAdmin from "components/ui/layout.admin";
import axios from 'axios';

import { useFormik } from "formik";
import * as Yup from "yup";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { errorHelper } from "helpers/functions";

import { useDispatch, useSelector } from 'react-redux'
import { successGlobal, errorGlobal } from "store/reducers/notifications.reducer";


const UserProfile = () => {
    const user = useSelector(state=>state.user);
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize:true,
        initialValues: { 
            firstname: user.data.firstname, 
            lastname: user.data.lastname 
        },
        validationSchema: Yup.object({
            firstname: Yup.string()
            .required("Sorry the firstname is required")
            .min(2,"2 char min")
            .max(150,"50 char min"),
            lastname: Yup.string()
            .required("Sorry the lastname is required")
            .min(2,"2 char min")
            .max(150,"50 char min"),
        }),
        onSubmit: (values) => {
           
            axios
            .patch("/api/users/user",values)
            .then(response=>{
                dispatch(successGlobal('Updated!!'))
            })
            .catch(error=>{
                dispatch(errorGlobal(error.response.data.message))
            })
        },
      });



    return(
        <LayoutAdmin title="Account">
            <Box
                component="form"
                sx={{
                    maxWidth:"250px",
                    "& .MuiTextField-root": { margin:"10px 0px", width: "100%" },
                }}
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}
            >

                <TextField
                    name="firstname"
                    label="Enter your firstname"
                    variant="outlined"
                    {...formik.getFieldProps("firstname")}
                    {...errorHelper(formik, "firstname")}
                />

                <TextField
                    name="lastname"
                    label="Enter your lastname"
                    variant="outlined"
                    {...formik.getFieldProps("lastname")}
                    {...errorHelper(formik, "lastname")}
                />

                <Button
                    className="mb-3"
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Edit profile
                </Button>
            </Box>
        </LayoutAdmin>
    )
}

export default UserProfile;