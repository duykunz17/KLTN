import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            window.location.href = '/';
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
                                <img src="images/logo.png" alt="" style={{marginLeft:'-50px'}}/>
                                </Link>
                            </div>
                            </div>
                            <div className="col-xl-6 col-lg-6">
                            <div className="main-menu  d-none d-lg-block">
                                <nav>
                                <ul id="navigation">
                                    <li><Link className="active" to="index.html">home</Link></li>
                                    <li><Link to="about.html">About</Link></li>
                                    <li><Link className to="travel_destination.html">Destination</Link>
                                    </li><li><Link >pages <i className="fa fa-angle-down" /></Link>
                                    <ul className="submenu">
                                        <li><Link to="destination_details.html">Destinations details</Link></li>
                                        <li><Link to="elements.html">elements</Link></li>
                                    </ul>
                                    </li>
                                    <li><a href>blog <i className="fa fa-angle-down" /></a>
                                    <ul className="submenu">
                                        <li><Link to="blog.html">blog</Link></li>
                                        <li><Link to="single-blog.html">single-blog</Link></li>
                                    </ul>
                                    </li>
                                    <li><Link to="contact.html">Contact</Link></li>
                                </ul>
                                </nav>
                            </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 d-none d-lg-block">
                            <div className="social_wrap d-flex align-items-center justify-content-end">
                                <div className="number">
                                <p> <i className="fa fa-user" /> {user.username} </p>
                                </div>
                            </div>
                            </div>
                            <div className="seach_icon">
                            <Link to=''>
                                <i className="fa fa-sign-out" onClick={() => this.isLogout()}></i>
                            </Link>
                            </div>
                            <div className="col-12">
                            <div className="mobile_menu d-block d-lg-none" />
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;