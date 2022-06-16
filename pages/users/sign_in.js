import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { errorHelper } from "helpers/functions";
import Loader from "helpers/loader";

import { useDispatch, useSelector } from 'react-redux'
import { registerUser, signInUser } from 'store/actions/user.action'

import { getSession } from 'next-auth/react';

const SignIn = () => {
  const [check,setCheck] = useState(true) /// check session 
  const [formType, setFormType] = useState(false);
  const user = useSelector(state=> state.user)
  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: "francis@gmail.com", password: "testing123" },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Sorry the email is required")
        .email("Thin is an invalid email"),
      password: Yup.string().required("Sorry the password is required"),
    }),
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  const submitForm = (values) => {
    if (formType) {
      // register
      dispatch(registerUser({values,router}))
    } else {
      // sign in
      dispatch(signInUser({values,router}))
    }
  };

  const handleFormType = () => {
    setFormType(!formType);
  };

  useEffect(()=>{
    getSession().then(session=>{
      if(session){
        router.push('/users/dashboard')
      } else {
        setCheck(false)
      }
    })
  },[])


  return (
    <div className="container full_vh small top-space">
      { !check ?
      <>
        <h1>{formType ? "Register" : "Sign in"}</h1>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <TextField
            name="email"
            label="Enter your email"
            variant="outlined"
            {...formik.getFieldProps("email")}
            {...errorHelper(formik, "email")}
          />

          <TextField
            name="password"
            label="Enter your password"
            variant="outlined"
            type="password"
            {...formik.getFieldProps("password")}
            {...errorHelper(formik, "password")}
          />

          { user.loading ?
            <Loader/>
          :
          <div className="mb-3 si-btns">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="small"
              className="me-2"
            >
              {formType ? "Register" : "Sign in"}
            </Button>
            <Button 
                variant="outlined" 
                size="small"
                onClick={handleFormType}
            >
                {formType ? 
                    "Already registered ? click here" 
                    : 
                    "Already signed in ? click here" 
                }
            </Button>
          </div>
          }
        </Box>
      </>
      :
          <Loader/>
      }
    </div>
  );
};

export default SignIn;
