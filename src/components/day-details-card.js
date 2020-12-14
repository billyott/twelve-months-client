import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import dayjs from 'dayjs';
import { isEqual } from 'lodash';

import Note from './note'
import NewNoteForm from './new-note-form';
import HabitWidget from './habit-widget';
import './day-details-card.scss';


class DayDetailsCard extends React.Component {

    state = {
        showAddNoteForm: false,
        showEditMoodForm: false,
        notes: []
    };

    componentDidMount() {
        this.setState({notes: this.props?.day?.notes || []})
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.day?.notes, this.props.day?.notes)) {
          this.setState({ notes: this.props.day?.notes || [] });
        }
    }

    handleShowNewNoteForm = () => {
        this.setState(prevState => {
            return ({showAddNoteForm: !prevState.showAddNoteForm})
        });
    }

    handleCreateNoteSubmit = (noteObj) => {
        fetch('http://localhost:3000/notes',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(noteObj)
        })
        .then(resp => resp.json())
        .then(newNote => {
            this.handleShowNewNoteForm()
            this.setState(prevState => {
                return ({notes: [...prevState.notes, newNote]})
            })
        })
    }

    handleDeleteNote = (noteId) => {
        fetch(`http://localhost:3000/notes/${noteId}`,{method: 'DELETE'})
        .then(resp => resp.json())
        .then(data => {
            const updatedNotes = [...this.state.notes]
            const index = updatedNotes.findIndex(note => note.id === noteId)
            updatedNotes.splice(index, 1)
            this.setState({notes: updatedNotes})
        })
    }

    render(){
        return(
            <div className="day-details-card">
                <div className="day-details-card__left-container">
                    <div className="day-details-card__header day-details-card--date">{dayjs(this.props?.day?.date).format('ddd MM.DD.YY').toUpperCase()}</div>
                    <ul className="day-details-card__notes-list">
                        {this.state?.notes?.map(note => <li key={note.id}><Note note={note} dayId={this.props.day.id} handleDeleteNote={this.handleDeleteNote}/></li>)}
                    </ul>
                    {this.state.showAddNoteForm ? <NewNoteForm dayId={this.props.day.id} handleCreateNoteSubmit={this.handleCreateNoteSubmit}/> : null}
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
                            <div className="sleep-widget__value">
                                {this.state.showEditMoodForm ? null : this.props?.day?.sleep_hours ? this.props.day.sleep_hours : "not logged"}
                                {/* {this.state.showEditMoodForm ? : } */}
                            </div>
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