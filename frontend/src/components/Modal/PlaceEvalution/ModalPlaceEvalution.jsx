import React, { Component } from 'react';
import Swal from 'sweetalert2';

import './PlaceEvalution.css';

import StarRating from '../../Evaluation/StarRating';

export default class ModalPlaceEvalution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            rating: 0,
            files: [],
            filePath: [],
            isCheckReview: false
        };
    }

    onChangeImage = (event) => {
        this.setState({
            filePath: [],
            files: []
        });
        document.getElementById('errImageReview').innerHTML = '';
        let files = Array.from(event.target.files);
        if (files.length > 0) {
            files.forEach((f) => {
                let reader = new FileReader();
                // console.log(f.type);
                reader.onloadend = () => {
                    this.setState({
                        files: [...this.state.files, f],
                        filePath: [...this.state.filePath, reader.result],

                    });
                    //console.log(reader.result)
                }
                reader.readAsDataURL(f)
            });
        }
    };

    displayListImage = (filePath) => {
        return filePath.map((currentPath, index) => {
            return (
                <img key={index} className="ajax-file-upload-preview" src={currentPath} alt="errorImage" />
            )
        })
    }

    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;

        this.setState({
            [name]: value
        });
    };
    onSaveRating = (rating) => {
        this.setState({ rating });
    }
    onSubmitEvaluation = () => {
        let { title, content, rating, files } = this.state;

        let checkTitle = false, checkContent = false, checkRating = false, checkImage = true;
        if (title.length < 2 || title.length > 255)
            document.getElementById('errTitle').style.color = 'red';
        else {
            document.getElementById('errTitle').style.color = '#666666';
            checkTitle = true;
        }
        if (content.length < 2 || content.length > 2000)
            document.getElementById('errContent').style.color = 'red';
        else {
            document.getElementById('errContent').style.color = '#666666';
            checkContent = true;
        }
        if (rating === 0)
            document.getElementById('errRating').style.color = 'red';
        else {
            document.getElementById('errRating').style.color = '#666666';
            checkRating = true;
        }
        if (files.length > 0) {
            files.forEach(f => {
                let rexImage = /^image\/(jpeg|jpg|png|gif)/;
                if (!rexImage.test(f.type)) {
                    checkImage = false;
                    document.getElementById('errImageReview').style.color = 'red';
                    document.getElementById('errImageReview').innerHTML = 'File không hợp lệ (đuôi file phải là "jpeg|jpg|png|gif"). Hãy thử lại!';
                }
            });
        }

        if (checkTitle && checkContent && checkRating && checkImage) {
            document.getElementById('errImageReview').innerHTML = '';
            Swal.fire({
                icon: 'success',
                title: "Đánh giá địa điểm thành công ",
            });
            this.setState({isCheckReview: true});
            
            this.props.onSubmitReview(title, content, rating, files);
        }
    }

    render() {
        let { title, content, filePath, isCheckReview } = this.state;
        let { destination } = this.props;
        return (
            <div className="modal fade in" id="placeReview" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header" style={{ background: "#f3f3f3" }}>
                            <h4 className="modal-title h-30 overflow-hidden" id="exampleModalCenterTitle"> Đánh giá của bạn về {destination.name} </h4>
                            <button type="submit" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" className="fs-25" >X</span>
                            </button>

                        </div>
                        <div className="modal-body p-0 m-0">
                            <span className="live-rating" style={{ verticalAlign: "top", float: "left", lineHeight: "26px", paddingLeft: "10px", fontWeight: "bold", fontSize: "25px" }} />
                            <div className="clearfix" />
                            <div className="w-fit d-block m-0 pl-20 pr-20 mb-10">
                                <StarRating
                                    numberOfStars={5}
                                    value={0}
                                    size={40}
                                    // If rating > 0 then you have evaluated so you can't edit
                                    editing={true}
                                    saveRating={this.onSaveRating}
                                />
                                <span id="errRating" className="lh-24 fs-12 w-50% d-inline-block error-review-star">Bắt buộc</span>
                            </div>

                            <div className="clearfix" />
                            <div className="w-fit d-block m-0 pl-20 pr-20 mb-10">
                                <div className="ps-relative w-fit d-block">
                                    <input type="text" name="title" placeholder="Tiêu đề đánh giá" value={title} onChange={this.onChange}
                                        className="h-50 w-fit bn card5 bar-5 pl-10 outline-none" />
                                    <div className="w-fit d-block">
                                        <span id="errTitle" className="lh-24 fs-12 w-50% d-inline-block error-review-title">Từ 2 tới 255 ký tự</span>
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix "></div>
                            <div className="w-fit d-block m-0 pl-20 pr-20 mb-10">
                                <textarea name="content" className="w-fit d-block bn bar-5 card5 outline-none content-p-5"
                                    value={content} onChange={this.onChange}
                                    placeholder="Nội dung đánh giá"
                                    style={{ width: "160px", height: "100px", display: "inline-block", border: "5px dotted #ddd", borderRadius: "13px", overflow: "hidden" }} >
                                </textarea>
                                <div className="w-fit d-block">
                                    <span id="errContent" className="lh-24 fs-12 w-50% d-inline-block error-review-content">Từ 2 tới 2000 ký tự</span>
                                </div>
                            </div>
                            <div className="clearfix" />
                            <div className="w-fit d-block m-0 pl-20 pr-20 mb-10 mt-5">
                                <div className="c-pointer va-top style-btn-review" id="images-review-place"
                                    style={{
                                        width: "160px", height: "100px", border: "2px dotted #ddd", display: "inline-block",
                                        borderRadius: "5px", textAlign: "center", position: "relative"
                                    }}
                                >
                                    <label className="clicked-btn-review">
                                        <input type="file" name="files" multiple="multiple" onChange={(event) => this.onChangeImage(event)} />
                                        <span aria-hidden="true">
                                            <i className="fa fa-plus fs-18 fc-nineth"
                                                style={{ position: "absolute", top: "calc( 100% - 50% - 10px )", left: "calc( 100% - 50% - 10px )" }}>
                                            </i>
                                        </span>
                                    </label>
                                </div>
                                {/* load image đã chọn */}
                                <div className="d-inline-block va-top" style={{ width: "calc(100% - 180px)" }}>
                                    <div className="ajax-file-upload-container">
                                        {
                                            filePath.length > 0 ? this.displayListImage(filePath) : null
                                        }
                                    </div>
                                </div>
                                <div className="w-fit d-block">
                                        <span id="errImageReview" className="lh-24 fs-12 w-50% d-inline-block error-review-content"></span>
                                </div>
                            </div>

                            <div className="clearfix" />
                            <div className="w-fit d-block p-0 m-0 mb-20">
                                
                                <div className="ta-center" style={{ margin: "25px auto" }}>
                                    {
                                        isCheckReview ?
                                            <button type="button" className="h-50 w-200 lh-50 bg-primary fc-white fs-18 bar-5 c-pointer d-inline-block"
                                                style={{ margin: "0px auto" }} data-dismiss="modal" > ĐÓNG
                                            </button>
                                        :    
                                            <button type="button" className="h-50 w-200 lh-50 bg-primary fc-white fs-18 bar-5 c-pointer d-inline-block"
                                                style={{ margin: "0px auto" }} onClick={this.onSubmitEvaluation} > GỬI
                                            </button>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}