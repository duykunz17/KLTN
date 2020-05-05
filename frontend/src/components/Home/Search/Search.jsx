import React, { Component } from 'react';

class Search extends Component {


    onSubmit = () => {
        
    }

    render() {
        return (
            <div className="where_togo_area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-3">
                            <div className="form_area">
                                <h3>Where you want to go?</h3>
                            </div>
                        </div>
                    <div className="col-lg-9">
                        <div className="search_wrap">
                            <form className="search_form" onSubmit={this.onSubmit}>
                                <div className="input_field" style={{width: '650px'}}>
                                    <input type="text" placeholder="Where to go?" />
                                </div>
                                <div className="search_btn">
                                    <button className="boxed-btn4" type="submit">Search</button>
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