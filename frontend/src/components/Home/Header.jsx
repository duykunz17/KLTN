import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Modal from '../Modal/UpdateInfo';

import Cart from '../Modal/Cart/Cart';
import CartItem from '../Modal/Cart/CartItem';

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
                                                <img src="../images/logo.png" alt="logo" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6">
                                        <div className="main-menu  d-none d-lg-block">
                                            <nav>
                                                <ul id="navigation">
                                                    <li><Link className="active" to="/">home</Link></li>
                                                    <li><Link to="">diễn đàn <i className="fa fa-angle-down" /></Link>
                                                        <ul className="submenu">
                                                            <li><Link to="/single-blog">trang cá nhân</Link></li>
                                                            <li><Link to="/blog">new feed</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <Link to="/place">địa điểm</Link>
                                                    </li>
                                                    <li><Link to="/product">sản phẩm</Link></li>
                                                    <li><Link to="/about">về chúng tôi</Link></li>
                                                    <li><Link to="/contact">liên hệ</Link></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 d-none d-lg-block">
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
                                                                <button data-toggle="modal" data-target="#updateInfoModal"> {user.person.name} </button>
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
                                                        <Cart total={cart.total} >
                                                            { this.showModalCartItem(cart.products) }
                                                        </Cart>
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
                { user ? <Modal user={user} /> : null }

            </header>
        );
    }
}

export default Header;