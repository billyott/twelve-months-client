import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

import { setUser } from './redux/actions';
import Header from './components/header';
import Footer from './components/footer';
import NavBar from './components/nav-bar';
import LoginContainer from './containers/login-container';
import HomepageContainer from './containers/homepage-container';
import DayDetailsContainer from './containers/day-details-container';
import AllDaysContainer from './containers/all-days-container';
import ManageHabitsContainer from './containers/manage-habits-container';
import TrendContainer from './containers/trend-container';
import AccountContainer from './containers/account-container';
import './App.css';

function AuthContainer() {
    return(
        <div className="main-container">
            <NavBar />
            <div className="content-container">
            <Switch >
                <Route path="/days/:date">
                    <DayDetailsContainer />
                </Route>
                <Route path="/days">
                    <AllDaysContainer />
                </Route>
                <Route path="/habits">
                    <ManageHabitsContainer />
                </Route>
                <Route path="/trends">
                    <TrendContainer />
                </Route>
                <Route path="/my-account">
                    <AccountContainer />
                </Route>
                <Route path="/">
                    <HomepageContainer />
                </Route>
            </Switch>
            </div>
            <Footer />
        </div>
    )
}

const handleSetUser = (props) => {
    const user = JSON.parse(window.localStorage.getItem("user"))
    if (user.id) {
        props.handleSetUser({
            username: user.username,
            password: user.password
        })
    }
}

function App(props) {

    return (
        <div className="app">
            {JSON.parse(window.localStorage.getItem("user")) ? handleSetUser(props): null}
            <BrowserRouter>
                {!!props.user.id ? <Header /> : null}
                <Switch>
                    <Route path="/login">
                        {!!props.user.id ? <Redirect to="/"/> : <LoginContainer />}
                    </Route>
                    <Route path="/">
                        {!!props.user.id ? <AuthContainer /> : <Redirect to="/login"/>}
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

const mapStateToProps = state => {
    return {user: state.user}
}

const mapDispatchToProps = dispatch => {
    return {handleSetUser: (userCreds) => dispatch(setUser(userCreds))}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);