import React from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import { isNumber } from 'lodash';
import { CSVLink } from "react-csv";
import { Loader } from 'semantic-ui-react';

import LineGraph from '../components/line-graph';

import './trend-container.scss';


class TrendContainer extends React.Component{

    state = {
        startDate: Date.parse('2020/11/01'),
        endDate: new Date(),
        aggregation: 'day',
        data: [],
        formattedData: []
    };

    componentDidMount() {
        this.getInitialStartAndEndDates()
    }

    getInitialStartAndEndDates = () => {
        const now = dayjs()
        const day = now.format("D")
        const month = dayjs(now).month()+1
        const year = dayjs(now).year()
        const startDate = `${year}-${month}-01`
        const endDate = `${year}-${month}-${day}`
        this.setState({
            startDate: Date.parse(`${year}/${month}/01`),
            endDate: Date.parse(`${year}/${month}/${day}`)
        })
        fetch(`http://localhost:3000/days?user_id=${this.props.userId}&start_date=${startDate}&end_date=${endDate}`)
        .then(resp => resp.json())
        .then(days => {
            const data = this.stageData(days)
            const formattedData = this.formatDataForExport(data)
            this.setState({
                data: {data},
                formattedData: formattedData
            })
        })
    }

    filterDays = (e) => {
        e.preventDefault()
        this.setState({data: []})
        const startDate = dayjs(this.state.startDate).format('YYYY-MM-DD')
        const endDate = dayjs(this.state.endDate).format('YYYY-MM-DD')
        fetch(`http://localhost:3000/days?user_id=${this.props.userId}&start_date=${startDate}&end_date=${endDate}`)
        .then(resp => resp.json())
        .then(days => {
            const data = this.stageData(days)
            const formattedData = this.formatDataForExport(data)
            this.setState({
                data: {data},
                formattedData: formattedData
            })
        })
    }

    stageData = (rawData) => {
        const data = [
            {id: "Mood Score", "color": "#f88888", data: []},
            {id: "Sleep Hours", "color": "#5ca2d4", data: []}
        ]
        if (this.state.aggregation === 'week') {
            const weekData = {}
            let currentWeek = 1
            let counter = 1
            rawData.forEach(datum => {
                if (!weekData[`wk${currentWeek}`]) {
                    weekData[`wk${currentWeek}`] = {moodScore: 0, moodCount: 0, sleepHours: 0, sleepCount: 0}
                }
                if (isNumber(datum.mood_score)) {
                    weekData[`wk${currentWeek}`].moodScore += datum.mood_score
                    weekData[`wk${currentWeek}`].moodCount += 1
                }
                if (isNumber(datum.sleep_hours)) {
                    weekData[`wk${currentWeek}`].sleepHours += datum.sleep_hours
                    weekData[`wk${currentWeek}`].sleepCount += 1
                }
                if (counter === 7) {
                    currentWeek++
                    counter = 1
                } else {
                    counter++
                }
            })
            Object.keys(weekData).forEach(week => {
                const moodDataPoint = {x: week, y: weekData[week].moodCount ? weekData[week].moodScore/weekData[week].moodCount : null}
                const sleepDataPoint = {x: week, y: weekData[week].sleepCount ? weekData[week].sleepHours/weekData[week].sleepCount : null}
                data[0].data.push(moodDataPoint)
                data[1].data.push(sleepDataPoint)
            })
        } else if (this.state.aggregation === 'month') {
            const monthData = {}
            rawData.forEach(datum => {
                const month = dayjs(datum.date).format("MMM")
                if (!monthData[month]) {
                    monthData[month] = {moodScore: 0, moodCount: 0, sleepHours: 0, sleepCount: 0}
                }
                if (isNumber(datum.mood_score)) {
                    monthData[month].moodScore += datum.mood_score
                    monthData[month].moodCount += 1
                }
                if (isNumber(datum.sleep_hours)) {
                    monthData[month].sleepHours += datum.sleep_hours
                    monthData[month].sleepCount += 1
                }
            })
            Object.keys(monthData).forEach(month => {
                const moodDataPoint = {x: month, y: monthData[month].moodCount ? monthData[month].moodScore/monthData[month].moodCount : null}
                const sleepDataPoint = {x: month, y: monthData[month].sleepCount ? monthData[month].sleepHours/monthData[month].sleepCount : null}
                data[0].data.push(moodDataPoint)
                data[1].data.push(sleepDataPoint)
            })
        } else if (this.state.aggregation === 'year') {
            const yearData = {}
            rawData.forEach(datum => {
                const year = dayjs(datum.date).format("YYYY")
                if (!yearData[year]) {
                    yearData[year] = {moodScore: 0, moodCount: 0, sleepHours: 0, sleepCount: 0}
                }
                if (isNumber(datum.mood_score)) {
                    yearData[year].moodScore += datum.mood_score
                    yearData[year].moodCount += 1
                }
                if (isNumber(datum.sleep_hours)) {
                    yearData[year].sleepHours += datum.sleep_hours
                    yearData[year].sleepCount += 1
                }
            })
            Object.keys(yearData).forEach(year => {
                const moodDataPoint = {x: year, y: yearData[year].moodCount ? yearData[year].moodScore/yearData[year].moodCount : null}
                const sleepDataPoint = {x: year, y: yearData[year].sleepCount ? yearData[year].sleepHours/yearData[year].sleepCount : null}
                data[0].data.push(moodDataPoint)
                data[1].data.push(sleepDataPoint)
            })
        } else {
            rawData.forEach(datum => {
                const moodDataPoint = {x: datum.date, y: datum.mood_score}
                const sleepDataPoint = {x: datum.date, y: datum.sleep_hours}
                data[0].data.push(moodDataPoint)
                data[1].data.push(sleepDataPoint)
            })
        }
        return data
    }

    formatDataForExport = (rawData) => {
        const data = []
        rawData[0].data.forEach(dataPoint => {
            let formattedDataPoint = {}
            formattedDataPoint["Date"] = dataPoint.x
            formattedDataPoint["Mood Score"] = dataPoint.y
            data.push(formattedDataPoint)
        })
        rawData[1].data.forEach(dataPoint => {
            let matchedDataPoint = data.find(dp => dp["Date"] === dataPoint.x)
            matchedDataPoint["Sleep Hours"] = dataPoint.y
        })
        return data
    }

    render() {
        return (
            <div className="trend-container">
                <div className="trend-container__header-items">
                    <div className="trend-container__header">MOOD + SLEEP TRENDS</div>
                    <div className="trend-container__filters">
                        <div className="trend-container__date-picker-container">
                            <label className="trend-container__label">start date</label>
                            <DatePicker selected={this.state.startDate} onChange={date => this.setState({startDate: date})}/>
                        </div>
                        <div className="trend-container__date-picker-container">
                            <label className="trend-container__label">end date</label>
                            <DatePicker selected={this.state.endDate} onChange={date => this.setState({endDate: date})}/>
                        </div>
                        <label className="trend-container__label">date grouping</label>
                            <select className="trend-container__filter" name="aggreation" value={this.state.aggregation} onChange={e => this.setState({aggregation: e.target.value})}>
                                <option disabled value="">-select agg-</option>
                                <option value="day">day</option>
                                <option value="week">week</option>
                                <option value="month">month</option>
                                <option value="year">year</option>
                            </select>
                        <button className="trend-container__button" onClick={this.filterDays}>update date range</button>
                    </div>
                </div>
                <div className="trend-container__graph-container">
                    {this.state.data.data ? 
                        <LineGraph {...this.state.data} />
                    :
                        <Loader active inline='centered' />
                    }
                </div>
                {this.state.data.data ? <CSVLink className="trend-container__export-link" data={this.state?.formattedData} filename={`mood-sleep-export.csv`}>export data</CSVLink> : null}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {userId: state.user.id}
}

export default connect(mapStateToProps)(TrendContainer);