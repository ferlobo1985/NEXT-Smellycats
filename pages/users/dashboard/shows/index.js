import { useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { errorGlobal, successGlobal } from 'store/reducers/notifications.reducer'

import LayoutAdmin from "components/ui/layout.admin";
import connectToDb from "database/db";
import { paginateShows } from 'database/services/show.service';
import { toJson } from 'helpers/functions';
import PaginateBlock from 'components/users/admin/paginate';



const ShowsAdmin = ({shows}) => {
    const dispatch = useDispatch();
    const [showsPag,setShowPag] = useState(shows);
    const limit = 3;
    const [currentPage,setCurrentPage] = useState(1);
  

    const goToPage = (page) => {
        getShows({page:page,limit})
        setCurrentPage(page);
    }
    
    const getShows = (values) => {
        axios.post("/api/shows/paginate",values)
        .then( response => {
            setShowPag(response.data)
        }).catch(error=>{
            dispatch(errorGlobal(error.response.data.message))
        })
    }


    return(
        <LayoutAdmin title="Shows">
            <div className="shows_table">
                <PaginateBlock
                    shows={showsPag}
                    prev={(page)=>goToPage(page)}
                    next={(page)=>goToPage(page)}


                />
            </div>
        </LayoutAdmin>
    )
}

export const getServerSideProps = async() => {
    await connectToDb();
    const shows = await paginateShows(1,3);

    if(!shows){
        return{
            props:{
                shows:[]
            }
        }
    }

    return {
        props:{
            shows:toJson(shows)
        }
    }

}




export default ShowsAdmin;