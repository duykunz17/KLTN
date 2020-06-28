import React, { Component } from 'react';
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBCollapse,
    MDBContainer
} from 'mdbreact';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseID: ''
        }
    }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ''
        }));
    };

    render() {
        return (
            <MDBContainer>
                <MDBNavbar
                    color='light-blue lighten-4'
                    style={{ marginTop: '10px', marginBottom: '10px' }}
                    light
                >
                    <MDBContainer>
                        <MDBNavbarBrand>
                            <h3>Danh mục sản phẩm</h3>
                        </MDBNavbarBrand>
                        <MDBNavbarToggler
                            onClick={this.toggleCollapse('navbarCollapse1')}
                        />
                        <MDBCollapse
                            id='navbarCollapse1'
                            isOpen={this.state.collapseID}
                            navbar
                        >
                            <MDBNavbarNav left>
                                <ul className="nav flex-column">
                                    {this.props.children}
                                </ul>
                            </MDBNavbarNav>
                        </MDBCollapse>
                    </MDBContainer>
                </MDBNavbar>
            </MDBContainer>
        );
    }
}

export default Category;