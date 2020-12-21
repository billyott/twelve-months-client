import React from 'react';
import { connect } from 'react-redux';

import { deleteUser } from '../redux/actions';
import EditUserForm from '../components/edit-user-form'
import './account-container.scss';


class AccountContainer extends React.Component {

    state = {
        showEditUserForm: false
    }

    handleDeleteUser = () => {
        this.props.handleDeleteUser(this.props.user.id)
        window.location.reload(false); 
    }

    render() {
        return (
            <div className="account-container">
                <div className="account-container__header">MY ACCOUNT</div>
                <EditUserForm />
                <button className="account-container__button" onClick={this.handleDeleteUser}>delete account</button>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {user: state.user}
}

const mapDispatchToProps = dispatch => {
    return {handleDeleteUser: (userId) => dispatch(deleteUser(userId))}
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);