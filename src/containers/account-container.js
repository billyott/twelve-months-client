import React from 'react';

import EditUserForm from '../components/edit-user-form'

class AccountContainer extends React.Component {


    render() {
        return (
            <div className="account-container">
                <div className="account-container__header">My Account</div>
                <EditUserForm />
                <button className="account-container__button">delete account</button>
            </div>
        )
    }

}

export default AccountContainer;