import React, { Component } from 'react';

import StartRating from './StarRating';

export default class EvaluationProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0
        };
    }

    onSaveRating = (ratingValue) => {
        this.setState({rating: ratingValue});
    }
    onSubmitRating = () => {
        this.props.onRecevieRatingValue(this.state.rating);
    }

    render() {
        let rating = this.state.rating, product = this.props.product, titleModal = 'Đánh giá của bạn';
        return (
            <div className="modal fade" id="toggleEvalutionProduct" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">{titleModal}</h5>                          
                            <button className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.onToggleEvaluation}>
                                <span aria-hidden="true">x</span>
                            </button>
                            
                        </div>
                        <div className="modal-body">
                            <div className="form-group row">
                                <div className="col-sm-6">
                                    Sản phẩm: &nbsp; <strong>{product.name}</strong>
                                </div>
                            </div>
                            <div className="form-group row" style={{textAlign: "center"}}>
                                <div className="col-sm-12">
                                    <StartRating
                                        numberOfStars={5}
                                        value={rating}
                                        size={40}
                                        editing={true}
                                        saveRating={this.onSaveRating}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-info" style={{width: '90px'}} data-dismiss="modal" onClick={this.onSubmitRating} >Lưu</button>
                            <button type="button" className="btn btn-secondary" style={{width: '90px'}} data-dismiss="modal" onClick={this.props.onToggleEvaluation} >Đóng</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}