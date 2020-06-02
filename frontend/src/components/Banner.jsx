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
                                <h3>Dat Mui</h3>
                                <p>xã Đất Mũi, huyện Ngọc Hiển, tỉnh Cà Mau</p>
                                <Link to="" className="boxed-btn3">Khám phá ngay</Link>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="/images/banner2.png" className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-md-block">
                                <h3>Dam Sen</h3>
                                <p>3 Hòa Bình, phường 3, quận 11, Tp. Hồ Chí Minh</p>
                                <Link to="" className="boxed-btn3">Khám phá ngay</Link>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="/images/banner3.png" className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-md-block">
                                <h3>Da Lat</h3>
                                <p>Tp. Đà Lạt, tỉnh Lâm Đồng</p>
                                <Link to="" className="boxed-btn3">Khám phá ngay</Link>
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