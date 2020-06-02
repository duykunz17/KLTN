import React, { Component } from 'react';
import Moment from 'react-moment';

export default class ListComments extends Component {

    displayListComments = (comments) => {
        let result = null;

        if (comments.length > 0) {
            result = comments.map((el, index) => {
                return (
                    <div key={index} className="comment-list">
                        <div className="single-comment justify-content-between d-flex">
                            <div className="user justify-content-between d-flex">
                                <div className="thumb">
                                    <img src={el.account.avatar} alt="error" />
                                </div>
                                <div className="desc">
                                    <p className="comment">
                                        {el.content}
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <h5>
                                                {el.account.person.name}
                                            </h5>
                                            <p className="date" style={{marginTop: '3px'}}>
                                                <Moment format="YYYY-MM-DD HH:mm:ss">
                                                    {el.commentDate}
                                                </Moment>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        return result;
    }

    render() {
        let { sumComment, comments } = this.props;
        return (
            <div className="comments-area">
                <h4>{sumComment} bình luận </h4>

                {/* List comments of user */}
                {this.displayListComments(comments)}
            </div>
        );
    }
}