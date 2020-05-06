import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Modal from '../Modal/UpdateInfo';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
    }

    componentWillMount() {
        let user = JSON.parse(sessionStorage.getItem("user"));
        this.setState({ user });
    }

    isLogout = () => {
        if (sessionStorage.getItem("user")) {
            sessionStorage.removeItem("user");
            window.location.href = '/login';
        }

    }
    render() {
        let { user } = this.state;
        return (
            <header>
                <div className="header-area">
                    <div id="sticky-header" className="main-header-area">
                        <div className="container-fluid">
                            <div className="header_bottom_border">
                                <div className="row align-items-center">
                                    <div className="col-xl-2 col-lg-2">
                                        <div className="logo">
                                            <Link to="/">
                                                <img src="../images/logo.png" alt="logo" style={{ marginLeft: '-50px' }} />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6">
                                        <div className="main-menu  d-none d-lg-block">
                                            <nav>
                                                <ul id="navigation">
                                                    <li><Link className="active" to="/">home</Link></li>
                                                    <li><Link to="">diễn đàn <i className="fa fa-angle-down" /></Link>
                                                        <ul className="submenu">
                                                            <li><Link to="/single-blog">trang cá nhân</Link></li>
                                                            <li><Link to="/blog">new feed</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <Link to="/place">địa điểm</Link>
                                                    </li>
                                                    <li><Link to="/product">sản phẩm</Link></li>
                                                    <li><Link to="/about">về chúng tôi</Link></li>
                                                    <li><Link to="/contact">liên hệ</Link></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 d-none d-lg-block">
                                        <div className="social_wrap d-flex align-items-center justify-content-end">
                                        {user ?
                                            (<div className="avatar">
                                            {this.state.filePath ?
                                                <img src={this.state.filePath} className="avatar" alt=""/>
                                                : <img src={user.avatar} className="avatar" alt="" />}
                                            </div>)
                                            : ''
                                        }
                                            &nbsp;&nbsp;&nbsp;
                                            <div className="number">
                                                <p>
                                                    {user ?
                                                        (
                                                            <span>
                                                                <button data-toggle="modal" data-target="#updateInfoModal"> {user.person.name} </button>
                                                            </span>
                                                        )
                                                        : ''
                                                    }
                                                </p>
                                            </div>
                                            <Link to=""><i className="fa fa-shopping-cart" style={{fontSize: '1.5rem', color: '#ff4a52', paddingLeft: '-50px'}}></i></Link>
                                        </div>
                                    </div>
                                    
                                    <div className="seach_icon">
                                        {user ?
                                            (<Link to=''>
                                                <i className="fa fa-sign-out" style={{fontSize: '1.5rem'}} onClick={() => this.isLogout()}></i>
                                            </Link>)
                                            :
                                            (<Link to='/login'>
                                                <i className="fa fa-sign-in" style={{fontSize: '1.5rem'}} />
                                            </Link>)
                                        }
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {user ? <Modal user={user} /> : null}

            </header>
        );
    }
}

export default Header;