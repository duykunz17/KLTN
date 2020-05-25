import React, { Component } from 'react';
import Header from '../components/Home/Header';
import ListSchedule from '../components/Schedule/ListSchedule';
import Footer from '../components/Home/Footer';
import callAPI from '../utils/connectAPI';

class ListSchedulePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: null,
            schedule: []
        }
    }

    getSchedulesOfAccount = (account) => {
        callAPI('schedule/account/' + account._id, 'GET', null)
            .then(res => {
                this.setState({
                    schedule: res.data
                });
            })
            .catch((err) => { console.log(err) })
    }

    componentDidMount() {
        let account = JSON.parse(sessionStorage.getItem("user"));
        if (account !== null) {
            this.setState({ account });
            this.getSchedulesOfAccount(account);
        }
        else {
            let history = this.props.history;
            history.push('/login');
        }
    }

    displaySchedule = (schedule, account) => {
        let result = null;
        if (schedule.length > 0) {
            result = schedule.map((currentSchedule, index) => {
                return (
                    <ListSchedule
                        key={index}
                        schedule={currentSchedule}
                        account={account}
                    />
                );
            });
        }
        return result;
    }



    render() {
        let { schedule, account } = this.state;
        return (
            <div>
                <Header />
                <div className="where_togo_area">
                    <div className="row justify-content-center">
                        <div className="container">
                            <h2 style={{ color: 'white', textAlign: 'center' }}>LỊCH TRÌNH CÁC CHUYẾN ĐI</h2>
                        </div>
                    </div>
                </div>
                <div className="popular_places_area" style={{ textAlign: 'center' }}>
                    <div className="container">
                        <div className="row">
                            {this.displaySchedule(schedule, account)}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default ListSchedulePage;