import React from 'react';

import EditUserForm from '../components/edit-user-form'
import './account-container.scss';


class AccountContainer extends React.Component {

    state = {
        showEditUserForm: false
    }

    render() {
        return (
            <div className="account-container">
                <div className="account-container__header">MY ACCOUNT</div>
                <EditUserForm />
                <button className="account-container__button">delete account</button>
            </div>
        )
    }

}

export default AccountContainer;