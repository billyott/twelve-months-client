import React from 'react';
import { isEqual } from 'lodash';

import EditNoteForm from './edit-note-form';
import './note.scss';

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
        if (!isEqual(prevProps.note, this.props.note)) {
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

    render(){
        return(
            <div className="note">
                <div className="note__content-container">
                    {this.state.showEditNoteForm ? <EditNoteForm note={this.state.note} dayId={this.props.dayId} handleShowEditNoteForm={this.handleShowEditNoteForm} handleUpdateNote={this.handleUpdateNote} handleDeleteNote={this.props.handleDeleteNote} /> : null}
                    {this.state.showEditNoteForm ? null : 
                    <div className="note__content">
                        <div className="note__header-items">
                            <div className="note__type">{this.state.note.note_type === "Event" ? "△ event" : "◯ thought"} </div>
                            <button className="note__edit-button" onClick={this.handleShowEditNoteForm}><i className="pencil alternate icon"></i></button>
                        </div>
                        <div className="note__entry">{this.state.note.note}</div>
                    </div>}
                </div>
            </div>
        );
    }

}

export default Note;