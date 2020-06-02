import React, { Component } from 'react';

export default class StarRating extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            rating: 0,
            hover: 0
        };
    }

    onStarClick = (ratingValue) => {
        this.setState({rating: ratingValue});

        this.props.saveRating(ratingValue);
    }
    onSetHover = (ratingValue) => {
        this.setState({hover: ratingValue});
    }

    render() {
        let { numberOfStars, size, editing, value } = this.props, margin_right = size < 20 ? "1px" : "5px";
        let { rating, hover } = this.state;
        return (
            <div className="star-rating">
                {[...Array(numberOfStars)].map((star, i) => {
                    let ratingValue = i + 1;
                    let styleColor = ratingValue <= (hover || rating) ? "#ffc107" : "gray";
                    return (
                        editing ? (
                            <label key={i}>
                                <input type="radio" name="rating"
                                    value={ratingValue} onClick={() => this.onStarClick(ratingValue)}
                                />
                                <i className="star fa fa-star"
                                    style={{fontSize: `${size}px`, color: styleColor, marginRight: margin_right}}
                                    onMouseLeave={() => this.onSetHover(0)}
                                    onMouseEnter={() => this.onSetHover(ratingValue)}
                                />
                            </label>
                        ) : (
                            <label key={i}>
                                <input type="radio" name="rating" value={ratingValue} />
                                <i className="star fa fa-star"
                                    style={{fontSize: `${size}px`, color: ratingValue <= value ? "#ffc107" : "e4e5e9", marginRight: margin_right}}
                                />
                            </label>
                        )
                    )
                })
                }
            </div>
        );
    }
}