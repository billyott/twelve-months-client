import React from 'react';

import EditNoteForm from './edit-note-form'

class Note extends React.Component {

    state = {
        showEditNoteForm: false,
        note: {},
        deleted: false
    };

    componentDidMount() {
        this.setState({note: this.props?.note || {}})
    }

    componentDidUpdate(prevProps) {
        if (prevProps.note !== this.props.note) {
            this.setState({note: this.props.note || {}})
        }
    }

    handleShowEditNoteForm = () => {
        this.setState(prevState => {
            return ({showEditNoteForm: !prevState.showEditNoteForm})
        })
    }

    handleUpdateNote = (noteObj) => {
        fetch(`http://localhost:3000/notes/${this.props.note.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(noteObj)
        })
        .then(resp => resp.json())
        .then(newNote => {
            this.setState({note: newNote})
        })
    }

    localHandleDeleteNote = () => {
        this.props.handleDeleteNote(this.props.note.id)
    }

    render(){
        return(
            <div className="note">
                {this.state.showEditNoteForm ? <EditNoteForm note={this.state.note} dayId={this.props.dayId} handleShowEditNoteForm={this.handleShowEditNoteForm} handleUpdateNote={this.handleUpdateNote} /> : null}
                {this.state.showEditNoteForm ? null : <div onClick={this.handleShowEditNoteForm}>{this.state.note.note_type} - {this.state.note.note}</div>}
                <button className="note__button" onClick={this.localHandleDeleteNote}>delete</button>
            </div>
        );
    }

}

export default Note;