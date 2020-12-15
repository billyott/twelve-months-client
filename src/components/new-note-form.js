import React from 'react';

import './new-note-form.scss';


class NewNoteForm extends React.Component {

    state = {
        note: '',
        note_type: ''
    };

    handleInputUpdate = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    localHandleCreateNoteSubmit = (e) => {
        e.preventDefault()
        if (this.state.note && this.state.note_type) {
            this.props.handleCreateNoteSubmit({...this.state, important: false, day_id: this.props.dayId})
        }
    }

    render(){
        return(
            <form className="new-note-form" onSubmit={this.localHandleCreateNoteSubmit}>
                <label className="new-note-form__label">new note</label>
                <input className="new-note-form__input" name="note" placeholder="what's on your mind?" value={this.state.note} onChange={this.handleInputUpdate}></input>
                <label className="new-note-form__label">note type</label>
                <select className="new-note-form__select" name="note_type" value={this.state.note_type} onChange={this.handleInputUpdate}>
                    <option disabled value="">- select note type -</option>
                    <option value="Thought">Thought</option>
                    <option value="Event">Event</option>
                </select>
                <button className="new-note-form__button" type="submit">Submit</button>
            </form>
        );
    }

}

export default NewNoteForm;