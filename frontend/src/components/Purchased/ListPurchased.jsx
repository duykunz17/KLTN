import React, { Component } from 'react';
import Moment from 'react-moment';

import './purchase.css';

export default class ListPurchase extends Component {

    render() {
        let bill = this.props.bill;
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
                            <p className="style-font">Tổng tiền: &nbsp; ${bill.total} </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}