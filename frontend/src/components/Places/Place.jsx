import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import StarRating from './Evaluation/StarRating';

export default class Place extends Component {

    render() {
        var { place } = this.props;
        return (
            <div className="col-lg-4 col-md-6">
                <div className="single_place">
                    <div className="thumb">
                        <img src={place.images} alt="" />
                        <Link to="" className="prise">$500</Link>
                    </div>
                    <div className="place_info">
                        <Link to={"/place/" + place._id} key={place._id}><h3> {place.name}</h3></Link>
                        <p>{place.area}</p>
                        <div className="rating_days d-flex justify-content-between">
                            <StarRating
                                numberOfStars={5}
                                value={Math.round(place.rating)}
                                size={10}
                                editing={false}
                            />
                            <span className="d-flex justify-content-center align-items-center">
                                <Link to="">{place.review} đánh giá</Link>
                            </span>
                            <div className="days">
                                <i className="fa fa-clock-o" />
                                <Link to="">5 Days</Link>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}