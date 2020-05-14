import React, { Component } from 'react';
import callAPI from '../../utils/connectAPI';
import { MDBDataTable, Row, Col, Card, CardBody } from 'mdbreact';
import Swal from 'sweetalert2';
import ModalEditProduct from './ModalEditProduct';

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                columns: [

                ],
                rows: [
                   
                ]
            },
            product: null,
            statusBtnAdd: true
        };
    }

    toggle = (product) => {
        this.setState({product})
    }
    
    deleteProduct = (id) => {
        Swal.fire({
            title: 'Bạn có chắc?',
            text: "Bạn muốn xóa sản phẩm này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        }).then((result) => {
            if (result.value) {
                var tempData = this.state.data.rows.filter(item => item._id !== id);
                this.setState({
                  data : {
                    columns: [
                        {
                            label: 'Tên sản phẩm',
                            field: 'name',
                            sort: 'asc',
                            
                        },
                        {
                            label: 'Loại sản phẩm',
                            field: 'productType',
                            sort: 'asc',
        
                        },
                        {
                            label: 'Mô tả',
                            field: 'description',
                            sort: 'asc',
        
                        },
                        {
                            label: 'Hình ảnh',
                            field: 'images' ,
                            sort: 'asc',
                        },
                        {
                            label: 'Giá',
                            field: 'price',
                            sort: 'asc',
        
                        },
                        {
                            label: 'Số lượng',
                            field: 'quantity',
                            sort: 'asc',
                        },  
                        {
                            label: 'Cập nhật',
                            field: 'update',
                            
                        },
                        {
                            label: 'Xóa',
                            field: 'delete'
                        }   
                    ],
                      rows: tempData
                  }
                });
        
                callAPI(`admin/product/`+id, 'DELETE', null)
                    .then(res => console.log(res.data))
            }
        })
        
    }

    componentDidMount() {
        callAPI('admin/product', 'GET', null)
            .then(res => {
                this.setState({
                    data: {
                        columns: [
                            {
                                label: 'Tên sản phẩm',
                                field: 'name',
                                sort: 'asc',
                                
                            },
                            {
                                label: 'Loại sản phẩm',
                                field: 'productType',
                                sort: 'asc',

                            },
                            {
                                label: 'Mô tả',
                                field: 'description',
                                sort: 'asc',

                            },
                            {
                                label: 'Hình ảnh',
                                field: 'images' ,
                                sort: 'asc',
                            },
                            {
                                label: 'Giá',
                                field: 'price',
                                sort: 'asc',

                            },
                            {
                                label: 'Số lượng',
                                field: 'quantity',
                                sort: 'asc',
                            },  
                            {
                                label: 'Cập nhật',
                                field: 'update',
                                
                            },
                            {
                                label: 'Xóa',
                                field: 'delete'
                            }   
                        ],
                        
                        rows: res.data.map((row, key) => ({
                            ...row,
                            images: (
                                <img src={row.images} alt="" style={{width: '50px'}}  />
                            ),
                            update: (
                                <button className="btn btn-warning" data-toggle="modal" data-target="#toggleUpdate" onClick={() => this.toggle(row)}>
                                    <i className="fa fa-edit"></i>
                                </button>
                                
                            ),
                            delete: (
                                <button className="btn btn-danger">
                                    <i className="fa fa-trash" onClick={() => this.deleteProduct(row._id)}></i>
                                </button>
                            )
                            
                        }))
                    }
                })
            })
            .catch((err) => { console.log(err) })
    }

    displayModalAddProduct = () => {
        if(this.state.statusBtnAdd === true){
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
                                <button type="submit" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.onClose()}>Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    render() {
        var { data, product } = this.state
        return (
           
            <Row className="mb-4">
                
                <Col md="12">
                    
                <button className="btn btn-primary" data-toggle="modal" data-target="#toggleAdd" onClick={() =>this.displayModalAddProduct()}>
                    <i className="fa fa-plus"> Thêm sản phẩm</i>
                </button>
                
                    <Card>

                        <CardBody>
                        
                            <MDBDataTable
                                striped
                                bordered
                                hover
                                data={data}
                                entriesLabel="Hiển thị"
                                infoLabel={["Hiển thị", "đến", "trong số", "mục"]}
                                pagesAmount={10}
                                paginationLabel={["Trang trước", "Trang kế"]}
                                searchLabel="Tìm theo tên sản phẩm"
                                noBottomColumns
                            >
                            </MDBDataTable>
                            
                        </CardBody>

                    </Card>

                </Col>
                { product ? <ModalEditProduct product={product}/> : null }
            </Row>

        );
    }
}

export default DataTable;