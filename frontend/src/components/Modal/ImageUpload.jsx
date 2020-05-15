import React, { Component } from 'react';

export default class ImageUpload extends Component {

    onChangeImage = (event) => {
        this.props.onUploadImage(event);
    };

    render() {
        return (
            <div className="uploadAvatar">
                <label>Ảnh đại diện</label>
                <input name="avatar" id="imgUpload" className="inputFile-avatar" type="file" onChange={this.onChangeImage} />
                <div className="input-group-avatar">
                    <span className="input-group-btn-avatar">
                        <button className="browse btn btn-primary" id="Upload-Ava">Chọn ảnh</button>
                    </span>
                </div>
            </div>
        );
    }
}