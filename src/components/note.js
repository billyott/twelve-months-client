import React from 'react';

import EditNoteForm from './edit-note-form'

class Note extends React.Component {

    state = {
        showEditNoteForm: false
    };

    handleShowEditNoteForm = () => {
        this.setState(prevState => {
            return ({showEditNoteForm: !prevState.showEditNoteForm})
        })
    }

    render(){
        return(
            <div className="note">
                {this.state.showEditNoteForm ? <EditNoteForm note={this.props.note} handleShowEditNoteForm={this.handleShowEditNoteForm} /> : <div onClick={this.handleShowEditNoteForm}>{this.props.note.note_type} - {this.props.note.note}</div>}
            </div>
        );
    }

}

export default Note;