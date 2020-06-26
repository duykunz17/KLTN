import React, { Component } from 'react';
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBCollapse,
    MDBContainer
  } from 'mdbreact';
  import { BrowserRouter as Router } from 'react-router-dom';
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
            <Router>
            <MDBContainer>
              <MDBNavbar
                color='light-blue lighten-4'
                style={{ marginTop: '10px', marginBottom:'10px' }}
                light
              >
                <MDBContainer>
                  <MDBNavbarBrand>Danh mục sản phẩm</MDBNavbarBrand>
                  <MDBNavbarToggler
                    onClick={this.toggleCollapse('navbarCollapse1')}
                  />
                  <MDBCollapse
                    id='navbarCollapse1'
                    isOpen={this.state.collapseID}
                    navbar
                  >
                    <MDBNavbarNav left>
                      {this.props.children}
                    </MDBNavbarNav>
                  </MDBCollapse>
                </MDBContainer>
              </MDBNavbar>
            </MDBContainer>
          </Router>
        );
    }
}

export default Category;