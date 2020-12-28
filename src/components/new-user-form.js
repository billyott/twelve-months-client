import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';

import { createUser } from '../redux/actions';
import './new-user-form.scss';


class NewUserForm extends React.Component {

    state = {
        email: '',
        username: '',
        password: ''
    };

    handleInputUpdate = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleCreateUserSubmit = (e) => {
        e.preventDefault()
        this.props.handleCreateUserSubmit(this.state)
    }

    render(){
        return(
            <form className="new-user-form" onSubmit={this.handleCreateUserSubmit}>
                <div className="new-user-form__text">
                    ...or if you're new here...
                </div>
                <div className="new-user-form__header">SIGN UP</div>
                <label className="new-user-form__label">email</label>
                <Input className="new-user-form__input" name="email" placeholder="enter email" value={this.state.email} onChange={this.handleInputUpdate}></Input>
                <label className="new-user-form__label">username</label>
                <Input className="new-user-form__input" name="username" placeholder="enter username" value={this.state.username} onChange={this.handleInputUpdate}></Input>
                <label className="new-user-form__label">password</label>
                <Input className="new-user-form__input" name="password" placeholder="enter password" value={this.state.password} onChange={this.handleInputUpdate} type="password"></Input>
                <button className="new-user-form__button" type="submit">create account</button>
            </form>
        );
    }

}

const mapDispatchToProps = dispatch => {
    return {handleCreateUserSubmit: (userCreds) => dispatch(createUser(userCreds))}
};


export default connect(null, mapDispatchToProps)(NewUserForm);