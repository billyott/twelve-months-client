import React from 'react';

import DayDetailsCard from '../components/day-details-card'
import './homepage-container.scss';


function HomepageContainer() {

    return (
        <div className="homepage-container">
            <div className="homepage-container__top">
                <div className="homepage-container__header">Today</div>
                <DayDetailsCard />
            </div>
            <div className="homepage-container__bottom">
                <div className="homepage-container__header">Past Three Days</div>
                <a className="homepage-container__link" href="/">see all days</a>
                <ul className="homepage-container__day-cards-list">
                    <li>PLACEHOLDER DAY CARD</li>
                    <li>PLACEHOLDER DAY CARD</li>
                    <li>PLACEHOLDER DAY CARD</li>
                </ul>
            </div>
        </div>
    );

}

export default HomepageContainer;