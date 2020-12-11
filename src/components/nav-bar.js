import React from 'react';

import './nav-bar.scss';


function NavBar() {


    return (
        <div className="nav-bar">
            <a className="nav-bar__link" href="/">ALL DAYS</a>
            <a className="nav-bar__link" href="/">MANAGE HABITS</a>
            <a className="nav-bar__link" href="/">MY TRENDS</a>
            <a className="nav-bar__link" href="/">MY ACCOUNT</a>
            <a className="nav-bar__link" href="/">LOG OUT</a>
        </div>
    );

}

export default NavBar;