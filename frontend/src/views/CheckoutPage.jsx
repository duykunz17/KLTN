import React, { Component } from 'react';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import Checkout from '../components/Checkout/Checkout';
import Swal from 'sweetalert2';

import '../components/Checkout/Checkout.css';

import callAPI from '../utils/connectAPI';

class CheckoutPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            cart: {
                products: [],
                total: 0
            },
            countCart: 0,
            isUpdateCheckout: 0,
        }
    }

    componentDidMount() {
        let user = JSON.parse(sessionStorage.getItem("user"));
        if (user === null)
            this.props.history.push('/login');
        
        else {
            let cart = JSON.parse(sessionStorage.getItem("cart"));
            let countCart = Number(sessionStorage.getItem("countCart"));
            this.setState({ user, cart, countCart });
        }
    }

    onOrderProducts = (checkout, shipAddress) => {
        let {user, cart} = this.state;

        sessionStorage.removeItem("cart");
        sessionStorage.removeItem("countCart");
        this.setState({
            cart: {
                products: [],
                total: 0
            },
            countCart: 0
        });
        let bill = {user, cart, isCheckout: false, checkout, shipAddress};
        // use to api connect server to save Bill
        callAPI('bill/add', 'POST', {bill})
            .then(res => {
                let icon = 'success', title = "", text = "", outOfStock = res.data.outOfStock;
                if (res.data.success)
                    title = res.data.success;
                else if (res.data.fail) {
                    icon = "error";
                    title = res.data.fail;
                }
                else if(outOfStock) {
                    let length = outOfStock.length;
                    title = "Bạn đã đặt hàng thành công!";
                    text = `Xin lỗi! Chúng tôi đã bỏ qua sản phẩm (`;
                    for (let i = 0; i < length; i++) {
                        if (i === length - 1)
                            text += `${outOfStock[i].name}) do không đủ`;
                        else
                            text += `${outOfStock[i].name} - `;
                    }
                }
                Swal.fire({
                    icon,
                    title,
                    text
                });
                
                this.props.history.push('/payment-history');
            })
            .catch((err) => { console.log(err) });
        }

    updateCartInCheckout = (cart, countCart) => {
        this.setState({cart, countCart});
    }

    render() {
        let { user, cart, countCart, isUpdateCheckout } = this.state;
        if (user)
            return (
                <div>
                    <Header isUpdateCheckout={isUpdateCheckout} updateCartInCheckout={this.updateCartInCheckout} />
                    <div className="where_togo_area">
                        <h2 style={{ color: 'white', textAlign: 'center' }}>XÁC NHẬN ĐẶT HÀNG</h2>
                    </div>
                    
                    <Checkout user={user} cart={cart} countCart={countCart} onOrderProducts={this.onOrderProducts} />

                    <Footer/>
                </div>
            );
            
        else return null;
    }
}

export default CheckoutPage;