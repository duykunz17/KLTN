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
        this.setState({user});
    }

    isLogout = () => {
        if(sessionStorage.getItem("user")){
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
                                            <Link to="index.html">
                                                <img src="../images/logo.png" alt="logo" style={{marginLeft:'-50px'}}/>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6">
                                        <div className="main-menu  d-none d-lg-block">
                                            <nav>
                                                <ul id="navigation">
                                                    <li><Link className="active" to="/">home</Link></li>
                                                    <li><Link to="/about">About</Link></li>
                                                    <li>
                                                        <Link to="/travel_destination">Destination</Link>
                                                    </li>
                                                    <li><Link to=''>pages <i className="fa fa-angle-down" /></Link>
                                                        <ul className="submenu">
                                                            <li><Link to="/destination_details">Destinations details</Link></li>
                                                            <li><Link to="/elements">elements</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li><Link to="">blog <i className="fa fa-angle-down" /></Link>
                                                        <ul className="submenu">
                                                            <li><Link to="/blog">blog</Link></li>
                                                            <li><Link to="/single-blog">single-blog</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li><Link to="/contact">Contact</Link></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 d-none d-lg-block">
                                        <div className="social_wrap d-flex align-items-center justify-content-end">
                                            <div className="number">
                                                <p> 
                                                        {user ? 
                                                            (   
                                                                <span>
                                                                    <i className="fa fa-user" />
                                                                    <button data-toggle="modal" data-target="#updateInfoModal"> {user.person.name} </button>
                                                                </span>
                                                                
                                                            )
                                                            : ''
                                                        }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="seach_icon">
                                        {user ? 
                                            (<Link to=''>
                                                <i className="fa fa-sign-out" onClick={() => this.isLogout()}></i>
                                            </Link>)
                                            :
                                            (<Link to='/login'>
                                                <i className="fa fa-sign-in" />
                                            </Link>)
                                        }
                                    </div>
                                    <div className="col-12">
                                        <div className="mobile_menu d-block d-lg-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                { user ? <Modal  user={user} /> : null }
                
            </header>
        );
    }
}

export default Header;