import React from "react";
import UsersContainer from "./components/Users/UsersContainer";
import {
    BrowserRouter as Router, Redirect,
    Route, Switch
} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {Component} from "react";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const MessengerContainer = React.lazy(() => import('./components/Messenger/MessengerContainer'));

class App extends Component {
    componentDidMount() {
        this.props.initializeApp();

        window.addEventListener('unhandledrejection', () => alert('Some error occurred'))
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', () => alert('Some error occurred'))
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        } else {
            return (
                <Router>
                    <div className="App">
                        <Switch>
                            <React.Suspense fallback={<Preloader/>}>
                                <HeaderContainer/>
                                <Redirect from={'/'} to={'/profile'}/>
                                <Route path="/profile/:userId?"
                                       render={() => <ProfileContainer/>}/>
                                <Route path="/messenger"
                                       render={() => <MessengerContainer/>}/>
                                <Route path="/users"
                                       render={() => <UsersContainer/>}/>
                                <Route path="/login"
                                       render={() => <Login/>}/>
                                <Route path="*"
                                       render={() => <div>PAGE NOT FOUND</div>}/>
                            </React.Suspense>
                        </Switch>
                    </div>
                </Router>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App)
