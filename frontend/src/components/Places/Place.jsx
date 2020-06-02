import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Place extends Component {

    render() {
        var { place } = this.props;
        return (
            <div className="col-lg-4 col-md-6">
                <div className="single_place">
                    <div className="thumb">
                        <img src={place.images} alt="" />
                    </div>
                    <div className="place_info">
                        <Link to={"/place/" + place._id} key={place._id}><h3> {place.name}</h3></Link>
                        <p>{place.area}</p>
                    </div>
                </div>
            </div>
        );
    }
}