import React, { useState } from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';

import LineGraph from '../components/line-graph';

import './trend-container.scss';


class TrendContainer extends React.Component{

    state = {
        startDate: Date.parse('2020/11/01'),
        endDate: new Date(),
        days: [],
        data: []
    };

    componentDidMount() {
        this.getInitialStartAndEndDates()
    }

    getInitialStartAndEndDates = () => {
        const now = dayjs()
        const month = dayjs(now).month()+1
        const year = dayjs(now).year()
        const startDate = `${year}-${month}-01`
        const endDate = `${year}-${month}-${dayjs(startDate).daysInMonth()}`
        this.setState({
            startDate: Date.parse(`${year}/${month}/01`),
            endDate: Date.parse(`${year}/${month}/${dayjs(startDate).daysInMonth()}`)
        })
        fetch(`http://localhost:3000/days?user_id=${this.props.userId}&start_date=${startDate}&end_date=${endDate}`)
        .then(resp => resp.json())
        .then(days => {
            const data = this.stageData(days)
            this.setState({
                days: days,
                data: {data}
            })
        })
    }

    filterDays = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/days?user_id=${this.props.userId}&start_date=${this.state.startDate}&end_date=${this.state.endDate}`)
        .then(resp => resp.json())
        .then(days => {
            const data = this.stageData(days)
            this.setState({
                days: days,
                data: {data}
            })
        })
    }

    stageData = (rawData) => {
        const data = [
            {id: "Mood Score", "color": "hsl(257, 70%, 50%)", data: []},
            {id: "Sleep Hours", "color": "hsl(203, 70%, 50%)", data: []}
        ]
        rawData.forEach(datum => {
            const moodDataPoint = {"x": datum.date, "y": datum.mood_score}
            const sleepDataPoint = {"x": datum.date, "y": datum.sleep_hours}
            data[0].data.push(moodDataPoint)
            data[1].data.push(sleepDataPoint)
        })
        return data
    } 


    render() {
        return (
            <div className="trend-container">
                <div className="trend-container__header-items">
                    <div className="trend-container__header">Trends</div>
                    <div className="trend-container-container__filters">
                        <label className="trend-container-container__label">start date</label>
                        <DatePicker selected={this.state.startDate} onChange={date => this.setState({startDate: date})}/>
                        <label className="trend-container-container__label">end date</label>
                        <DatePicker selected={this.state.endDate} onChange={date => this.setState({endDate: date})}/>
                        <button className="trend-container-container__button" onClick={this.filterDays}>update date filters</button>
                        {/* <form className="trend-container-container___form" onSubmit={this.filterDays}>
                            <label className="trend-container-container__label">select month</label>
                            <select className="trend-container-container__filter" name="month" value={this.state.month} onChange={this.handleInputUpdate}>
                                <option disabled value="">-select month-</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                            <label className="trend-container-container__label">select year</label>
                            <select className="trend-container-container__filter" name="year" value={this.state.year} onChange={this.handleInputUpdate}>
                                <option disabled value="">-select year-</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                            </select>
                            <button className="trend-container-container__button" type="submit">apply filter</button>
                        </form> */}
                    </div>
                </div>
                <div className="trend-container__graph-container">
                    <LineGraph {...this.state.data} />
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {userId: state.user.id}
}

export default connect(mapStateToProps)(TrendContainer);