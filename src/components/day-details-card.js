import React from 'react';

import './day-details-card.scss';


class DayDetailsCard extends React.Component {

    state = {
        showAddNoteForm: false
    }

    render(){
        return(
            <div className="day-details-card">
                <div className="day-details-card__left-container">
                    <p className="day-details-card__header day-details-card--date">PLACEHOLDER DATE</p>
                    <ul className="day-details-card__notes-list">
                        <li>PLACEHOLDER NOTE</li>
                        <li>PLACEHOLDER NOTE</li>
                        <li>PLACEHOLDER NOTE</li>
                        <li>PLACEHOLDER NOTE</li>
                    </ul>
                    {this.state.showAddNoteForm ? <>PLACEHOLDER FOR ADD NOTE FORM</> : null}
                    <button className="day-details-card__button">+ add note</button>
                </div>
                <div className="day-details-card__right-container">
                    <div className="day-details-card__habits">
                        <p className="day-details-card__header day-details-card--habits">my habits</p>
                        <ul className="day-details-card__habits-list">
                            <li>PLACEHOLDER HABIT</li>
                            <li>PLACEHOLDER HABIT</li>
                            <li>PLACEHOLDER HABIT</li>
                            <li>PLACEHOLDER HABIT</li>
                        </ul>
                        <a href="/">manage habits</a>
                    </div>
                    <div className="day-details-card__mood-sleep">
                        <p className="day-details-card__header day-details-card--mood-sleep">mood + sleep</p>
                        <>PLACEHOLDER FOR MOOD RATING COMPONENT</>
                        <>PLACEHOLDER FOR HOURS SLEEP COMPONENT</>
                    </div>
                </div>
            </div>
        );
    }

}

export default DayDetailsCard;