import React, { Component } from 'react';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import Checkout from '../components/Checkout/Checkout';
import '../components/Checkout/Checkout.css'

class CheckoutPage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="where_togo_area">
                    <h2 style={{ color: 'white', textAlign: 'center' }}>XÁC NHẬN ĐẶT HÀNG</h2>
                </div>
                <Checkout/>
                <Footer/>
            </div>
        );
    }
}

export default CheckoutPage;