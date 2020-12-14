import React from 'react';

import EditNoteForm from './edit-note-form'

class Note extends React.Component {

    state = {
        showEditNoteForm: false,
        updatedNote: '',
        updatedNoteType: '',
        deleted: false
    };

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
            this.setState({updatedNote: newNote.note, updatedNoteType: newNote.note_type})
        })
    }

    handleDeleteNote = () => {
        fetch(`http://localhost:3000/notes/${this.props.note.id}`,{method: 'DELETE'})
        .then(resp => resp.json())
        .then(data => {
            this.setState({deleted: true})
        })
    }

    render(){
        return(
            <>
            {this.state.deleted ?
            null : 
            <div className="note">
                {this.state.showEditNoteForm ? <EditNoteForm note={this.props.note} dayId={this.props.dayId} handleShowEditNoteForm={this.handleShowEditNoteForm} handleUpdateNote={this.handleUpdateNote} /> : null}
                {this.state.showEditNoteForm ? null : <div onClick={this.handleShowEditNoteForm}>{this.state.updatedNoteType ? this.state.updatedNoteType : this.props.note.note_type} - {this.state.updatedNote ? this.state.updatedNote : this.props.note.note}</div>}
                <button className="note__button" onClick={this.handleDeleteNote}>delete</button>
            </div>
            }
            </>
        );
    }

}

export default Note;