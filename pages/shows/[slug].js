import Image from "next/image";

import connectToDb from "database/db";
import { getAllShows, getBySlug } from 'database/services/show.service';
import { toJson } from "helpers/functions";

import YTFrame from "components/ui/shows/ytframe";

const ShowArticle = ({show,latest}) =>{

    return(
        <>
            <Image
                src={`/images/venues/uploads/${show.image}`}
                alt={show.title}
                width="1920"
                height="1080"
                layout="responsive"
                className="img-fluid"
                priority={true}
            />
            <div className="container show_container">
                <div className="content">
                    <h1>{show.title}</h1>
                    <p>{show.content}</p>
                </div>

                <div className="yt-wrapper">
                    <h3>Watch the full show</h3>
                    <YTFrame ytid={show.yt}/>
                </div>  

            </div>
        </>
    )
}

export const getServerSideProps = async(context) =>{
    await connectToDb();
    const show = await getBySlug(context.params);
    const latest = await getAllShows('_id','desc',4,0)

    if(!show){
        return{
            notFound:true
        }
    }

    return {
        props:{
           show:toJson(show[0]),
           latest:toJson(latest)
        }
    }

}


export default ShowArticle;