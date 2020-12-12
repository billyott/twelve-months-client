import React from 'react';

import './trend-container.scss';


class TrendContainer extends React.Component{

    state = {
        dateRange: '',
        aggregation: ''
    };

    handleInputUpdate = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render () {
        return (
            <div className="trend-container">
                <div className="trend-container__header-items">
                    <div className="trend-container__header">Trends</div>
                    <div className="trend-container__filters">
                        <label className="trend-container__label">select date range</label>
                        <select className="trend-container__filter" defaultValue="" onChange={this.handleInputUpdate}>
                            <option disabled={true} value={this.state.month}>-select date range-</option>
                            <option value="November">November</option>
                        </select>
                        <label className="trend-container__label">select year</label>
                        <select className="trend-container__filter" defaultValue="" onChange={this.handleInputUpdate}>
                            <option disabled={true} value={this.state.year}>-select aggregation-</option>
                            <option value="year">day</option>
                            <option value="week">week</option>
                            <option value="month">month</option>
                        </select>
                    </div>
                </div>
                <div className="trend-container__graph-container">
                </div>
            </div>
        );
    }

}

export default TrendContainer;