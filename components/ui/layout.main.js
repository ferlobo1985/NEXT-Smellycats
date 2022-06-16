import Header from '../navigation/header';
import Footer from 'components/navigation/footer';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = (props) => {
    return(
        <>
            <Header/>
            {props.children}
            <ToastContainer/>
            <Footer/>
        </>
    )
}

export default MainLayout