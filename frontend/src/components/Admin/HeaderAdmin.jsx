import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HeaderAdmin extends Component {

    componentDidMount() {
        let account = JSON.parse(sessionStorage.getItem("user"));
        if (account === null) {
            let history = this.props.history;
            history.push('/login');
        }
        else if (account.roles !== 1) {
            let history = this.props.history;
            history.push('/notfound');
        }
    }

    isLogout = () => {
        if (sessionStorage.getItem("user")) {
            sessionStorage.removeItem("user");
            window.location.href = '/login';
        }
    }

    render() {
        return (
            <header>
                <div className="header-area">
                    <div id="sticky-header" className="main-header-area">
                        <div className="container-fluid">
                            <div className="header_bottom_border">
                                <div className="row align-items-center">
                                    <div className="col-xl-2 col-lg-2">
                                        <div className="logo">
                                            <img src="../images/ddtravel.png" width="170px" height="100px" alt="logo" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6">
                                        <div className="main-menu  d-none d-lg-block">
                                            <nav>
                                                <ul id="navigation">
                                                    <li><Link to="/admin/product-management">quản lý <i className="fa fa-angle-down" /></Link>
                                                        <ul className="submenu">
                                                            <li><Link to="/admin/product-management">sản phẩm dịch vụ</Link></li>
                                                            <li><Link to="/admin/post-management">bài đăng</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li><Link to="/admin/statistical-product-best-seller">thống kê <i className="fa fa-angle-down" /></Link>
                                                        <ul className="submenu">
                                                            <li><Link to="/admin/statistical-product-best-seller">sản phẩm bán chạy</Link></li>
                                                            <li><Link to="/admin/statistical-renvenue-sale">doanh thu sản phẩm</Link></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 d-none d-lg-block">
                                        <div className="social_wrap d-flex align-items-center justify-content-end">
                                            <div className="number">
                                                <span> Admin </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="seach_icon">
                                        <Link to='/login'>
                                            <i className="fa fa-sign-out" style={{ fontSize: '1.5rem' }} onClick={() => this.isLogout()}></i>
                                        </Link>
                                    </div>
                                    <div className="col-12">
                                        <div className="mobile_menu d-block d-lg-none"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* { user ? <Modal user={user} /> : null } */}
            </header>
        );
    }
}

export default HeaderAdmin;