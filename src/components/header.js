import React from 'react';
import { connect } from 'react-redux';

import { logUserOut } from '../redux/actions';
import './header.scss';


function Header(props) {


    const handleLogout = () => {
        props.handleLogout()
    }

    return (
        <header className="header">
            <h1 className="header__header">12MONTHS</h1>
            {/* <p>hi {props.username}</p> */}
            <button className="header__button" onClick={handleLogout}>log out</button>
        </header>
    );

}

const mapStateToProps = state => {
    return {username: state.user.username}
}

const mapDispatchToProps = dispatch => {
    return {handleLogout: () => dispatch(logUserOut())}
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);