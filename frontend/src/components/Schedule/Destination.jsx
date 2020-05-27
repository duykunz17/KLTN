import React, { Component } from 'react';
import StarRating from '../Evaluation/StarRating';

class Destination extends Component {
    render() {
        let { des } = this.props;
        return (
            <div className="col-6 recommend-pois" >
                <div className="list-item">
                    <button className="mask-gb-btn" type="button" onClick={() => this.props.onChoose(des)} >
                        <img src={des.images} alt="err" className="image_lmimg" />
                        <i className="fa fa-plus-circle hide" aria-hidden="true" />
                    </button>
                    <div className="title">
                        <div className="rating_days d-flex justify-content-between">
                            <StarRating
                                numberOfStars={5}
                                value={Math.round(des.rating)}
                                size={10}
                                editing={false}
                            />
                            <span className="d-flex justify-content-center align-items-center">
                                {des.review} đánh giá
                            </span>
                            {/* <div className="days">
                                <i className="fa fa-clock-o" />
                                <Link to="">5 Days</Link>
                            </div> */}
                        </div>
                        <h2>{des.name}</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Destination;