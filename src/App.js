import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

import Header from './components/header';
import NavBar from './components/nav-bar';
import LoginContainer from './containers/login-container';
import HomepageContainer from './containers/homepage-container';
import DayDetailsContainer from './containers/day-details-container';
import AllDaysContainer from './containers/all-days-container';
import ManageHabitsContainer from './containers/manage-habits-container';
import TrendContainer from './containers/trend-container';
import AccountContainer from './containers/account-container';
import './App.css';

function App(props) {

    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                {!!props.user.id ? <NavBar /> : null}
                <Switch>
                    <Route path="/login">
                        {!!props.user.id ? <Redirect to="/"/> : <LoginContainer />}
                    </Route>
                    <Route path="/days/:date">
                        {!!props.user.id ? <DayDetailsContainer /> : <Redirect to="/login"/>}
                    </Route>
                    <Route path="/days">
                        {!!props.user.id ? <AllDaysContainer /> : <Redirect to="/login"/>}
                    </Route>
                    <Route path="/habits">
                        {!!props.user.id ? <ManageHabitsContainer /> : <Redirect to="/login"/>}
                    </Route>
                    <Route path="/trends">
                        {!!props.user.id ? <TrendContainer /> : <Redirect to="/login"/>}
                    </Route>
                    <Route path="/my-account">
                        {!!props.user.id ? <AccountContainer /> : <Redirect to="/login"/>}
                    </Route>
                    <Route path="/">
                        {!!props.user.id ? <HomepageContainer /> : <Redirect to="/login"/>}
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

const mapStateToProps = state => {
    return {user: state.user}
}


export default connect(mapStateToProps)(App);