import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import dayjs from 'dayjs';

import NewNoteForm from './new-note-form';
import HabitWidget from './habit-widget';
import './day-details-card.scss';


class DayDetailsCard extends React.Component {

    state = {
        showAddNoteForm: false
    };

    handleShowNewNoteForm = () => {
        this.setState(prevState => {
            return ({showAddNoteForm: !prevState.showAddNoteForm})
        });
    }

    render(){
        return(
            <div className="day-details-card">
                <div className="day-details-card__left-container">
                    <div className="day-details-card__header day-details-card--date">{dayjs(this.props?.day?.date).format('ddd MM.DD.YY').toUpperCase()}</div>
                    <ul className="day-details-card__notes-list">
                        {this.props?.day?.notes.map(note => <li key={note.id}>{`${note.note_type} - ${note.note}`}</li>)}
                    </ul>
                    {this.state.showAddNoteForm ? <NewNoteForm dayId={this.props.day.id}/> : null}
                    <button className="day-details-card__button" onClick={this.handleShowNewNoteForm}>+ add note</button>
                </div>
                <div className="day-details-card__right-container">
                    <div className="day-details-card__habits">
                        <div className="day-details-card__header day-details-card--habits">my habits</div>
                        <ul className="day-details-card__habits-list">
                            {this.props.day ? this.props.user.habits.map(habit => <li key={habit.id}><HabitWidget habit={habit} dayId={this.props.day.id} /></li>) : null}
                        </ul>
                        <NavLink to="/habits" className="day-details-card__link">manage habits</NavLink>
                    </div>
                    <div className="day-details-card__mood-sleep">
                        <div className="day-details-card__header day-details-card--mood-sleep">mood + sleep</div>
                        <div className="mood-rating-widget">
                            <div className="mood-rating-widget__header">mood rating</div>
                            <div className="mood-rating-widget__value">{this.props?.day?.mood_score ? this.props.day.mood_score : "not logged"}</div>
                        </div>
                        <div className="sleep-widget">
                            <div className="sleep-widget__header">hours of sleep last night</div>
                            <div className="sleep-widget__value">{this.props?.day?.sleep_hours ? this.props.day.sleep_hours : "not logged"}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


const mapStateToProps = state => {
    return {user: state.user};
}


export default connect(mapStateToProps)(DayDetailsCard);