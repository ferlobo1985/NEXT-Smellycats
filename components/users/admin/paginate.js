import {
    Table,
    Pagination,
    Modal,
    Button
} from 'react-bootstrap';
import { useRouter } from 'next/router';

const PaginateBlock = ({
    shows
}) => {
    console.log(shows)


    return(
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Venue</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    { shows.docs.map( show =>(
                        <tr key={show._id}>
                            <td>{show.title}</td>
                            <td>{show.venue}</td>
                            <td>{show.date}</td>
                            <td
                                className='action_btn remove_btn'
                                onClick={()=> alert('REMOVE POST')}
                            >Remove</td>
                             <td
                                className='action_btn edit_btn'
                                onClick={()=> alert('redirect to post')}
                            >Edit</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>
                { shows.hasPrevPage ? 
                <>
                    <Pagination.Prev onClick={()=> alert('PREV PAGE')}/>
                    <Pagination.Item onClick={()=> alert('PREV PAGE')}>
                        {shows.prevPage}
                    </Pagination.Item>
                </>
                :null}
                <Pagination.Item active>{shows.page}</Pagination.Item>
                { shows.hasNextPage ? 
                <>
                    <Pagination.Item onClick={()=> alert('NEXT PAGE')}>
                        {shows.nextPage}
                    </Pagination.Item>
                    <Pagination.Next onClick={()=> alert('NEXT PAGE')}/>
                </>
                :null} 

            </Pagination>
        </>
    )
}

export default PaginateBlock;