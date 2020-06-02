import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListSchedule extends Component {
    countDate = (schedule) => {
        return schedule.length
    }

    displayDate = (schedule) => {
        return schedule.map((dateItem,index) => {
            return (<p key={index}><i className="fa fa-calendar" aria-hidden="true"></i> {dateItem.date.toString().substr(0,10)}: {this.displayDesName(dateItem.desName)}</p>)
        })
    }

    displayDesName = (desName) => {
        return desName.map((desNameItem,index) => {
            
            if(index === desName.length-1)
                return desNameItem.name
            return desNameItem.name + " -> "
        })
    }

    displayHashTag = (hashtag) => {
        return hashtag.map((hashTagItem, index) => {
            
            return ( 
                <b key={index} style={{color:'blue'}}> #{hashTagItem}</b>
            )
        })
    }

    render() {
        let { schedule, account } = this.props
        return (
            <div className="col-lg-4 col-md-6">
                <div className="single_place">
                    <div className="thumb">
                        <img src={account.avatar} alt="" />
                        <p className="prise">{this.countDate(schedule.scheduleList)} ngày</p>
                    </div>
                    <div className="place_info" style={{textAlign:'left'}}>
                    <div className="social_wrap d-flex align-items-center justify-content">
                        <div className="avatar">
                            <img src={account.avatar} className="avatar" alt="ava" /> 
                        </div>
                        &nbsp;&nbsp;
                        <div className="number">
                            <span><b>{account.person.name}</b></span>
                        </div>
                    </div>
                        <br/>
                        <Link to={"/schedule-detail/" + schedule._id}><h3> {schedule.title}</h3></Link>
                        <i class="fa fa-tag" aria-hidden="true"></i>
                        {this.displayHashTag(schedule.hashtag)}
                        {this.displayDate(schedule.scheduleList)}
                    </div>
                </div>
            </div>
        );
    }
}

export default ListSchedule;