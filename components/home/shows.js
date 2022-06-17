import Link from "next/link";
import Image from "next/image";
import Button from "@mui/material/Button";

const Shows = ({shows}) => {

    return(
        <>
            <section className="page-section">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="text-white mt-1">
                                Check our shows
                            </h2>
                            <Link href="/shows">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                >
                                    Watch all the shows
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>


            <div id="home_events">
                <div className="container-fluid p-0">
                    <div className="row g-0">

                        { shows.map(show=>(
                            <div className="col-md-4 col-sm-12" key={show._id}>
                            <Link href={`/show/${show.slug}`}>
                                <a className="event-box">
                                    <Image
                                        src={`/images/venues/uploads/${show.image}`}
                                        alt={show.title}
                                        width="1920"
                                        height="1080"
                                        layout="responsive"
                                        className="img-fluid"
                                    />
                                    <div className="event-box-caption">
                                        <div className="project-category text-white-50">
                                            {show.date}
                                        </div>
                                        <div className="project-name">
                                            {show.venue}
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </div>
                        ))}
                        



                    </div>
                </div>
            </div>

        </>
    )
}

export default Shows;