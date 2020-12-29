import React from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';

import DayCard from '../components/day-card';
import './all-days-container.scss';


class AllDaysContainer extends React.Component{

    state = {
        month: '',
        year: '',
        days: [],
        headerMonth: '',
        headerYear: ''
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
            year: year,
            headerMonth: month,
            headerYear: year
        })
        const startDate = `${year}-${month}-01`
        const endDate = `${year}-${month}-${dayjs(startDate).daysInMonth()}`
        fetch(`http://localhost:3000/days?user_id=${this.props.userId}&start_date=${startDate}&end_date=${endDate}`)
        .then(resp => resp.json())
        .then(days => {
            this.setState({days})
        })
    }

    filterDays = (e) => {
        e.preventDefault()
        this.setState({days: []})
        const startDate = `${this.state.year}-${this.state.month}-01`
        const endDate = `${this.state.year}-${this.state.month}-${dayjs(startDate).daysInMonth()}`
        fetch(`http://localhost:3000/days?user_id=${this.props.userId}&start_date=${startDate}&end_date=${endDate}`)
        .then(resp => resp.json())
        .then(days => {
            this.setState({
                days: days,
                headerMonth: this.state.month,
                headerYear: this.state.year
            })
        })
    }

    render () {
        return (
            <div className="all-days-container">
                <div className="all-days-container__header-items">
                    <div className="all-days-container__header">{`${dayjs(this.state.headerMonth).format("MMMM")} ${this.state.headerYear}`.toUpperCase()}</div>
                    <div className="all-days-container__filters">
                        <form className="all-days-container___form" onSubmit={this.filterDays}>
                            <label className="all-days-container__label">select month</label>
                            <select className="all-days-container__filter" name="month" value={this.state.month} onChange={this.handleInputUpdate}>
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
                            <label className="all-days-container__label">select year</label>
                            <select className="all-days-container__filter" name="year" value={this.state.year} onChange={this.handleInputUpdate}>
                                <option disabled value="">-select year-</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                            </select>
                            <button className="all-days-container__button" type="submit">apply filter</button>
                        </form>
                    </div>
                </div>
                <div className="all-days-container__day-cards-list">
                    {this.state.days.length > 0 ? 
                    this.state.days.map(day => <div className="all-days-container__day-card-container" key={day.id}><DayCard day={day} /></div>)
                    :
                    <Loader active inline='centered' />
                    }
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {userId: state.user.id}
}

export default connect(mapStateToProps)(AllDaysContainer);