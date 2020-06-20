import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

class Checkout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            shipAddress: ''
        }
    }

    componentDidMount() {
        let user = this.props.user;

        let shipAddress = user.person.address;
        this.setState({ shipAddress });
    }

    displayCartItem = (products) => {
        let result = null;
        if (products.length > 0) {
            result = products.map((element, index) => {
                return (
                    <div key={index} >
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
        if (this.state.shipAddress !== '')
            this.props.onOrderProducts(checkout, this.state.shipAddress);
        else
            Swal.fire({
                icon: 'warning',
                title: 'Chưa nhập địa chỉ nhận hàng',
            });
    }

    render() {
        let { user, cart, countCart } = this.props;

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
                    <button type='button' className="btn btn-warning" onClick={() => this.onSaveBill("Thanh toán khi nhận hàng (COD)")}>Xác nhận đặt hàng</button>
                </div>
            </div>
        );
    }
}

export default Checkout;