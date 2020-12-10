import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Switch >
                <Route path="/profile">
                    {!!this.state.jwt ? <Profile user={this.state.user} jwt={this.state.jwt} updateUserHandler={this.updateUserHandler}/> : <Redirect to="/login" />}
                </Route>
                <Route path="/categories">
                    {!!this.state.jwt ? <MainContainer user={this.state.user} jwt={this.state.jwt}/> : <Redirect to="/login" />}
                </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
