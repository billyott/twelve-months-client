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

    render(){
        return(
            <form className="new-note-form">
                <label className="new-note-form__label">new note</label>
                <input className="new-note-form__input" name="note" placeholder="what's on your mind?" value={this.state.note} onChange={this.handleInputUpdate}></input>
                <label className="new-note-form__label">note type</label>
                <select className="new-note-form__select" defaultValue="" onChange={this.handleInputUpdate}>
                    <option disabled={true} value={this.state.note_type}>-select note type-</option>
                    <option value="Thought">Thought</option>
                    <option value="Event">Event</option>
                </select>
            </form>
        );
    }

}

export default NewNoteForm;