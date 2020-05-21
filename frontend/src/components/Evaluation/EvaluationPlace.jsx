import React, { Component } from 'react';

import './evaluation.css';

import StarRating from './StarRating';

import callAPI from '../../utils/connectAPI';

export default class Evaluation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            place: {},
            user: null,
            rating: 0
        }
    }
    componentDidMount() {
        let place = this.props.place;
        let rating = 0, user = JSON.parse(sessionStorage.getItem("user"));
        console.log(place)
        if (place.evaluations && user)
            place.evaluations.forEach(item => {
                if (item.account._id === user._id)
                    rating += item.voted;
            });
        
        this.setState({user, place, rating});        
    }

    onSaveRating = (ratingValue) => {
        let place = this.state.place, avg_rating = (place.rating + ratingValue) / 2;
        let data = {rating: avg_rating, review: place.review + 1, account: this.state.user, voted: ratingValue};
        callAPI(`place/evaluate-place/${place._id}`, 'POST', data)
            .then(res => {
                if (res.data.result) {
                    place.rating = avg_rating;
                    place.review += 1;
                    this.setState({place, rating: ratingValue});
                }
            }).catch(err => console.log(err));
    }

    render() {
        let {place, user, rating} = this.state;
        return (
            <div className="containt-review">
                <div className="row">
                    <div className="col-lg-4 col-md-4">
                        <h3>Đánh giá</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 style-css">
                        <div className="ava-rating"> <p>{place.rating}</p> </div>
                        <StarRating
                            numberOfStars={5}
                            value={Math.round(place.rating)}
                            size={40}
                            editing={false}
                        />
                        <div className="total-rating"> <p>{place.review} người đánh giá</p> </div>
                    </div>
                    {
                        user ? (
                            <div className="col-lg-4 col-md-4 style-css">
                                <div className="your-rating"> <p>Đánh giá của bạn</p> </div>
                                <StarRating
                                    numberOfStars={5}
                                    value={rating}
                                    size={40}
                                    // If rating > 0 then you have evaluated so you can't edit
                                    editing={rating > 0 ? false : true}
                                    saveRating={this.onSaveRating}
                                />
                            </div>
                        ) : null 
                    }
                    
                </div>
            </div>
        );
    }
}