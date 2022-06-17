import Link from 'next/link';
import Image from 'next/image';

import { 
    Card,
    CardActions,
    CardContent,
    Button
} from '@mui/material';


const CardComponent = ({show}) => {
    return(
        <>
            <Card>
                <Image
                    src={`/images/venues/uploads/${show.image}`}
                    layout="responsive"
                    width="1920"
                    height="1080"
                />

                <CardContent>
                    <h5>{show.title}</h5>
                    <p>{show.excerpt}</p>
                </CardContent>

                <CardActions>
                    <Link href={`/shows/${show.slug}`}>
                        <Button
                            variant='outlined'
                            color='primary'
                        >
                            Watch show
                        </Button>
                    </Link>
                </CardActions>

            </Card>
        </>
    )
}

export default CardComponent;