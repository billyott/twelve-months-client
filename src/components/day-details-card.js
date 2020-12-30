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
        showEditSleepForm: false,
        mood_score: '',
        sleep_hours: '',
        notes: []
    };

    componentDidMount() {
        this.setState({notes: this.props?.day?.notes || [], mood_score: this.props?.day?.mood_score || null, sleep_hours: this.props?.day?.sleep_hours || null})
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.day?.id, this.props.day?.id)) {
            this.setState({ showAddNoteForm: false, showEditMoodForm: false, showEditSleepForm: false});
        }
        if (!isEqual(prevProps.day?.id, this.props.day?.id) || !isEqual(prevProps.day?.notes, this.props.day?.notes)) {
          this.setState({ notes: this.props.day?.notes || [] });
        }
        if (!isEqual(prevProps.day?.id, this.props.day?.id) || prevProps.day?.mood_score !== this.props.day?.mood_score) {
            this.setState({ mood_score: this.props?.day?.mood_score || null, showEditMoodForm: false});
        }
        if (!isEqual(prevProps.day?.id, this.props.day?.id) || prevProps.day?.sleep_hours !== this.props.day?.sleep_hours) {
            this.setState({ sleep_hours: this.props?.day?.sleep_hours || null, showEditSleepForm: false});
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

    handleShowEditMoodForm = () => {
        this.setState(prevState => {
            return({showEditMoodForm: !prevState.showEditMoodForm})
        })
    }

    handleShowEditSleepForm = () => {
        this.setState(prevState => {
            return({showEditSleepForm: !prevState.showEditSleepForm})
        })
    }   

    handleInputUpdate = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleUpdateDay = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/days/${this.props.day.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.props.day.id,
                user_id: this.props.day.user.id,
                mood_score: this.state.mood_score,
                sleep_hours: this.state.sleep_hours
            })
        })
        .then(resp => resp.json())
        .then(updatedDay => {
            this.setState({
                mood_score: updatedDay.mood_score,
                sleep_hours: updatedDay.sleep_hours,
                showEditMoodForm: false,
                showEditSleepForm: false
            })
        })
    }

    render(){
        return(
            <div className="day-details-card">
                <div className="day-details-card__left-container">
                    <div className="day-details-card__header day-details-card__header--date">{dayjs(this.props?.day?.date).format('ddd MM.DD.YY').toUpperCase()}</div>
                    <ul className="day-details-card__notes-list">
                        {this.state.showAddNoteForm ? <NewNoteForm dayId={this.props.day.id} handleCreateNoteSubmit={this.handleCreateNoteSubmit}/> : null}
                        {this.state?.notes?.map(note => <li className="day-details-card__notes-list-item"key={note.id}><Note note={note} dayId={this.props.day.id} handleDeleteNote={this.handleDeleteNote}/></li>)}
                    </ul>
                    <button className="day-details-card__button" onClick={this.handleShowNewNoteForm}>{this.state.showAddNoteForm ? "x" : "+"}</button>
                </div>
                <div className="day-details-card__right-container">
                    <div className="day-details-card__habits">
                        <div className="day-details-card__header day-details-card__header--habits">my habits</div>
                        <ul className="day-details-card__habits-list">
                            {this.props.day ? this.props.user.habits.map(habit => habit.archived ? null : <li className="day-details-card__habits-list-item" key={habit.id}><HabitWidget habit={habit} dayId={this.props.day.id} /></li>) : null}
                        </ul> 
                        <NavLink to="/habits" className="day-details-card__link">manage habits</NavLink>
                    </div>
                    <div className="day-details-card__mood-sleep">
                        <div className="day-details-card__header day-details-card__header--mood-sleep">mood + sleep</div>
                        <div className="day-details-card__mood-rating-widget">
                            <div className="day-details-card__ms-header">mood rating <button className="day-details-card__ms-button" onClick={this.handleShowEditMoodForm}><i class="pencil alternate icon"></i></button></div>
                            <div className="day-details-card__ms-value-container">
                                <div className="day-details-card__ms-value">{this.state.showEditMoodForm ? null : this.state.mood_score ? this.state.mood_score : "unlogged"}</div>
                                {this.state.showEditMoodForm ? 
                                <form className="day-details-card__ms-form" onSubmit={this.handleUpdateDay}>
                                    <select className="day-details-card__ms-form-select" name="mood_score" value={this.state.mood_score || ""} onChange={this.handleInputUpdate}>
                                        <option value="1">1</option> 
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                    <button className="day-details-card__ms-form-button" type="submit">log</button>
                                </form>
                                : null}
                            </div>
                        </div>
                        <div className="day-details-card__sleep-widget">
                            <div className="day-details-card__ms-header">sleep hours <button className="day-details-card__ms-button" onClick={this.handleShowEditSleepForm}><i class="pencil alternate icon"></i></button></div>
                            <div className="day-details-card__ms-value-container">
                                <div className="day-details-card__ms-value">{this.state.showEditSleepForm ? null : this.state.sleep_hours ? this.state.sleep_hours : "unlogged"}</div>
                                {this.state.showEditSleepForm ? 
                                <form className="day-details-card__ms-form" onSubmit={this.handleUpdateDay}>
                                    <select className="day-details-card__ms-form-select" name="sleep_hours" value={this.state.sleep_hours || ""} onChange={this.handleInputUpdate}>
                                        <option value="1">1</option> 
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                    <button className="day-details-card__ms-form-button" type="submit">log</button>
                                </form>
                                : null}
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