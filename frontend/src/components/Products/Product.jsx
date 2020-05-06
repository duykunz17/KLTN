import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import callAPI from '../../utils/connectAPI';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        callAPI('product', 'GET', null)
            .then(res => {
                this.setState({
                    products: res.data
                })
                //console.log(res.data);
            })
            .catch((err) => { console.log(err) })
    }

    render() {
        return (
            <div className="product_list">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="section_title text-center mb_70">
                                <h3>SẢN PHẨM</h3>
                                <p>Các sản phẩm, đồ dùng cần thiết cho những chuyến đi du lịch</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {this.state.products.map(product => {
                            return (
                                <div className="col-lg-4 col-md-6">
                                    <div className="single_product">
                                        <div className="thumb">
                                            <img src={product.images} alt=""/>
                                            <Link className="prise">${product.price}</Link>
                                        </div>
                                        <div className="product_info">
                                            <Link to="destination_details.html"><h3>{product.name}</h3></Link>
                                            <p>{product.description}</p>
                                            <button type="submit" className="btn btn-primary"><i className="fa fa-info-circle" /> Chi tiết</button>&nbsp;
                                            <button type="submit" className="btn btn-warning"><i className="fa fa-shopping-cart" /> Chọn mua</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;