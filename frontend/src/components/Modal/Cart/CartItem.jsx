import React, { Component } from 'react';
import Swal from 'sweetalert2';

export default class CartItem extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            quantity: -1
        }
    }

    onDelete = (id) => {
        Swal.fire({
            title: 'Bạn có chắc?',
            text: "Bạn muốn xóa sản phẩm này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) this.props.onDeleteItemCart(id);
        })
    }

    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        this.setState({[name]: Number(target.value)});
    }
    onKeyPress = (event, _id, countCart, currentQuantity) => {
        if (event.key === 'Enter') {
            let quantity = this.state.quantity;
            if (quantity - currentQuantity + countCart > 10) {
                Swal.fire({
                    icon: 'warning',
                    title: "Cảnh báo",
                    text: "Số lượng sản phẩm trong giỏ hàng không được vượt quá 10",
                })
                this.setState({quantity: Number(currentQuantity)});
            }
            else if (quantity > 0)
                this.props.onChangQuantity(_id, quantity);
            else if (quantity === 0)
                this.onDelete(_id);
        }
    }

    render() {
        var { element, countCart } = this.props;
        var { quantity } = this.state;
        return (
            <li>
                <div className="cart-item">
                    <div className="image">
                        <img src={element.images} alt="anh" />
                    </div>
                    <div className="item-description">
                        <p className="name">{element.name}</p>
                        <p>Loại: <span className="light-red">{element.productType}</span><br />
                            Số lượng: <span className="light-red">
                                {
                                    quantity < 0 && quantity !== element.quantity
                                    ?   <input className="style-input" type="Number" name="quantity"
                                            onChange={this.onChange} value={element.quantity}
                                            onKeyPress={(event) => this.onKeyPress(event, element._id, countCart, element.quantity)} />
                                    :   <input className="style-input" type="Number" name="quantity"
                                            onChange={this.onChange} value={quantity}
                                            onKeyPress={(event) => this.onKeyPress(event, element._id, countCart, element.quantity)}  />
                                }
                            </span>
                        </p>
                    </div>
                    <div className="right">
                        <p className="price">${element.price}</p>
                        <button className="remove">
                            <i className="fa fa-remove" onClick={() => this.onDelete(element._id)} />
                        </button>
                    </div>
                </div>
            </li>
        );
    }
}