import React, { Component } from 'react';
import Swal from 'sweetalert2';

export default class FormComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ''
        };
    }

    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;

        this.setState({
            [name]: value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();

        if (this.props.account) {
            this.props.onSubmitComment(this.state.content);
            this.setState({content: ''});
        }
        else
            Swal.fire({
                icon: 'warning',
                title: 'Bạn chưa thực hiện đăng nhập',
            })
    }

    render() {
        let { content } = this.state;
        return (
            <div className="comment-form">
                <h4>Viết bình luận tại đây</h4>
                <form className="form-contact comment_form" id="commentForm" onSubmit={this.onSubmit} >
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <textarea className="form-control w-100" name="content" cols={30} rows={9}
                                    placeholder="Viết bình luận..." style={{fontSize:'24px'}} value={content}
                                    onChange={this.onChange} required title="Nhập nội dung bình luận"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="button button-contactForm btn_1 boxed-btn">Gửi bình luận</button>
                    </div>
                </form>
            </div>
        );
    }
}