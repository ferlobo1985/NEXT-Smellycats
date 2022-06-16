import { useEffect } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";

import { Navbar,Container, Nav } from 'react-bootstrap';

import { showToast } from 'helpers/functions'
import { useSelector,useDispatch } from "react-redux";
import { clearNotification } from 'store/reducers/notifications.reducer';


const Header = () => {
    const router = useRouter();
    const notifications = useSelector(state => state.notifications);
    const dispatch = useDispatch();

    useEffect(()=>{
        let { global } = notifications;
        if(notifications && global.error ){
            const msg = global.msg ? global.msg : 'Error';
            showToast('ERROR',msg);
            dispatch(clearNotification())
        }
        if(notifications && global.success ){
            const msg = global.msg ? global.msg : 'Good!';
            showToast('SUCCESS',msg);
            dispatch(clearNotification())
        }
    },[notifications])

    return(
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand>
                <Link href="/">The smelly cats</Link>
            </Navbar.Brand>
            <Nav className="ml-auto">
                <Link href="/show" passHref>
                    <Nav.Link>Shows</Nav.Link>
                </Link>

                <Link href="/contact" passHref>
                    <Nav.Link>Contact</Nav.Link>
                </Link>

                <Link href="/users/sign_in" passHref>
                    <Nav.Link>Sign in</Nav.Link>
                </Link>

         
                <Nav.Link
                    onClick={()=>{
                        console.log('sign out');
                        router.push('/')
                    }}
                >Sign out</Nav.Link>
 
                <Link href="/users/dashboard" passHref>
                    <Nav.Link>Dashboard</Nav.Link>
                </Link>


            </Nav>
            </Container>
        </Navbar>
    )

}

export default Header;