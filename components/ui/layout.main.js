import Header from '../navigation/header';
import Footer from 'components/navigation/footer';

const MainLayout = (props) => {
    return(
        <>
            <Header/>
            {props.children}
            <Footer/>
        </>
    )
}

export default MainLayout