import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getSession } from 'next-auth/react'

import Loader from './loader';

import {autoSignIn} from 'store/actions/user.action';

const SessionCheck = (props) => {
    const [loading,setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(()=>{
        getSession()
        .then(session=>{
            if(session){
                dispatch(autoSignIn())
                .unwrap()
                .then(()=>{
                    setLoading(false)
                })
            } else {
                setLoading(false)
            }
        })
        .catch(error => {
            setLoading(false)
        })
    },[])

    if(loading) return <Loader/>
    return(
        <>
            {props.children}
        </>
    )

}

export default SessionCheck;