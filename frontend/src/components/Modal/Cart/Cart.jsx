import React, { Component } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import './Cart.css';

export default class Cart extends Component {

    render() {
        var { total } = this.props;
        return (
            <ul className="option-cart-item">
                <ScrollToBottom className="scroll-cart">
                    { this.props.children }
                </ScrollToBottom>

                <li className="total">
                    <span className="pt-total" >Tổng: <strong>${total}</strong></span>
                    <button className="checkout">Thanh toán</button>
                </li>
            </ul>
        );
    }
}