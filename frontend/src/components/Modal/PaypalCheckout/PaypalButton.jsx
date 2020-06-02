import React, { Component } from 'react';

import * as Config from '../../../constants/parameterConfig';

import PaypalCheckoutBtn from '../../../utils/paypaConfig';

export default class PaypalButton extends Component {
    render() {		
        const onSuccess = (payment) => {
            console.log("Your payment was succeeded!", payment);
            let success = true;
            this.props.resultsPaypalPayment(success, null, null);
        }	        
        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup! 
            // console.log('You have cancelled the payment!', data);
            let cancel = "Bạn đã hủy thanh toán!";
            this.props.resultsPaypalPayment(null, cancel, null);
        }	        
        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script! 
            console.log("Error!", err);
            // Since the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js" 
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
            this.props.resultsPaypalPayment(null, null, err);		 
        }		            

        // ]this is the cart amount (based on currency) to be paid by using Paypal express checkout 
        let order = this.props.order;
        let products = order.products.map(item => {
            return {
                "name": item.name,
                "price": item.price,
                "currency": "USD",
                "quantity": item.quantity
            }
        })
        return (
            <PaypalCheckoutBtn
                env={Config.PAYPAL_CONFIG.env}
                client={Config.PAYPAL_CONFIG.client}
                // style={{label: 'Thanh toán',size: 'medium',shape: 'react',color: 'gold'}}
                currency='USD'
                total={order.total}
                products={products}
                onError={onError}
                onSuccess={onSuccess}
                onCancel={onCancel}
            />
        );
    }  
}