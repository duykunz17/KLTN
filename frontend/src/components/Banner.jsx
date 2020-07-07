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
                            <img src="https://media.gody.vn//images/ca-mau/hon-khoai/12-2016/20161227083611-hon-khoai-gody%20(1).jpg" style={{width:'1920px', height:'650px'}} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-md-block">
                                <h3>Hon Khoai</h3>
                                <p>Huyện Trần Văn Thời, Tỉnh Cà Mau</p>
                                <Link to="/places/destination/5f004219df601cc08d5eac79" className="boxed-btn3">Khám phá ngay</Link>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img src="https://media.gody.vn//images/binh-dinh/eo-gio/11-2016/20161111080624-eo-gio-quy-nhon-gody%20(2).jpg" style={{width:'1920px', height:'650px'}} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-md-block">
                                <h3>Eo Gio</h3>
                                <p>Tp. Quy Nhơn, Tỉnh Bình Định</p>
                                <Link to="/places/destination/5f004219df601cc08d5eaab0" className="boxed-btn3">Khám phá ngay</Link>
                            </div>
                        </div>
                        
                        <div className="carousel-item">
                            <img src="https://media.gody.vn//images/dong-thap/tram-chim/10-2016/20161019063847-tram-chim-gody%20(1).jpg" style={{width:'1920px', height:'650px'}} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-md-block">
                                <h3>Tram Chim</h3>
                                <p>Huyện Tam Nông, tỉnh Đồng Tháp</p>
                                <Link to="/places/destination/5f004219df601cc08d5eabe9" className="boxed-btn3">Khám phá ngay</Link>
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