import React from 'react';

import MoodRatingWidget from './mood-rating-widget';
import SleepWidget from './sleep-widget';
import NewNoteForm from './new-note-form';
import HabitWidget from './habit-widget';
import './day-details-card.scss';


class DayDetailsCard extends React.Component {

    state = {
        showAddNoteForm: true
    }

    render(){
        return(
            <div className="day-details-card">
                <div className="day-details-card__left-container">
                    <div className="day-details-card__header day-details-card--date">{this.props.date.format('ddd MM.DD.YY').toUpperCase()}</div>
                    <ul className="day-details-card__notes-list">
                        <li>PLACEHOLDER NOTE</li>
                        <li>PLACEHOLDER NOTE</li>
                        <li>PLACEHOLDER NOTE</li>
                        <li>PLACEHOLDER NOTE</li>
                    </ul>
                    {this.state.showAddNoteForm ? <NewNoteForm /> : null}
                    <button className="day-details-card__button">+ add note</button>
                </div>
                <div className="day-details-card__right-container">
                    <div className="day-details-card__habits">
                        <div className="day-details-card__header day-details-card--habits">my habits</div>
                        <ul className="day-details-card__habits-list">
                            <li><HabitWidget /></li>
                            <li><HabitWidget /></li>
                            <li><HabitWidget /></li>
                            <li><HabitWidget /></li>
                        </ul>
                        <a href="/">manage habits</a>
                    </div>
                    <div className="day-details-card__mood-sleep">
                        <div className="day-details-card__header day-details-card--mood-sleep">mood + sleep</div>
                        <MoodRatingWidget />
                        <SleepWidget />
                    </div>
                </div>
            </div>
        );
    }

}

export default DayDetailsCard;