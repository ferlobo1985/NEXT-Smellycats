import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { errorHelper } from 'helpers/functions';
import Loader from 'helpers/loader';


const NewsLetter = () => {
    const [loading,setLoading] = useState(false);

    const formik = useFormik({
        initialValues:{ email:''},
        validationSchema:Yup.object({
            email:Yup.string()
            .required('Sorry the email is required')
            .email('Thin is an invalid email')
        }),
        onSubmit:(values,{ resetForm })=>{
            setLoading(true)
            console.log(values)

            /////
        }
    })

    return(
        <section className='newsletter_section'>
            <div className='container px-4 px-lg-5 text-center'>
                <h1 className='mb-4'>Join to our newsletter</h1>

                { !loading ? 
                    <form className='mt-3' onSubmit={formik.handleSubmit}>
                        <div className='form-group'>
                            <TextField
                                style={{width:'100%'}}
                                name="email"
                                label="Entr you email"
                                variant='outlined'
                                {...formik.getFieldProps('email')}
                                {...errorHelper(formik,'email')}
                            />

                            <Button
                                variant='contained'
                                color="primary"
                                type="submit"
                                size="small"
                                className='mt-2'
                            >
                                Subscribe
                            </Button>

                        </div>
                    </form>
                :
                    <Loader/>
                } 

            </div>
        </section>
    )

}

export default NewsLetter;