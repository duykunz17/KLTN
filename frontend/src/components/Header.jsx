import React, { Component } from 'react';
class Header extends Component {
    isLogout = () => {
        if(sessionStorage.getItem("username")){
            sessionStorage.removeItem("username");
            window.location.href = '/';
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
                                <a href="index.html">
                                <img src="images/logo.png" alt="" style={{marginLeft:'-50px'}}/>
                                </a>
                            </div>
                            </div>
                            <div className="col-xl-6 col-lg-6">
                            <div className="main-menu  d-none d-lg-block">
                                <nav>
                                <ul id="navigation">
                                    <li><a className="active" href="index.html">home</a></li>
                                    <li><a href="about.html">About</a></li>
                                    <li><a className href="travel_destination.html">Destination</a>
                                    </li><li><a href>pages <i className="fa fa-angle-down" /></a>
                                    <ul className="submenu">
                                        <li><a href="destination_details.html">Destinations details</a></li>
                                        <li><a href="elements.html">elements</a></li>
                                    </ul>
                                    </li>
                                    <li><a href>blog <i className="fa fa-angle-down" /></a>
                                    <ul className="submenu">
                                        <li><a href="blog.html">blog</a></li>
                                        <li><a href="single-blog.html">single-blog</a></li>
                                    </ul>
                                    </li>
                                    <li><a href="contact.html">Contact</a></li>
                                </ul>
                                </nav>
                            </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 d-none d-lg-block">
                            <div className="social_wrap d-flex align-items-center justify-content-end">
                                <div className="number">
                                <p> <i className="fa fa-user" /> {sessionStorage.getItem('username')} </p>
                                </div>
                            </div>
                            </div>
                            <div className="seach_icon">
                            <a href>
                                <i className="fa fa-sign-out" onClick={() => this.isLogout()}></i>
                            </a>
                            </div>
                            <div className="col-12">
                            <div className="mobile_menu d-block d-lg-none" />
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
          
                <div className="modal fade custom_search_pop" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="serch_form">
                        <input type="text" placeholder="Search" />
                        <button type="submit">search</button>
                    </div>
                    </div>
                </div>
                </div>
            </header>
        );
    }
}

export default Header;