import React, { Component } from 'react';
import Swal from 'sweetalert2';

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
                    this.setState({ billsOfAccount: res.data });
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
                        onCancelOrder={this.onCancelOrder}
                        onConfirmOrder={this.onConfirmOrder}
                    >
                        {this.showDetailBill(bill)}
                    </ListPurchase>
                );
            });
        }
        return result;
    }
    showDetailBill = (bill) => {
        let result = null, billDetail = bill.billDetail;
        if (billDetail.length > 0) {
            result = billDetail.map((product, index) => {
                return (
                    <ItemPurchase
                        key={index}
                        product={product}
                        bill_id={bill._id}
                        isCheckout={bill.isCheckout}
                    />
                );
            });
        }
        return result;
    }

    onCancelOrder = (bill) => {
        callAPI(`bill/${bill._id}`, 'DELETE', bill)
            .then(res => {
                if (res.data.result) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Hủy đơn hàng thành công!'
                    });
                    let billsOfAccount = this.state.billsOfAccount;
                    billsOfAccount = billsOfAccount.filter(el => el._id !== bill._id);
                    this.setState({ billsOfAccount });
                }
            })
            .catch((err) => { console.log(err) })
    }

    onConfirmOrder = (bill_id) => {
        callAPI(`bill/confirm/${bill_id}`, 'POST', null)
            .then(res => {
                if (res.data.result) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Xác nhận thành công!'
                    });
                    let billsOfAccount = this.state.billsOfAccount;
                    billsOfAccount = billsOfAccount.map(el => {
                        if (el._id === bill_id) {
                            el.orderdate = res.data.nowdate;
                            el.isCheckout = true;
                        }
                        return el;
                    });
                    this.setState({ billsOfAccount });
                }
            })
            .catch((err) => { console.log(err) })
    }

    render() {
        let { billsOfAccount } = this.state;
        return (
            <div>
                <Header />

                <div className="section_title text-center mb_70">
                    <h3>LỊCH SỬ ĐẶT/MUA HÀNG</h3>
                </div>

                {this.showListBills(billsOfAccount)}

                <Footer />
            </div>
        );
    }
}