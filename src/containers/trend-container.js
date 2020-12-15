import React, { useState } from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';

import LineGraph from '../components/line-graph';
import { data } from '../lib/test-data';

import './trend-container.scss';


class TrendContainer extends React.Component{

    // [dateRange, setDateRange] = () => useState(''),
    // [aggregation, setAggregation] = () =>  useState(''),
    // [formData, setFormData] = () => useState({});


    state = {
        month: '',
        year: '',
        days: [],
        data: []
    };

    handleInputUpdate = (e) => {
        if (e.target.name === "month") {
            this.setState({month: e.target.value})
        } 
        if (e.target.name === "year") {
            this.setState({year: e.target.value})
        }
    };

    componentDidMount() {
        this.getCurrentMonthAndYear()
    }

    getCurrentMonthAndYear = () => {
        const now = dayjs()
        const month = dayjs(now).month()+1
        const year = dayjs(now).year()
        this.setState({
            month: month,
            year: year
        })
        const startDate = `${year}-${month}-01`
        const endDate = `${year}-${month}-${dayjs(startDate).daysInMonth()}`
        // const startDate = '2020-11-01'
        // const endDate = '2020-11-07'
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
        const startDate = `${this.state.year}-${this.state.month}-01`
        const endDate = `${this.state.year}-${this.state.month}-${dayjs(startDate).daysInMonth()}`
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
                        <form className="trend-container-container___form" onSubmit={this.filterDays}>
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
                        </form>
                    </div>
                </div>
                <div className="trend-container__graph-container">
                    {/* <LineGraph {...{ data }} /> */}
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