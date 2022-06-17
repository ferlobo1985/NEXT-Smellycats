import { useState } from "react";

import LayoutAdmin from "components/ui/layout.admin";
import connectToDb from "database/db";
import { paginateShows } from 'database/services/show.service';
import { toJson } from 'helpers/functions';
import PaginateBlock from 'components/users/admin/paginate';



const ShowsAdmin = ({shows}) => {
    const [showsPag,setShowPag] = useState(shows);
  


    return(
        <LayoutAdmin title="Shows">
            <div className="shows_table">
                <PaginateBlock
                    shows={showsPag}
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