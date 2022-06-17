import Card from '../card';
import Masonry from 'react-masonry-css'

const LatestShowsBlock = ({shows,title}) => {

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
      };
      
      return(
        <>
            <div className='latest-bottom-wrapper'>
                <hr/>
                <h3>{title}</h3>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    { shows.map(show=>(
                        <Card show={show} key={show._id}/>
                    ))}
                </Masonry>
            </div>
        </>
      )
}


export default LatestShowsBlock