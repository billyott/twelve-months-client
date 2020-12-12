import React, { useState } from 'react';

import LineGraph from '../components/line-graph';
import { data } from '../lib/test-data';

import './trend-container.scss';


function TrendContainer() {
    const [dateRange, setDateRange] = useState(''),
          [aggregation, setAggregation] = useState(''),
          [formData, setFormData] = useState({});


    const handleInputUpdate = (e) => {
        setFormData(currentFormData => {
            return { ...currentFormData, [e.target.name]: e.target.value }
        });
    };

        return (
            <div className="trend-container">
                <div className="trend-container__header-items">
                    <div className="trend-container__header">Trends</div>
                    <div className="trend-container__filters">
                        <label className="trend-container__label">select date range</label>
                        <select className="trend-container__filter" defaultValue="" onChange={handleInputUpdate}>
                            <option disabled={true} value={formData.month || ''}>-select date range-</option>
                            <option value="November">November</option>
                        </select>
                        <label className="trend-container__label">select year</label>
                        <select className="trend-container__filter" defaultValue="" onChange={handleInputUpdate}>
                            <option disabled={true} value={formData.year || ''}>-select aggregation-</option>
                            <option value="year">day</option>
                            <option value="week">week</option>
                            <option value="month">month</option>
                        </select>
                    </div>
                </div>
                <div className="trend-container__graph-container">
                    <LineGraph {...{ data }} />
                </div>
            </div>
        );

}

export default TrendContainer;