import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from 'helpers/loader'


const RouteGuard = (props) => {
    const [loading,setLoading] = useState(true);
    const router = useRouter();

    useEffect(()=>{
        getSession().then(session=>{
            if(!session){
                router.push('/users/sign_in')
            } else {
                setLoading(false)
            }
        })
    },[])


    if(loading){
        return <Loader/>
    }

    return(
        <>
            {props.children}
        </>
    )
}

export default RouteGuard