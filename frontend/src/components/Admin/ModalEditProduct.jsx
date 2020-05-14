import React, { Component } from 'react';

class ModalEditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            productType: '',
            description: '',
            images: '',
            price: '',
            quantity: ''
        };
    }

    componentDidMount() {
        this.setState({
            name: this.props.product.name,
            productType: this.props.product.productType,
            description: this.props.product.description,
            images: this.props.product.images,
            price: this.props.product.price,
            quantity: this.props.product.quantity
        });
    }    

    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;

        this.setState({
            [name] : value
        });
    };

    onClose = () => {
        window.location = '/admin/product-management'
    }

    // onSubmit = (event) => {
    //     event.preventDefault();
    //     const p = {
    //         name: this.state.name,
    //         productType: this.state.productType,
    //         description: this.state.description,
    //         images: this.state.images,
    //         price: this.state.price,
    //         quantity: this.state.quantity
    //     }
    // }
    render() {
        console.log(this.state)
        return (
            <div className="modal fade" id="toggleUpdate" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Cập nhật sản phẩm</h5>                          
                            <button type="submit" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.onClose()}>
                                <span aria-hidden="true">×</span>
                            </button>
                            
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group row">
                                    <div className="col-sm-1" />
                                    <label htmlFor="productType" className="col-sm-3 col-form-label text-right">Tên sản phẩm</label>
                                    <div className="col-sm-6">
                                        <input className="form-control" name="name" value={this.state.name} onChange={(event) => this.onChange(event)} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-1" />
                                    <label htmlFor="productType" className="col-sm-3 col-form-label text-right">Loại sản phẩm</label>
                                    <div className="col-sm-6">
                                        <input className="form-control" name="productType" value={this.state.productType} onChange={(event) => this.onChange(event)}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-1" />
                                    <label htmlFor="description" className="col-sm-3 col-form-label text-right">Mô tả</label>
                                    <div className="col-sm-6">
                                        <input className="form-control" name="description" value={this.state.description} onChange={(event) => this.onChange(event)}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-1" />
                                    <label htmlFor="images" className="col-sm-3 col-form-label text-right">Hình ảnh</label>
                                    <div className="col-sm-6">
                                        <img src={this.state.images} alt="" style={{width:"50px"}}></img>
                                        <input type="file" name="images"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-1" />
                                    <label htmlFor="price" className="col-sm-3 col-form-label text-right">Giá</label>
                                    <div className="col-sm-6">
                                        <input className="form-control" name="price" value={this.state.price} onChange={(event) => this.onChange(event)}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-1" />
                                    <label htmlFor="quantity" className="col-sm-3 col-form-label text-right">Số lượng</label>
                                    <div className="col-sm-6">
                                        <input className="form-control" name="quantity" value={this.state.quantity} onChange={(event) => this.onChange(event)}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-4" />
                                    <div className="col-sm-6">
                                        <button type="submit" className="btn btn-info">Lưu</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.onClose()}>Đóng</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default ModalEditProduct;