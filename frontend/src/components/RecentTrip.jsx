import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class RecentTrip extends Component {
    render() {
        let { post } = this.props;
        return (
            <div className="col-lg-4 col-md-6">
                <div className="post_populartrip">
                    <label className="mask-lable">
                        <img src={post.images} alt="err" style={{ width: '349.98px', height: '261.04px' }} />
                        <span className="hide-posticon">
                            <i className="fa fa-heart" > {post.sumLike} </i>
                            &nbsp;&nbsp;
                            <i className="fa fa-comment" > {post.comments.length} </i>
                        </span>
                    </label>
                    <div className="info">
                        <div className="social_wrap d-flex align-items-center justify-content">
                            <div className="avatar">
                                <img src={post.account.avatar} className="avatar" alt="ava" />
                            </div>
                                &nbsp;&nbsp;
                            <div className="number">
                                <span>
                                    <b>{post.account.person.name}</b> <br />
                                    <Moment format="YYYY-MM-DD HH:mm:ss">
                                        {post.postDate}
                                    </Moment>
                                </span>
                            </div>
                        </div>
                        <Link to={'/post-detail/' + post._id}>
                            <span className="css-content"> {post.content} </span>
                        </Link>
                    </div>
                </div>
            </div>

        );
    }
}

export default RecentTrip;