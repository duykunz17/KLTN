import React, { Component } from 'react';
import Swal from 'sweetalert2';
// import Utils upload images to firebase
import uploadImageToFirebase from '../../../utils/uploadImageToFirebase';

export default class ModalActionsProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: null,
            name: '',
            productType: '',
            description: '',
            images: '',
            price: 0,
            quantity: 0,
            file: null,
            filePath: null
        };
    }

    onSetSate = (product) => {
        if (product._id) {
            this.setState({
                _id: product._id,
                name: product.name,
                productType: product.productType,
                description: product.description,
                images: product.images,
                price: product.price,
                quantity: product.quantity,
                file: null,
                filePath: null
            });

        }
        else
            this.setState({
                _id: null,
                name: '',
                productType: '',
                description: '',
                images: '',
                price: 0,
                quantity: 0,
                file: null,
                filePath: null
            });
            document.getElementById('errUploadImage').innerHTML = '';
    }

    componentDidMount() {
        this.onSetSate(this.props.product)
    }
    componentDidUpdate(prevProps) {
        if (this.props.product._id !== prevProps.product._id)
            this.onSetSate(this.props.product)
    }

    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;

        if (name === 'price' && value > Math.pow(9, 10))
            Swal.fire({
                icon: 'warning',
                title: 'Giá bạn nhập quá cao',
            });
        if (name === 'quantity' && value > Math.pow(9, 10))
            Swal.fire({
                icon: 'warning',
                title: 'Số lượng bạn nhập quá lớn',
            });

        this.setState({
            [name]: value
        });
    };
    onChangeImage = (event) => {
        let file = event.target.files[0];
        if (file) {
            this.setState({ file, images: file.name });

            document.getElementById('errUploadImage').innerHTML = '';

            let reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    filePath: reader.result
                });
            }
            reader.readAsDataURL(event.target.files[0])
        }
    };

    onSubmit = async (event) => {
        event.preventDefault();
        let { _id, name, productType, description, images, price, quantity, file } = this.state;
        if (!file && images === '')
            Swal.fire({
                icon: 'warning',
                title: 'Ảnh không được để rỗng',
            });
        else {
            let checkType = false, checkQuantity = false, checkPrice = false;
            if (productType !== '') {
                checkType = true;
                document.getElementById('errType').innerHTML = '';
            }
            else {
                document.getElementById('errType').style.color = 'red';
                document.getElementById('errType').innerHTML = 'Loại sản phẩm không được rỗng.';
            }

            if (quantity !== '') {
                if (quantity < 0) {
                    document.getElementById('errQuantity').style.color = 'red';
                    document.getElementById('errQuantity').innerHTML = 'Số lượng nhập phải >= 0.';
                }
                else {
                    checkQuantity = true;
                    document.getElementById('errQuantity').innerHTML = '';
                }
            }
            else {
                document.getElementById('errQuantity').style.color = 'red';
                document.getElementById('errQuantity').innerHTML = 'Số lượng không được rỗng.';
            }

            if (price !== '') {
                if (price < 0) {
                    document.getElementById('errPrice').style.color = 'red';
                    document.getElementById('errPrice').innerHTML = 'Giá nhập phải >= 0.';
                }
                else {
                    checkPrice = true;
                    document.getElementById('errPrice').innerHTML = '';
                }
            }
            else {
                document.getElementById('errPrice').style.color = 'red';
                document.getElementById('errPrice').innerHTML = 'Giá không được rỗng.';
            }

            if (checkType && checkPrice && checkQuantity) {
                if (file) {
                    let rexImage = /^image\/(jpeg|jpg|png|gif)/;
                    if (!rexImage.test(file.type)) {
                        document.getElementById('errUploadImage').style.color = 'red';
                        document.getElementById('errUploadImage').innerHTML = 'File không hợp lệ (đuôi file phải là "jpeg|jpg|png|gif"). Hãy thử lại!';
                    }
                    else {
                        await uploadImageToFirebase(file, url => {
                            // console.log(url);
                            images = url;
                            let product = { _id, name, productType, description, images, price, quantity };
        
                            this.props.updateInfoProduct(product);
                        })
                    }
                }
                else {
                    let product = { _id, name, productType, description, images, price, quantity };
                    this.props.updateInfoProduct(product);
                }
            }
        }
    }

    render() {
        let { _id, name, productType, description, images, price, quantity, filePath } = this.state;
        let titleModal = _id ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm';
        return (
            <div className="modal fade" id="toggleUpdate" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">{titleModal}</h5>
                            <button type="submit" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>

                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group row">
                                    <div className="col-sm-1" />
                                    <label htmlFor="productType" className="col-sm-3 col-form-label text-right">Tên sản phẩm</label>
                                    <div className="col-sm-6">
                                        <input className="form-control" name="name" value={name} onChange={this.onChange} required />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-1" />
                                    <label htmlFor="productType" className="col-sm-3 col-form-label text-right" required >Loại sản phẩm</label>
                                    <div className="col-sm-6">
                                        <input className="form-control" name="productType" value={productType} onChange={this.onChange} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-1" />
                                    <label htmlFor="productType" className="col-sm-3 col-form-label text-right"></label>
                                    <div className="col-sm-8">
                                        <span id="errType" />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-sm-1" />
                                    <label htmlFor="description" className="col-sm-3 col-form-label text-right">Mô tả</label>
                                    <div className="col-sm-6">
                                        <input className="form-control" name="description" value={description} onChange={this.onChange} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-1" />
                                    <label htmlFor="images" className="col-sm-3 col-form-label text-right">Hình ảnh</label>
                                    <div className="col-sm-6">
                                        {filePath ?
                                            <img src={filePath} alt="product" style={{ width: "70px" }} />
                                            : <img src={images} alt="" style={{ width: "70px" }} />
                                        }
                                        <input type="file" name="file" onChange={this.onChangeImage} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-1" />
                                    <label htmlFor="images" className="col-sm-3 col-form-label text-right"></label>
                                    <div className="col-sm-8">
                                        <span id="errUploadImage" />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-sm-1" />
                                    <label htmlFor="price" className="col-sm-3 col-form-label text-right">Giá</label>
                                    <div className="col-sm-6">
                                        <input type="Number" className="form-control" name="price" value={price} onChange={this.onChange} required />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-1" />
                                    <label htmlFor="price" className="col-sm-3 col-form-label text-right"></label>
                                    <div className="col-sm-8">
                                        <span id="errPrice" />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-sm-1" />
                                    <label htmlFor="quantity" className="col-sm-3 col-form-label text-right">Số lượng</label>
                                    <div className="col-sm-6">
                                        <input type="Number" className="form-control" name="quantity" min='0' value={quantity} onChange={this.onChange} required />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-1" />
                                    <label htmlFor="quantity" className="col-sm-3 col-form-label text-right"></label>
                                    <div className="col-sm-8">
                                        <span id="errQuantity" />
                                    </div>
                                </div>
                                
                                <div className="form-group row">
                                    <div className="col-sm-4" />
                                    <div className="col-sm-6">
                                        <button type="submit" className="btn btn-info" style={{ width: '90px' }} >Lưu</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" style={{ width: '90px' }} data-dismiss="modal" >Đóng</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}