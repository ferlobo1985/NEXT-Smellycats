import { useState } from "react";

import connectToDb from "database/db";
import { getAllShows } from 'database/services/show.service'
import { toJson } from 'helpers/functions'

import Masonry from 'react-masonry-css';
import CardComponent from "components/ui/card";

import { Button } from "@mui/material";
import axios from "axios";

const ShowsPage = (props) => {
    const [noMore, setNoMore] = useState(false);
    const [shows,setShow] = useState(props.shows);
    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1
      };
      
      const loadMorePosts = () => {
        const skip = shows.length;

        axios.get(`/api/shows/getAll?limit=3&skip=${skip}`)
        .then( response => {
            const newState = [
                ...shows,
                ...response.data.shows
            ]
            setShow(newState);
            if(response.data.shows.length <= 0 ){
                setNoMore(true)
            }
        })
        .catch(error=>{
            console.log(error)
        })
      }

    return(
        <div className="container page_container">
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
               { shows.map( show =>(
                    <CardComponent
                        key={show._id}
                        show={show}
                    />
               ))}
            </Masonry>

            { !noMore && 
            <Button
                variant="contained"
                onClick={loadMorePosts}
            >
                Load more
            </Button>
            }

        </div>
    )
}


export const getServerSideProps = async() => {
    await connectToDb();
    try{
      const shows = await getAllShows('_id','desc',6,0);
      return {props:{shows:toJson(shows)}}
    } catch(error) {
      return {props:{shows:[]}}
    }
  }
  


export default ShowsPage