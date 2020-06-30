import React, { Component } from 'react';
import Swal from 'sweetalert2';

import uploadMultipleImagePost from '../../../utils/uploadMultipleImagePost';

export default class FormPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            files: [],
            filePath: []
        }
    }

    onChangeImage = (event) => {
        this.setState({
            filePath: [],
            files: []
        });
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

    componentDidUpdate(prevState) {
        if (this.props.countPost !== prevState.countPost)
            this.setState({
                content: '',
                files: [],
                filePath: []
            })
    }

    displayListImagePost = (filePath) => {
        return filePath.map((currentPath, index) => {
            return (
                <div key={index}>
                    <img src={currentPath} alt="errorImage" style={{ width: "70px", marginRight: "10px" }} />
                    <br /><br />
                    <span id="errImage"></span>
                </div>
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

    onSubmit = async (event) => {
        event.preventDefault();
        let { images, files } = this.state;
        if (files.length <= 0)
            Swal.fire({
                icon: 'warning',
                title: 'Ảnh không được để rỗng',
            });

        if (files.length > 0) {
            let checkImage = true;
            files.forEach(f => {
                let rexImage = /^image\/(jpeg|jpg|png|gif)/;
                if (!rexImage.test(f.type)) {
                    checkImage = false;
                    document.getElementById('errImage').style.color = 'red';
                    document.getElementById('errImage').innerHTML = 'File không hợp lệ (đuôi file phải là "jpeg|jpg|png|gif"). Hãy thử lại!';
                }
            });

            if (checkImage) {
                document.getElementById('errImage').innerHTML = '';
                await uploadMultipleImagePost(files, url => {
                    images = url;
                    if (images.length === files.length) {
                        let post = {
                            content: this.state.content,
                            images: images
                        }
                        this.props.onSavePost(post);
                    }
                });
            }
        }
    }

    render() {
        return (
            <div className="card w-100" style={{ borderRadius: '10px' }}>
                <p className="text-center mt-3" style={{ fontWeight: 'bold', fontSize: '30px', color: 'black' }}> Tạo bài viết </p>
                <hr />
                <form onSubmit={(event) => this.onSubmit(event)} className="w-100">
                    <div className="input-group style-btn-post">
                        <label className="clicked-btn-post">
                            <input type="file" name="files" multiple="multiple" onChange={(event) => this.onChangeImage(event)} />
                            <span className="btn btn-outline-secondary btn-lg ml-2" style={{ borderRadius: '15px' }}><i className="fa fa-picture-o" aria-hidden="true"></i> Chọn ảnh</span>
                        </label>
                    </div>
                    <hr />
                    <div className="input-group">
                        {
                            this.state.filePath.length > 0
                                ? this.displayListImagePost(this.state.filePath)
                                : null
                        }
                    </div>
                    <div className="input-group mt-2 mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon">
                                <i className="fa fa-pencil-alt prefix"></i>
                            </span>
                        </div>
                        <textarea className="textarea-info" id="exampleFormControlTextarea1" rows="50" required placeholder="Bạn đang nghĩ gì nào? Hãy viết những lời chia sẻ vào đây!"
                            name="content" value={this.state.content} onChange={(event) => this.onChange(event)}>
                        </textarea>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-center mt-4 mb-4 ml-2 mr-2">
                        <button type="submit" className="btn btn-outline-primary btn-lg btn-block" style={{ borderRadius: '20px' }}> Đăng bài </button>
                    </div>
                </form>
            </div>
        );
    }
}