import React from 'react';
import dayjs from 'dayjs';

import DayDetailsCard from '../components/day-details-card'
import DayCard from '../components/day-card'
import './homepage-container.scss';


function HomepageContainer() {

    const today = dayjs()

    const displayDate = today.format('ddd MM.DD.YY').toUpperCase()

    return (
        <div className="homepage-container">
            <div className="homepage-container__top">
                <div className="homepage-container__header">TODAY</div>
                <DayDetailsCard date={today} />
            </div>
            <div className="homepage-container__bottom">
                <div className="homepage-container__header">Past Three Days</div>
                <a className="homepage-container__link" href="/">see all days</a>
                <ul className="homepage-container__day-cards-list">
                    <li><DayCard date={today.subtract(1,'day')}/></li>
                    <li><DayCard date={today.subtract(2,'day')}/></li>
                    <li><DayCard date={today.subtract(3,'day')}/></li>
                </ul>
            </div>
        </div>
    );

}

export default HomepageContainer;