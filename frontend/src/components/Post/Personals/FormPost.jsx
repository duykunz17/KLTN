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
        //console.log(file)
        if (files.length > 0) {
            files.forEach((f) => {
                let reader = new FileReader();

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
            return (<img src={currentPath} key={index} alt="errorImage" style={{ width: "70px", marginRight: "10px" }}></img>)
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
            await uploadMultipleImagePost(files, url => {
                images = url;
                if (images.length === files.length) {
                    let post = {
                        content: this.state.content,
                        images: images
                    }
                    this.props.onSavePost(post);
                }
            })
        }
    }

    render() {
        return (
            <form onSubmit={(event) => this.onSubmit(event)} className="w-100">
                <div className="input-group style-btn-post">
                    <label className="clicked-btn-post">
                        <input type="file" name="files" multiple="multiple" onChange={(event) => this.onChangeImage(event)} />
                        <span className="btn btn-info" >Chọn ảnh</span>
                    </label>
                </div>
                <div className="input-group" style={{marginTop: "15px"}}>
                    {
                        this.state.filePath.length > 0
                            ? this.displayListImagePost(this.state.filePath)
                            : null
                    }
                </div>
                <div className="input-group" style={{marginTop: "15px"}}>
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon">
                            <i className="fa fa-pencil-alt prefix"></i>
                        </span>
                    </div>
                    <textarea className="textarea-info" id="exampleFormControlTextarea1" rows="50"
                        name="content" value={this.state.content} onChange={(event) => this.onChange(event)}>

                    </textarea>
                </div>

                <div className="d-flex justify-content-end w-100 mt-10">
                    <button type="submit" className="btn btn-primary"> Đăng </button>
                </div>
            </form>
        );
    }
}