import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import './day-card.scss';


function DayCard(props) {


    return (
        <div className="day-card">
            <Link className="day-card__link" to={`/days/${props?.day?.date}`}>
                <div className="day-card__header">{dayjs(props?.day?.date).format('ddd MM.DD.YY').toUpperCase()}</div>
                <div className="day-card__ms-container">
                    <div className="day-card__ms-widget">
                        <div className="day-card__ms-header">mood rating</div>
                        <div className="day-card__ms-value-container">
                            <div className="day-card__ms-value">{props?.day?.mood_score ? props.day.mood_score : "unlogged"}</div>
                        </div>
                    </div>
                    <div className="day-card__ms-widget">
                        <div className="day-card__ms-header">sleep hours</div>
                        <div className="day-card__ms-value-container">
                            <div className="day-card__ms-value">{props?.day?.sleep_hours ? props.day.sleep_hours : "unlogged"}</div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );

}

export default DayCard;