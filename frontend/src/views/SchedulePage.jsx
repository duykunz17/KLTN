import React, { Component } from 'react';
import Header from '../components/Home/Header';
import Schedule from '../components/Schedule/Schedule';
import Footer from '../components/Home/Footer';

class SchedulePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: null,
        }
    }

    componentDidMount() {
        let account = JSON.parse(sessionStorage.getItem("user"));
        if (account !== null) {
            this.setState({ account });
        }
        else {
            let history = this.props.history;
            history.push('/login');
        }
    }
    
    render() {
        let { account } = this.state
        return (
            <div>
                <Header/>
                <Schedule account={account}/>
                <Footer/>
            </div>
        );
    }
}

export default SchedulePage;