import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Banner extends Component {
    render() {
        return (
            <div className="bd-example">
                <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleCaptions" data-slide-to={0} className="active" />
                        <li data-target="#carouselExampleCaptions" data-slide-to={1} />
                        <li data-target="#carouselExampleCaptions" data-slide-to={2} />
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="/images/banner.png" className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-md-block">
                                <h3>Indonesia</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                <Link to="" className="boxed-btn3">Explore Now</Link>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="/images/banner2.png" className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-md-block">
                                <h3>Australia</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                <Link to="" className="boxed-btn3">Explore Now</Link>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="/images/banner3.png" className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-md-block">
                                <h3>Brazil</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                <Link to="" className="boxed-btn3">Explore Now</Link>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        );
    }
}

export default Banner;