import LayoutAdmin from "components/ui/layout.admin";
import connectToDb from "database/db";
import { paginateShows } from 'database/services/show.service';
import { toJson } from 'helpers/functions'

const ShowsAdmin = (props) => {

    console.log(props)

    return(
        <LayoutAdmin title="Shows">
            shows
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