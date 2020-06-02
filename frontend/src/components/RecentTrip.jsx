import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class RecentTrip extends Component {
    render() {
        let { post } = this.props;
        return (
            
                    <div className="col-lg-4 col-md-6">
                        <div className="single_trip">
                        <div className="thumb">
                            <img src={post.images} alt="" style={{width:'349.98px', height:'261.04px'}}/>
                        </div>
                        
                        <div className="info">
                            <div className="social_wrap d-flex align-items-center justify-content">
                                <div className="avatar">
                                    <img src={post.account.avatar} className="avatar" alt="ava" /> 
                                </div>
                                &nbsp;&nbsp;
                                <div className="number">
                                    <span>
                                        <b>{post.account.person.name}</b> <br/>
                                        <Moment format="YYYY-MM-DD HH:mm">
                                            <span>{post.postDate}</span>
                                        </Moment>
                                    </span>
                                </div>
                            </div>
                            <Link to="">
                                <h3>{post.content}</h3>
                            </Link>
                        </div>
                        </div>
                    </div>
                    
        );
    }
}

export default RecentTrip;