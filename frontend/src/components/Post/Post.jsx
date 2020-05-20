import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView } from "mdbreact";
import Swal from 'sweetalert2';
import callAPI from '../../utils/connectAPI';
import uploadMultipleImagePost from '../../utils/uploadMultipleImagePost';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: [],
            content: '',
            postDate: new Date(),
            images: [],
            like: 0,
            comment: 0,
            file: [],
            filePath: [],
            account: null,
            statusLike: false,
            redirect: '/login'
        }
    }

    componentDidMount() {
        let account = JSON.parse(sessionStorage.getItem("user"));
        this.setState({ account });
        if (account !== null) {
            callAPI('post/account/' + account._id, 'GET', null)
                .then(res => {
                    this.setState({
                        post: res.data
                    });
                })
                .catch((err) => { console.log(err) })
        } else {
            let history = this.props.history;
            history.push('/login');
        }

    }

    onChangeImage = (event) => {
        this.setState({
            filePath: []
        });
        let file = Array.from(event.target.files);
        //console.log(file)
        if (file.length > 0) {
            file.forEach((f) => {
                let reader = new FileReader();

                reader.onloadend = () => {
                    this.setState({
                        file: [...this.state.file, f],
                        filePath: [...this.state.filePath, reader.result],

                    });
                    //console.log(reader.result)
                }
                reader.readAsDataURL(f)
            });
        }
    };

    displayListImagePost = (filePath) => {
        return filePath.map((currentPath, index) => {
            return (<img src={currentPath} key={index} alt="image" style={{ width: "70px" }}></img>)
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
        let { images, file } = this.state;
        if (this.state.file.length <= 0)
            Swal.fire({
                icon: 'warning',
                title: 'Ảnh không được để rỗng',
            });

        if (this.state.file.length > 0) {
            await uploadMultipleImagePost(file, url => {
                images = url;
                if (images.length === file.length) {
                    const post = {
                        account: this.state.account,
                        content: this.state.content,
                        postDate: this.state.postDate.toString().substr(4, 12),
                        images: images,
                        like: this.state.like,
                        comment: this.state.comment
                    }
                    console.log(post);
                    callAPI('post/add', 'POST', post)
                        .then(res => {
                            console.log(res.data);
                        })
                        .catch((err) => { console.log(err) })
                }

            })


        }
    }

    addLike = (id) => {

        let { like } = this.state


        if (this.state.statusLike === false) {
            this.setState({
                like: like + 1,
                statusLike: true
            });
        } else {
            this.setState({
                like: like - 1,
                statusLike: false
            });
        }
        callAPI('post/update/' + id, 'POST', { like: this.state.like })
            .then(res => {
                console.log(res.data);
            })
            .catch((err) => { console.log(err) })
        console.log(this.state.like);
        console.log(this.state.statusLike);


    };

    displayListPostByUser = () => {
        if (this.state.post.length > 0)
            return this.state.post.map((currentPost, index) => {
                return (
                    <MDBCol lg="12" xl="12" key={index}>
                        <p className="d-flex">
                            Đăng bởi: {currentPost.account.person.name} <br />
                        </p>
                        <p className="d-flex">
                            Ngày đăng: {currentPost.postDate.toString().substr(0, 10)}
                        </p>
                        <p className="d-flex">
                            {currentPost.content}
                        </p>
                        <MDBRow>
                            {currentPost.images.map((img, index) => {
                                if(currentPost.images.length===1){
                                    return (
                                        <MDBCol lg="12" md="12" className="mb-lg-0 mb-4">
                                            <MDBView hover className="rounded z-depth-2 mb-4" waves>
    
                                                <img
                                                    className="img-fluid"
                                                    src={img}
                                                    alt="" 
                                                    width="100%"/>
    
                                                <MDBMask overlay="white-slight" />
                                            </MDBView>
                                        </MDBCol>
                                    )
                                }else if(currentPost.images.length===2){
                                    return (
                                        <MDBCol lg="6" md="12" className="mb-lg-0 mb-4">
                                            <MDBView hover className="rounded z-depth-2 mb-4" waves>
    
                                                <img
                                                    className="img-fluid"
                                                    src={img}
                                                    alt="" 
                                                    width="100%"/>
    
                                                <MDBMask overlay="white-slight" />
                                            </MDBView>
                                        </MDBCol>
                                    )
                                }else {
                                    return (
                                        <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
                                            <MDBView hover className="rounded z-depth-2 mb-4" waves>
    
                                                <img
                                                    className="img-fluid"
                                                    src={img}
                                                    alt="" 
                                                    width="100%"/>
    
                                                <MDBMask overlay="white-slight" />
                                            </MDBView>
                                        </MDBCol>
                                    )
                                }
                                
                            })}
                        </MDBRow>
                        <MDBCardBody>
                            <span className="mr-2">
                                <button onClick={() => this.addLike(currentPost._id)}><MDBIcon icon="heart" /></button> {currentPost.like} thích
                  </span>

                            <span>
                                <MDBIcon icon="comment" /> {currentPost.comment} bình luận
                  </span>
                        </MDBCardBody>
                        <button className="btn btn-info">
                            Xem thêm </button>
                        <hr className="my-5" />
                    </MDBCol>
                )
            })
    }

    render() {
        return (
            <div className="popular_places_area">
                <div className="container">
                    <div className="row">
                        <form onSubmit={(event) => this.onSubmit(event)} className="w-100">
                            <div className="input-group">
                                <input type="file" name="file" multiple="multiple" onChange={(event) => this.onChangeImage(event)} />
                            </div>
                            <div className="input-group">
                                {this.state.filePath.length > 0 ?
                                    this.displayListImagePost(this.state.filePath)
                                    : null
                                }
                            </div>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon">
                                        <i className="fa fa-pencil-alt prefix"></i>
                                    </span>
                                </div>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"
                                    name="content" value={this.state.content} onChange={(event) => this.onChange(event)}>

                                </textarea>
                            </div>

                            <div className="d-flex justify-content-end w-100 mt-10">
                                <button type="submit" className="btn btn-info"> Đăng </button>
                            </div>
                        </form>

                        <MDBCard className="my-5 px-5 pb-5 w-100">

                            <MDBCardBody className="text-center">
                                <h2 className="h1-responsive font-weight-bold text-center my-5">
                                    Bài đăng gần đây
        </h2>
                                <MDBRow>
                                    {this.displayListPostByUser()}
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;