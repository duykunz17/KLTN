import React, { Component } from 'react';

class Search extends Component {


    render() {
        return (
            <div className="where_togo_area">
                <div className="container">
                    <div className="row align-items-center">    
                        <div className="col-lg-3">
                            <div className="form_area">
                                <h3>{this.props.title}</h3>
                            </div>
                        </div>
                    <div className="col-lg-9">
                        <div className="search_wrap">
                            <form className="search_form" onSubmit={this.onSubmit}>
                                <div className="input_field" style={{width: '650px'}}>
                                    <input type="text" placeholder={this.props.input} name="search" />
                                </div>

                                <div className="search_btn">
                                    <button className="boxed-btn4" type="submit">Tìm kiếm</button>
                                </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;