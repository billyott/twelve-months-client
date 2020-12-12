import React from 'react';

import DayCard from '../components/day-card';
import './all-days-container.scss';


class AllDaysContainer extends React.Component{

    state = {
        month: '',
        year: ''
    };

    handleInputUpdate = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render () {
        return (
            <div className="all-days-container">
                <div className="all-days-container__header-items">
                    <div className="all-days-container__header">PLACEHOLDER FOR MONTH</div>
                    <div className="all-days-container__filters">
                        <label className="all-days-container__label">select month</label>
                        <select className="all-days-container__filter" defaultValue="" onChange={this.handleInputUpdate}>
                            <option disabled={true} value={this.state.month}>-select month-</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>
                        <label className="all-days-container__label">select year</label>
                        <select className="all-days-container__filter" defaultValue="" onChange={this.handleInputUpdate}>
                            <option disabled={true} value={this.state.year}>-select year-</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                        </select>
                    </div>
                </div>
                <ul className="all-days-container__day-cards-list">
                    <li><DayCard /></li>
                    <li><DayCard /></li>
                    <li><DayCard /></li>
                    <li><DayCard /></li>
                    <li><DayCard /></li>
                    <li><DayCard /></li>
                </ul>
            </div>
        );
    }

}

export default AllDaysContainer;