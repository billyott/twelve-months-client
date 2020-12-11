import React from 'react';

import './homepage-container.scss';


function HomepageContainer() {

    return (
        <div className="homepage-container">
            <div className="homepage-container__top">
                <p className="homepage-container__p">Today</p>
                {/* today's single card here */}
            </div>
            <div className="homepage-container__bottom">
                <p className="homepage-container__p">Past Three Days</p>
                <div className="homepage-container__day-card-div">
                    {/* past three days' cards here */}
                </div>
                <a className="homepage-container__link" href="/">see all days</a>
            </div>
        </div>
    );

}

export default HomepageContainer;