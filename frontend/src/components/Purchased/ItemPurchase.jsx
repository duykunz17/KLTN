import React, { Component } from 'react';

import EvaluationProduct from '../Evaluation/EvalutionProduct';
import StartRating from '../Evaluation/StarRating';

import callAPI from '../../utils/connectAPI';

export default class ItemPurchase extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bill_id: '',
            product: {},
            onpenModal: false
        };
    }
    componentDidMount() {
        let { bill_id, product } = this.props;
        this.setState({bill_id, product})
    }

    onToggleEvaluation = () => {
        this.setState({onpenModal: !this.state.onpenModal})
    }
    onRecevieRatingValue = (ratingValue) => {
        this.setState({
            onpenModal: !this.state.onpenModal
        });
        let product = this.state.product;
        console.log(product);
        product.itemEvaluation = ratingValue;

        callAPI(`bill/update/${this.state.bill_id}`, 'POST', product)
            .then(res => {
                this.setState({product});
            })
            .catch((err) => { console.log(err) });
    }

    render() {
        var { product } = this.state;
        return (
            <div className="row item-purchase">
                <div className="col-lg-6 col-md-6">
                    <div className="item-image">
                        <img src={product.images} alt="error" />
                    </div>
                    <div className="item-info">
                        <p> {product.name} </p>
                        <p>Loại: {product.productType} </p>
                        <p>x {product.quantity} </p>
                        <p>Giá: ${product.price} </p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 style-review">
                    <p> ${product.quantity * product.price} </p>
                </div>
                <div className="col-lg-3 col-md-3 style-review">
                    {
                        // if product.itemEvaluation === null
                        product.itemEvaluation && product.itemEvaluation > 0 ? (
                            <StartRating
                                numberOfStars={5}
                                value={product.itemEvaluation}
                                size={40}
                                editing={false}
                            />
                        ) : // else show rating
                            <button type="button" className="btn btn-primary" onClick={this.onToggleEvaluation}
                                data-toggle="modal" data-target="#toggleEvalutionProduct" >Đánh giá</button>
                    }
                </div>

                {
                    this.state.onpenModal ? <EvaluationProduct product={product}
                                                onToggleEvaluation={this.onToggleEvaluation} onRecevieRatingValue={this.onRecevieRatingValue}
                                            /> : null
                }
            </div>
        );
    }
}