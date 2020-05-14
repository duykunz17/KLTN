import React, { Component } from 'react';

class ModalAddProduct extends Component {
    render() {
        return (
            <div className="modal fade" id="toggleAdd" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Cập nhật sản phẩm</h5>                          
                            <button type="submit" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group row">
                                    <div className="col-sm-1" />
                                    <label htmlFor="productType" className="col-sm-3 col-form-label text-right">Tên sản phẩm</label>
                                    <div className="col-sm-6">
                                        <input className="form-control" name="name"  />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-1" />
                                    <label htmlFor="productType" className="col-sm-3 col-form-label text-right">Loại sản phẩm</label>
                                    <div className="col-sm-6">
                                        <input className="form-control" name="productType" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-1" />
                                    <label htmlFor="description" className="col-sm-3 col-form-label text-right">Mô tả</label>
                                    <div className="col-sm-6">
                                        <input className="form-control" name="description" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-1" />
                                    <label htmlFor="images" className="col-sm-3 col-form-label text-right">Hình ảnh</label>
                                    <div className="col-sm-6">
                                        
                                        <input type="file" name="images"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-1" />
                                    <label htmlFor="price" className="col-sm-3 col-form-label text-right">Giá</label>
                                    <div className="col-sm-6">
                                        <input className="form-control" name="price" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-1" />
                                    <label htmlFor="quantity" className="col-sm-3 col-form-label text-right">Số lượng</label>
                                    <div className="col-sm-6">
                                        <input className="form-control" name="quantity" />
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
                            <button type="submit" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalAddProduct;