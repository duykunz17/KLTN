import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer_top">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-md-6 col-lg-4 ">
                                <div className="footer_widget" >
                                    <div className="footer_logo">
                                        <img src="../../images/ddtravel.png" width="250px" height="100px" alt="footer_logo" />
                                    </div>
                                    <p><i className="fa fa-map-marker"></i>  328 Phạm Văn Đồng, phường 1, <br />quận Gò Vấp, Tp. Hồ Chí Minh</p><br />
                                    <p><i className="fa fa-phone"></i>  (+84) 585868587</p><br />
                                    <p><i className="fa fa-envelope"></i>  testsend312@gmail.com@gmail.com</p>
                                </div>
                            </div>
                            <div className="col-xl-2 col-md-6 col-lg-2">
                                <div className="footer_widget">
                                    <h3 className="footer_title" style={{marginLeft:'8px'}}>
                                        Mạng xã hội
                                    </h3>
                                    <div className="socail_links">
                                    <ul>
                                        <li>
                                            <a href="http://facebook.com">
                                                <i className="fa fa-facebook" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="http://accounts.google.com">
                                                <i className="fa fa-google" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="http://instagram.com">
                                                <i className="fa fa-instagram" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="http://youtube.com">
                                                <i className="fa fa-youtube-play" />
                                            </a>
                                        </li>
                                    </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6 col-lg-3">
                                <div className="footer_widget">
                                    <h3 className="footer_title"> Địa điểm </h3>
                                    <ul className="links double_links">
                                        <li><Link to='/places/5eeb32cf98f87129604c4ecc'>Cà Mau</Link></li>
                                        <li><Link to='/places/5eeb31b398f87129604c4793'>Hà Nội</Link></li>
                                        <li><Link to='/places/5eeb31db98f87129604c48e0'>Lâm Đồng</Link></li>
                                        <li><Link to='/places/5eeb31ba98f87129604c480f'>Tp. Hồ Chí Minh</Link></li>
                                        <li><Link to='/places/5eeb322798f87129604c4ac6'>Cần Thơ</Link></li>
                                        <li><Link to='/places/5eeb32b798f87129604c4e40'>Đồng Tháp</Link></li>
                                        <li><Link to='/places/5eeb31c698f87129604c485a'>Đà Nẵng</Link></li>
                                        <li><Link to='/places/5eeb31cc98f87129604c48aa'>Bà Rịa - Vũng Tàu</Link></li>
                                        <li><Link to='/places/5eeb32df98f87129604c4f0c'>Hà Giang</Link></li>
                                        <li><Link to='/places/5eeb321a98f87129604c4a95'>Hải Phòng</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6 col-lg-3">
                                <div className="footer_widget">
                                    <h3 className="footer_title"> Hình ảnh nổi bật </h3>
                                    <div className="instagram_feed">
                                        <div className="single_insta">
                                            <img src="../../images/instagram/1.png" alt="" />
                                        </div>
                                        <div className="single_insta">
                                            <img src="../../images/instagram/2.png" alt="" />
                                        </div>
                                        <div className="single_insta">
                                            <img src="../../images/instagram/3.png" alt="" />
                                        </div>
                                        <div className="single_insta">
                                            <img src="../../images/instagram/4.png" alt="" />
                                        </div>
                                        <div className="single_insta">
                                            <img src="../../images/instagram/5.png" alt="" />
                                        </div>
                                        <div className="single_insta">
                                            <img src="../../images/instagram/6.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copy-right_text">
                    <div className="container">
                        <div className="footer_border">
                            <div className="row">
                                <div className="col-xl-12">
                                    <p className="copy_right text-center">
                                        Website du lịch và dịch vụ bán sản phẩm du lịch <br />
                                        Bản quyền thuộc về Nhóm 28 - Khóa luận tốt nghiệp ® 2020
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;