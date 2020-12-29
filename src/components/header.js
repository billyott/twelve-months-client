import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logUserOut } from '../redux/actions';
import './header.scss';


function Header(props) {


    const handleLogout = () => {
        props.handleLogout()
    }

    return (
        <header className="header">
            <Link className="header__header" to={`/`}>12MONTHS <i class="book icon"></i></Link>
            {/* <div className="header__header">
                12MONTHS
            </div> */}
            <button className="header__button" onClick={handleLogout}>LOG OUT</button>
            {/* <div className="header__sub-header">Hello, {props.username}!</div> */}
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