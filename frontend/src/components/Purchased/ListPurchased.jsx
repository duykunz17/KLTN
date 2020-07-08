import React, { Component } from 'react';
import Moment from 'react-moment';
import Swal from 'sweetalert2';

import './purchase.css';

export default class ListPurchase extends Component {

    onCancelOrder = (bill) => {
        Swal.fire({
            title: 'Bạn có chắc?',
            text: "Bạn muốn hủy đơn đặt hàng này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) this.props.onCancelOrder(bill);
        })
    }

    render() {
        let { bill } = this.props
        return (
            <div className="purchase-content" style={{ backgroundColor: '#f7fafd' }}>
                <div className="header-purchase">
                    <div className="row">
                        <div className="col-lg-4 col-md-4">
                            <p>
                                <span className="style-font">Ngày mua: &nbsp;&nbsp; </span>
                                <Moment format="YYYY-MM-DD HH:mm:ss">
                                    {bill.orderdate}
                                </Moment>
                            </p>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <p> <span className="style-font">Hình thức: &nbsp;&nbsp; </span> {bill.checkout} </p>
                        </div>
                    </div>
                </div>

                { this.props.children }

                <div className="footer-purchase">
                    <div className="row">
                        <div className="col-lg-5 col-md-5">

                        </div>
                        <div className="col-lg-4 col-md-4" style={{paddingLeft: "120px"}}>
                            <p className="style-total">Tổng tiền: &nbsp; ${bill.total} </p>
                        </div>
                    </div>

                    {
                        bill.isCheckout === false ? (
                            <div className="row">
                                <div className="col-lg-8 col-md-8"> </div>

                                <div className="col-lg-4 col-md-4" style={{textAlign: "center"}}>
                                    <button type='button' className="btn btn-danger" style={{marginRight: "25px"}}
                                        onClick={() => this.onCancelOrder(bill)}
                                    > Hủy đơn hàng </button>
                                    <button type='button' className="btn btn-success"
                                        onClick={() => this.props.onConfirmOrder(bill._id)}
                                    > Đã nhận hàng </button>
                                </div>
                            </div>
                        ) : null
                    }
                    
                </div>
            </div>
        );
    }
}