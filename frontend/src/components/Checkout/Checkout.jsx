import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Checkout.css'
import callAPI from '../../utils/connectAPI';

class Checkout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            cart: {
                products: [],
                total: 0
            },
            countCart: 0,
            shipAddress: ''
        }
    }

    componentDidMount() {
        let user = JSON.parse(sessionStorage.getItem("user"));
        let cart = JSON.parse(sessionStorage.getItem("cart"));
        let countCart = Number(sessionStorage.getItem("countCart"));
        let shipAddress = user.person.address;
        this.setState({ user, cart, countCart, shipAddress });
    }

    componentDidUpdate(prevState) {
        let preAmount = prevState.amountCurrentItemCart, currAmount = this.props.amountCurrentItemCart;

        if (preAmount != null  && currAmount != null && preAmount < currAmount) {
            let user = JSON.parse(sessionStorage.getItem("user"));
            let cart = JSON.parse(sessionStorage.getItem("cart"));
            let countCart = Number(sessionStorage.getItem("countCart"));
            this.setState({ user, cart, countCart });
        }
    }

    displayCartItem = (products) => {
        let result = null;
        if (products.length > 0) {
            result = products.map((element, index) => {
                return (
                    <div>
                        <h5><img src={element.images} alt="anh" style={{height:'75px', width:'60px', border: '1px solid #cfcfcf'}} />
                            &nbsp;{element.quantity} x {element.name} x {element.price}.000₫</h5>
                        <div className="hr-line-dashed" />
                    </div>
                );
            });
        }
        return result;
    }

    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;

        this.setState({
            [name] : value
        });
    };

    onSaveBill = (checkout) => {
        let cart = this.state.cart;
        let shipAddress = this.state.shipAddress;
        sessionStorage.removeItem("cart");
        sessionStorage.removeItem("countCart");
        this.setState({
            cart: {
                products: [],
                total: 0
            },
            countCart: 0
        });
        let bill = {user: this.state.user, cart, checkout, shipAddress};
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
                    title = "Bạn đã thanh toán thành công!";
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
            })
            .catch((err) => { console.log(err) });
            window.location = '/'
    }

    render() {
        let { user, cart, countCart } = this.state
        if (user == null)
            return null;
        return (
            <div className="container">
                <div className="container check-out d-flex">
                    <div className="panel-left">
                        <div className="panel-title">Thông tin cá nhân</div>
                        <div className="panel-body">
                            <h5>Tên:</h5>
                            <p>{user.person.name}</p>
                            <h5>Số điện thoại :</h5>
                            <p>{user.person.phone}</p>
                            <h5>Email: </h5>
                            <p>{user.person.email}</p>
                        </div>
                        <div className="panel-title">Địa chỉ nhận hàng</div>
                        <div className="panel-body">
                            
                            <input className="form-control" type="text" defaultValue={this.state.shipAddress} name="shipAddress" onChange={(event) => this.onChange(event)}/>
                        </div>
                    </div>
                    <div className="panel-right">
                        <div className="panel-title">Thông tin đơn hàng ({countCart} sản phẩm)</div>
                        <div className="panel-body">
                            <h5>Sản phẩm: </h5>
                            {this.displayCartItem(cart.products)}
                            <h5>Thành tiền:</h5>
                            <b style={{color:'red'}}>{cart.total}.000₫</b>
                        </div>
                    </div>
                </div>
                <div className="button-redirect">
                    <Link to="/product" className="btn btn-success">Tiếp tục mua hàng</Link>
                    <Link className="btn btn-warning" onClick={() => this.onSaveBill("Thanh toán khi nhận hàng (COD)")}>Xác nhận đặt hàng</Link>
                </div>
            </div>
        );
    }
}

export default Checkout;