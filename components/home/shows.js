import Link from "next/link";
import Image from "next/image";
import Button from "@mui/material/Button";

const Shows = () => {

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

                        <div className="col-md-4 col-sm-12" key="1">
                            <Link href={`/show/the_slug`}>
                                <a className="event-box">
                                    <Image
                                        src={`/images/venues/uploads/na.jpg`}
                                        alt="pic"
                                        width="1920"
                                        height="1080"
                                        layout="responsive"
                                        className="img-fluid"
                                    />
                                    <div className="event-box-caption">
                                        <div className="project-category text-white-50">
                                            13-23-22
                                        </div>
                                        <div className="project-name">
                                            the vanue name
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </div>


                        <div className="col-md-4 col-sm-12" key="2">
                            <Link href={`/show/the_slug`}>
                                <a className="event-box">
                                    <Image
                                        src={`/images/venues/uploads/na.jpg`}
                                        alt="pic"
                                        width="1920"
                                        height="1080"
                                        layout="responsive"
                                        className="img-fluid"
                                    />
                                    <div className="event-box-caption">
                                        <div className="project-category text-white-50">
                                            13-23-22
                                        </div>
                                        <div className="project-name">
                                            the vanue name
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </div>



                        <div className="col-md-4 col-sm-12" key="3">
                            <Link href={`/show/the_slug`}>
                                <a className="event-box">
                                    <Image
                                        src={`/images/venues/uploads/na.jpg`}
                                        alt="pic"
                                        width="1920"
                                        height="1080"
                                        layout="responsive"
                                        className="img-fluid"
                                    />
                                    <div className="event-box-caption">
                                        <div className="project-category text-white-50">
                                            13-23-22
                                        </div>
                                        <div className="project-name">
                                            the vanue name
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </div>


                    </div>
                </div>
            </div>

        </>
    )
}

export default Shows;