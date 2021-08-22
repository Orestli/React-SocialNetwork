import React from "react";
import UsersContainer from "./components/Users/UsersContainer";
import {
    BrowserRouter as Router,
    Route
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
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        } else {
            return (
                <Router>
                    <div className="App">
                        <React.Suspense fallback={<Preloader/>}>
                            <HeaderContainer/>
                            <Route path="/profile/:userId?"
                                   render={() => <ProfileContainer/>}/>
                            <Route path="/messenger"
                                   render={() => <MessengerContainer/>}/>
                            <Route path="/users"
                                   render={() => <UsersContainer/>}/>
                            <Route path="/login"
                                   render={() => <Login/>}/>
                        </React.Suspense>
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
