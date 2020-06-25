import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoSearch: '',
        }
    }

    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name] : value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.receiveInfoSearch(this.state.infoSearch);
    }

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
                                <div className="input_field">
                                    <input type="text" name="infoSearch" value={this.state.infoSearch}
                                        placeholder={this.props.input} onChange={this.onChange}
                                    />
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