import React, { Component } from 'react';
import Swal from 'sweetalert2';

import StarRating from '../../components/Evaluation/StarRating';

import './Product.css'

class ProductDetail extends Component {
    onChoose = (product, quantity) => {
        let tempQuantity = product.quantity;
        let cart = JSON.parse(sessionStorage.getItem("cart"));
        if (cart == null)
            cart = {
                products: [],
                total: 0
            };
        let countCart = 0;
        countCart = Number(sessionStorage.getItem("countCart"));
        if (countCart >= 10)
            Swal.fire({
                icon: 'warning',
                title: "Cảnh báo",
                text: "Số lượng sản phẩm trong giỏ hàng không được vượt quá 10",
            })
        else {
            let { products } = cart;
            let tempProduct = product;
            if (products.length > 0) {
                let flag = false;   // this product hasn't in cart
                cart.total = 0;     // reset total = 0 in cart
                products.forEach(el => {
                    if (el._id === product._id) {
                        flag = true;
                        el.quantity += quantity;

                        // kiểm tra số lượng sản phẩm này trong kho có còn cung cấp đủ hay ko?
                        if (el.quantity > product.quantity) {
                            el.quantity -= quantity;    // trả lại y củ số lượng sản phẩm này trong giỏ hàng
                            countCart -= quantity;
                            Swal.fire({
                                icon: 'warning',
                                title: "Cảnh báo",
                                text: "Số lượng sản phẩm trong kho không đủ để thêm vào giỏ hàng nữa",
                            })
                        }
                    }
                    cart.total += el.quantity * el.price;
                });
                if (!flag) {
                    tempProduct.quantity = quantity;
                    cart.total += tempProduct.price * quantity;
                    products.push(tempProduct);
                }
            }
            else {
                tempProduct.quantity = quantity;
                cart.total = tempProduct.price * quantity;
                products.push(tempProduct);
            }
            countCart += quantity;
            // cart.products = products;

            sessionStorage.setItem("cart", JSON.stringify(cart));
            sessionStorage.setItem("countCart", Number(countCart));

            // refresh
            let amount = this.props.amountCurrentItemCart;
            this.props.onAddItemIntoCart(++amount, product, tempQuantity);
        }
    }

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
                                    <p className="text-bold">Trạng thái: <span className="text-green">Còn hàng</span></p>
                                    :
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
                            { product.status === true ?
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