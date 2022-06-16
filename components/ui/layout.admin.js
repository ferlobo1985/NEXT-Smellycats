import Link from 'next/link';

import { useSelector } from 'react-redux';
import RouteGuard from 'helpers/routeGuard';

const LayoutAdmin = (props) => { 
    const user = useSelector(state => state.user);

    return(
        <RouteGuard>
            <div className="user_container">
                <div className="user_left_nav">
                    <div className='links'>
                        <Link href="/users/dashboard/profile">
                            Account
                        </Link>

                        { user.data.role === 'admin' && (
                            <>
                                <Link href="/users/dashboard/shows">
                                    Shows
                                </Link>
                                <Link href="/users/dashboard/shows/create">
                                    Create
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <div className="user_right">
                    <div className='dashboard_title'>
                        <h1>{props.title}</h1>
                    </div>
                    {props.children}
                </div>  

            </div>
        
        </RouteGuard>
    )

}





export default LayoutAdmin;