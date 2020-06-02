import React, { Component } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import './Cart.css';

export default class Cart extends Component {
    render() {
        return (
            <ScrollToBottom className="scroll-cart">
                { this.props.children }
            </ScrollToBottom>
        );
    }
}