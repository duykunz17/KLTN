import React, { Component } from 'react';
import callAPI from '../../../utils/connectAPI';
import { MDBDataTable, Row, Col, Card, CardBody } from 'mdbreact';
import Swal from 'sweetalert2';
import ModalActionsProduct from './ModalActionsProduct';

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

    onSetStateData = (products) => {
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
                rows: products.map((row, key) => ({
                    ...row,
                    images: (
                        <img src={row.images} alt="" style={{width: '50px'}}  />
                    ),
                    update: (
                        <button className="btn btn-warning" data-toggle="modal" data-target="#toggleUpdate" onClick={() => this.onOpenToggleModal(row)}>
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
        });
    }

    onOpenToggleModal = (product) => {
        // if product != null call modal edit
        if (product)
            this.setState({product})
        else
            this.setState({product: {}})
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
                var tempData = this.state.data.rows.filter(item => {
                    item.images = item.images.props.src;
                    return item._id !== id;
                });
                this.onSetStateData(tempData);
        
                callAPI(`admin/product/`+id, 'DELETE', null)
                    .then(res => console.log(res.data))
            }
        })
    }

    componentDidMount() {
        callAPI('admin/product', 'GET', null)
            .then(res => {
                this.onSetStateData(res.data);
            })
            .catch((err) => { console.log(err) })
    }

    updateInfoProduct = (product) => {
        let products = this.state.data.rows;
        callAPI(`admin/product/update/${product._id}`, 'POST', product)
            .then(res => {
                if (res.data.messSuccess) {
                    Swal.fire({
                        icon: 'success',
                        title: res.data.messSuccess,
                    });

                    console.log(product)
                    products = products.map(item => {
                        item.images = item.images.props.src;  // vì sao khi update thì field images trở thành 1 object nên phải chuyển nó thành String
                        if (item._id === product._id)
                            item = product;
                        return item;
                    })
                    this.onSetStateData(products);
                    console.log("PRODUCT UPDATED");
                }
            }).catch(err => console.log(err));
            
        window.location = '/admin/product-management'                   

    }

    render() {
        var { data, product } = this.state;
        return (
           
            <Row className="mb-4">
                
                <Col md="12">
                    
                <button className="btn btn-primary add-modal-product" data-toggle="modal" data-target="#toggleUpdate" onClick={() => this.onOpenToggleModal(null)}>
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
                { product ? <ModalActionsProduct product={product} updateInfoProduct={this.updateInfoProduct} /> : null }
            </Row>

        );
    }
}

export default DataTable;