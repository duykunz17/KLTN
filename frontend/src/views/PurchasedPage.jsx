import React, { Component } from 'react';

import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import ListPurchase from '../components/Purchased/ListPurchased';
import ItemPurchase from '../components/Purchased/ItemPurchase'

import callAPI from '../utils/connectAPI';

export default class PurchasedPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            billsOfAccount: []
        }
    }

    componentDidMount() {
        let user = JSON.parse(sessionStorage.getItem("user"));
        
        if (user)
            callAPI(`bill/account/${user._id}`, 'GET', null)
                .then(res => {
                    this.setState({billsOfAccount: res.data});
                })
                .catch((err) => { console.log(err) })
        else {
            let history = this.props.history;
            history.push('/login');
        }
        
    }

    showListBills = (bills) => {
        let result = null;
        if (bills.length > 0) {
            result = bills.map((bill, index) => {
                return (
                    <ListPurchase
                        key={index}
                        bill={bill}
                    >
                        { this.showDetailBill (bill._id, bill.billDetail) }
                    </ListPurchase>
                );
            });
        }
        return result;
    }
    showDetailBill = (bill_id ,billDetail) => {
        let result = null;
        if (billDetail.length > 0) {
            result = billDetail.map((product, index) => {
                return (
                    <ItemPurchase
                        key={index}
                        product={product}
                        bill_id={bill_id}
                    />
                );
            });
        }
        return result;
    }

    render() {
        let {billsOfAccount} = this.state;
        return (
            <div>
                <Header />

                { this.showListBills(billsOfAccount)}
                
                <Footer/>
            </div>
        );
    }
}