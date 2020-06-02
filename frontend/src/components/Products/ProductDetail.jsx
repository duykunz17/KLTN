import React, { Component } from 'react';
import './Product.css'
import StarRating from '../../components/Evaluation/StarRating';

class ProductDetail extends Component {
    render() {
        let { product } = this.props;
        return (
            <div className="blog_area single-post-area section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12" >
                            <img src={product.images} alt="image_product" style={{ width: '500px', height: '500px' }}/>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <h1 className="display-5 text-left">{product.name}</h1>
                            {
                                product.status === true ?
                                    <p className="text-bold">Trạng thái: <span className="text-green">Còn hàng</span></p> :
                                    <p className="text-bold">Trạng thái: <span className="text-red">Hết hàng</span></p>
                            }
                            <hr />
                            <p className="text-bold">Loại sản phẩm: {product.productType}</p>
                            <p className="text-bold">Giá: {product.price}.000 VNĐ</p>
                            <div className="rating_days d-flex justify-content">
                                <StarRating
                                    numberOfStars={5}
                                    value={Math.round(product.rating)}
                                    size={15}
                                    editing={false}
                                /> &nbsp;<span>({product.review} lượt đánh giá)</span>
                            </div>
                            {
                                product.status === true ?
                                    <button className="btn btn-warning" onClick={() => this.onChoose(product, 1)}><i className="fa fa-shopping-cart" /> Chọn mua</button>
                                    : null
                            }
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-12" >
                            <h1>MÔ TẢ SẢN PHẨM</h1>
                            <p>{product.description}</p>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default ProductDetail; 