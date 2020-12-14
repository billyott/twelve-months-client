import React from 'react';

import './edit-note-form.scss';


class EditNoteForm extends React.Component {

    state = {
        note: '',
        note_type: ''
    };

    componentDidMount() {
        this.setState({note: this.props?.note.note || '', note_type: this.props?.note.note_type || '' })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.note.note !== this.props.note.note || prevProps.note.note_type !== this.props.note.note_type ) {
            this.setState({notes: this.props?.day?.notes || []})
        }
    }

    handleInputUpdate = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    localHandleEditNoteSubmit = (e) => {
        e.preventDefault()
        this.props.handleShowEditNoteForm()
        if (this.state.note && this.state.note_type) {
            this.props.handleUpdateNote({...this.state, id: this.props.note.id, day_id: this.props.dayId})
        }
    }

    render(){
        return(
            <form className="edit-note-form" onSubmit={this.localHandleEditNoteSubmit}>
                <label className="edit-note-form__label">note</label>
                <input className="edit-note-form__input" name="note" value={this.state.note} onChange={this.handleInputUpdate}></input>
                <label className="edit-note-form__label">note type</label>
                <select className="edit-note-form__select" name="note_type" value={this.props.note.note_type} onChange={this.handleInputUpdate}>
                    <option disabled={true} value={this.state.note_type}>-select note type-</option>
                    <option value="Thought">Thought</option> 
                    <option value="Event">Event</option>
                </select>
                <button className="edit-note-form__button">Submit</button>
            </form>
        );
    }

}

export default EditNoteForm;