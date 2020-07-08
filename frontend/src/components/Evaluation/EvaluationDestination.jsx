import React, { Component } from 'react';
import Swal from 'sweetalert2';

import './evaluation.css';

import StarRating from './StarRating';
import ModalPlaceEvalution from '../Modal/PlaceEvalution/ModalPlaceEvalution';


import uploadMultipleImagePost from '../../utils/uploadMultipleImagePost';
import callAPI from '../../utils/connectAPI';

export default class EvaluationDestination extends Component {
    constructor(props) {
        super(props);

        this.state = {
            destination: {},
            user: null,
            isButtonEvaluation: false,
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
        this.setState({ user, destination, rating });
    }

    // onSaveRating = (ratingValue) => {
    //     let destination = this.state.destination, avg_rating = (destination.rating + ratingValue) / 2;
    //     let data = { rating: avg_rating, review: destination.review + 1, account: this.state.user, voted: ratingValue };
    //     callAPI(`place/evaluate-destination/${destination._id}`, 'POST', data)
    //         .then(res => {
    //             if (res.data.result) {
    //                 destination.rating = avg_rating;
    //                 destination.review += 1;
    //                 this.setState({ destination, rating: ratingValue });
    //             }
    //         }).catch(err => console.log(err));
    // }
    onSubmitReview = async (title, content, ratingValue, files) => {
        let destination = this.state.destination, avg_rating = (destination.rating + ratingValue) / 2;
        let data = {
            rating: avg_rating, review: destination.review + 1,
            account: this.state.user,
            voted: ratingValue,
            title,
            content,
            images: []
        }, evalutions = destination.evaluations;

        if (files.length > 0) {
            await uploadMultipleImagePost(files, url => {
                data.images = url;
                if (data.images.length === files.length) {
                    callAPI(`place/evaluate-destination/${destination._id}`, 'POST', data)
                        .then(res => {
                            if (res.data.result) {
                                destination.rating = avg_rating;
                                destination.review += 1;
                                this.setState({ destination, rating: ratingValue });

                                // console.log(res.data.result);
                                // sử dụng this props để gọi đến thằng cha load Review vừa đánh giá
                                evalutions.push(data);
                                this.props.onReceiveReview(evalutions);

                            }
                        }).catch(err => console.log(err));
                }
            });
        }
        else {
            callAPI(`place/evaluate-destination/${destination._id}`, 'POST', data)
                .then(res => {
                    if (res.data.result) {
                        destination.rating = avg_rating;
                        destination.review += 1;
                        this.setState({ destination, rating: ratingValue });

                        // sử dụng this props để gọi đến thằng cha load Review vừa đánh giá
                        evalutions.push(data);
                        this.props.onReceiveReview(evalutions);
                    }
                }).catch(err => console.log(err));
        }
    }

    onOpenToggleModal = (isButtonEvaluation) => {
        if (this.state.user)
            this.setState({ isButtonEvaluation });
        else
            Swal.fire({
                icon: 'warning',
                title: "Vui lòng đăng nhập trước khi đánh giá.",
            });
    }

    render() {
        let { destination, user, isButtonEvaluation, rating } = this.state;
        let toFixedRating = Number(destination.rating).toFixed(1);
        return (
            <div className="containt-review">
                <div className="review-left">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <h3>Đánh giá chung</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 style-destination-review">
                            <div className="ava-rating"> <p>{toFixedRating}</p> </div>
                            <div className="ml-4">
                                <StarRating
                                    numberOfStars={5}
                                    value={toFixedRating}
                                    size={40}
                                    editing={false}
                                />
                            </div>
                            <div className="total-rating"> <p>{destination.review} người đánh giá</p> </div>
                        </div>
                    </div>
                </div>

                <div className="review-right">
                    <div className="row">
                        <div className="col-lg-12 col-md-12" style={{ marginLeft: '-25px' }}> <h3>Đánh giá của bạn</h3> </div>
                    </div>
                    <div className="row">
                        {
                            user ? (
                                <div className="col-lg-12 col-md-12">
                                    {
                                        rating > 0 ? (
                                            <div className="style-rating">
                                                <div className="ava-your-rating"> <p>{rating}.0</p> </div>
                                                <div>
                                                    <StarRating
                                                        numberOfStars={5}
                                                        value={rating}
                                                        size={40}
                                                        // If rating > 0 then you have evaluated so you can't edit
                                                        editing={false}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                                <button className="btn btn-warning tt-uppercase"
                                                    data-toggle="modal" data-target="#placeReview" onClick={() => this.onOpenToggleModal(true)}>

                                                    Viết đánh giá
                                                </button>
                                            )
                                    }
                                    {
                                        isButtonEvaluation ? <ModalPlaceEvalution destination={destination} onSubmitReview={this.onSubmitReview} /> : null
                                    }
                                </div>
                            ) : (
                                    <div className="col-lg-12 col-md-12">
                                        <button className="btn btn-warning tt-uppercase"
                                            data-toggle="modal" data-target="#placeReview" onClick={() => this.onOpenToggleModal(true)}>
                                            Viết đánh giá
                                        </button>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        );
    }
}