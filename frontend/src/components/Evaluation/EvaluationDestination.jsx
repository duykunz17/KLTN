import React, { Component } from 'react';

import './evaluation.css';

import StarRating from './StarRating';

import callAPI from '../../utils/connectAPI';

export default class EvaluationDestination extends Component {
    constructor(props) {
        super(props);

        this.state = {
            destination: {},
            user: null,
            rating: 0
        }
    }
    componentDidMount() {
        let destination = this.props.destination;
        let rating = 0, user = JSON.parse(sessionStorage.getItem("user"));
        // console.log(destination);
        if (destination.evaluations && user)
            destination.evaluations.forEach(item => {
                if (item.account._id === user._id)
                    rating += item.voted;
            });
        this.setState({user, destination, rating});        
    }

    onSaveRating = (ratingValue) => {
        let destination = this.state.destination, avg_rating = (destination.rating + ratingValue) / 2;
        let data = {rating: avg_rating, review: destination.review + 1, account: this.state.user, voted: ratingValue};
        callAPI(`place/evaluate-destination/${destination._id}`, 'POST', data)
            .then(res => {
                if (res.data.result) {
                    destination.rating = avg_rating;
                    destination.review += 1;
                    this.setState({destination, rating: ratingValue});
                }
            }).catch(err => console.log(err));
    }

    render() {
        let {destination, user, rating} = this.state;
        return (
            <div className="containt-review">
                <div className="row">
                    <div className="col-lg-4 col-md-4">
                        <h3>Đánh giá</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 style-css">
                        <div className="ava-rating"> <p>{destination.rating}</p> </div>
                        <StarRating
                            numberOfStars={5}
                            value={Math.round(destination.rating)}
                            size={40}
                            editing={false}
                        />
                        <div className="total-rating"> <p>{destination.review} người đánh giá</p> </div>
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