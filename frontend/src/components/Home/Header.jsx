import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import Cart from '../Modal/Cart/Cart';
import CartItem from '../Modal/Cart/CartItem';

// import button checkout paypal
import PaypalButton from '../Modal/PaypalCheckout/PaypalButton';
import callAPI from '../../utils/connectAPI';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            cart: {
                products: [],
                total: 0
            },
            countCart: 0
        }
    }
    componentDidMount() {
        let user = JSON.parse(sessionStorage.getItem("user"));
        let cart = JSON.parse(sessionStorage.getItem("cart"));
        let countCart = Number(sessionStorage.getItem("countCart"));
        this.setState({ user, cart, countCart });
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

    isLogout = () => {
        if (sessionStorage.getItem("user")) {
            sessionStorage.removeItem("user");
            window.location.href = '/login';
        }
    }

    onDeleteItemCart = (id) => {
        let { cart } = this.state;
        cart.products = cart.products.filter(el => el._id !== id);

        let countCart = 0, total = 0;
        if (cart.products.length > 0) {
            cart.products.forEach(el => {
                total += el.price * el.quantity;
                countCart += el.quantity;
            });
        }
        cart.total = total;
        this.setState({cart, countCart});

        sessionStorage.setItem("cart", JSON.stringify(cart));
        sessionStorage.setItem("countCart", Number(countCart));

        if (this.props.isUpdateCheckout !== undefined)
            this.props.updateCartInCheckout(cart, countCart);

    }
    onChangQuantity = (_id, newQuantity) => {
        let { cart } = this.state;
        let countCart = 0, total = 0;
        if (cart.products.length > 0) {
            cart.products.forEach(el => {
                if (el._id === _id)
                    el.quantity = newQuantity;

                total += el.price * el.quantity;
                countCart += el.quantity;
            });
        }
        cart.total = total;
        this.setState({cart, countCart});

        sessionStorage.setItem("cart", JSON.stringify(cart));
        sessionStorage.setItem("countCart", Number(countCart));
    }
    showModalCartItem = (products) => {
        let result = null;
        if (products.length > 0) {
            result = products.map((element, index) => {
                return (
                    <CartItem
                        key={index} element={element} countCart={this.state.countCart}
                        onDeleteItemCart={this.onDeleteItemCart}
                        onChangQuantity={this.onChangQuantity}    
                    />
                );
            });
        }
        return result;
    }

    resultsPaypalPayment = (success, cancel, err) => {
        if (success) {
            this.onSaveBill("Thanh toán paypal");            
        }
        else if (cancel) {
            Swal.fire({
                icon: 'warning',
                title: cancel,
            });
        }
        else if (err) console.log(err);
    }

    onSaveBill = (checkout) => {
        let {user, cart} = this.state;
        sessionStorage.removeItem("cart");
        sessionStorage.removeItem("countCart");
        this.setState({
            cart: {
                products: [],
                total: 0
            },
            countCart: 0
        });
        let bill = {user, cart, isCheckout: true, checkout, shipAddress: user.person.address};
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
                    title = "Bạn đã mua hàng thành công!";
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
    }

    render() {
        let { user, cart, countCart } = this.state;
        return (
            <header>
                <div className="header-area">
                    <div id="sticky-header" className="main-header-area">
                        <div className="container-fluid">
                            <div className="header_bottom_border">
                                <div className="row align-items-center">
                                    <div className="col-xl-2 col-lg-2">
                                        <div className="logo">
                                            <Link to="/">
                                                <img src="../../images/logo.png" alt="logo" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-7 col-lg-7">
                                        <div className="main-menu  d-none d-lg-block">
                                            <nav>
                                                <ul id="navigation">
                                                    <li><Link className="active" to="/">trang chủ</Link></li>
                                                    <li><Link to="">diễn đàn <i className="fa fa-angle-down" /></Link>
                                                        <ul className="submenu">
                                                            <li><Link to="/blog">trang cá nhân</Link></li>
                                                            <li><Link to="/newfeed">cộng đồng</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <Link to="/place">địa điểm</Link>
                                                    </li>
                                                    <li><Link to="">mua sắm <i className="fa fa-angle-down" /></Link>
                                                        <ul className="submenu">
                                                            <li><Link to="/product">sản phẩm</Link></li>
                                                            <li><Link to="/payment-history">lịch sử đặt/mua hàng</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li><Link to="">hành trình <i className="fa fa-angle-down" /></Link>
                                                        <ul className="submenu">
                                                            <li><Link to="/schedule">Tạo lịch trình</Link></li>
                                                            <li><Link to="/list-schedule">Xem lịch trình</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li><Link to="/about">về chúng tôi</Link></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 d-none d-lg-block">
                                        <div className="social_wrap d-flex align-items-center justify-content-end">
                                        {
                                            user ? (
                                                <div className="avatar">
                                                    {
                                                        this.state.filePath ?
                                                            <img src={this.state.filePath} className="avatar" alt="ava"/>
                                                        :
                                                           <img src={user.avatar} className="avatar" alt="ava" />
                                                    }
                                                </div>
                                            ) : ''
                                        }
                                            &nbsp;&nbsp;
                                            <div className="number">
                                                <p>
                                                    {user ?
                                                        (
                                                            <span>
                                                                {user.person.name}
                                                            </span>
                                                        )
                                                        : ''
                                                    }
                                                </p>
                                            </div>
                                            
                                            <div className="option-cart">
                                                <Link to='' className="cart-icon">
                                                    <i className="fa fa-shopping-cart color-icon" />
                                                    { countCart > 0 ? <span className="cart-no"> {countCart < 10 ? `0${countCart}` : countCart} </span> : null }
                                                </Link>
                                                
                                                {/* import modal cart */}
                                                {
                                                    countCart > 0 ? (

                                                        <ul className="option-cart-item">
                                                            <Cart>
                                                                { this.showModalCartItem(cart.products) }
                                                            </Cart>

                                                            <li className="total">
                                                                <span className="pt-total">Tổng: <strong style={{fontSize: '20px'}}>${cart.total}</strong></span>
                                                                {
                                                                    user ? (
                                                                        <div>
                                                                            <PaypalButton
                                                                                resultsPaypalPayment={this.resultsPaypalPayment}
                                                                                order={cart}
                                                                            />
                                                                            <Link to="/checkout"> <button className="checkout">Đặt hàng</button> </Link>
                                                                            {/* <button className="checkout" onClick={() => this.onSaveBill("thanh toán trực tiếp")}>Thanh toán</button> */}
                                                                        </div>
                                                                    ) : <div>
                                                                            <br />
                                                                            <p className="css-hasnot-login">Bạn cần phải đăng nhập để thực hiện thanh toán</p>
                                                                        </div>
                                                                }
                                                            </li>
                                                        </ul>
                                                    ) : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="seach_icon">
                                        {user ?
                                            (<Link to=''>
                                                <i className="fa fa-sign-out" style={{fontSize: '1.5rem'}} onClick={() => this.isLogout()}></i>
                                            </Link>)
                                            :
                                            (<Link to='/login'>
                                                <i className="fa fa-sign-in" style={{fontSize: '1.5rem'}} />
                                            </Link>)
                                        }
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </header>
        );
    }
}

export default Header;