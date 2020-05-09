import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RecentTrip extends Component {
    render() {
        return (
            <div className="recent_trip_area">
                <div className="container">
                    <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="section_title text-center mb_70">
                        <h3>CHUYẾN ĐI GẦN ĐÂY</h3>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="single_trip">
                        <div className="thumb">
                            <img src="images/1.png" alt="" />
                        </div>
                        <div className="info">
                            <div className="date">
                            <span>Oct 12, 2019</span>
                            </div>
                            <Link to="">
                            <h3>Journeys Are Best Measured In
                                New Friends</h3>
                            </Link>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="single_trip">
                        <div className="thumb">
                            <img src="images/2.png" alt="" />
                        </div>
                        <div className="info">
                            <div className="date">
                            <span>Oct 12, 2019</span>
                            </div>
                            <Link to="">
                            <h3>Journeys Are Best Measured In
                                New Friends</h3>
                            </Link>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="single_trip">
                        <div className="thumb">
                            <img src="images/3.png" alt="" />
                        </div>
                        <div className="info">
                            <div className="date">
                            <span>Oct 12, 2019</span>
                            </div>
                            <Link to="">
                            <h3>Journeys Are Best Measured In
                                New Friends</h3>
                            </Link>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecentTrip;