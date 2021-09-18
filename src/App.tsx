import React, {useEffect} from "react";
import UsersContainer from "./components/Users/UsersContainer";
import {
    BrowserRouter as Router, Redirect,
    Route, Switch
} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {StateType} from "./redux/redux-store";

// @ts-ignore
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
// @ts-ignore
const MessengerContainer = React.lazy(() => import('./components/Messenger/MessengerContainer'));

type mapStateToPropsType = {
    initialized: boolean
}

type mapDispatchToPropsType = {
    initializeApp: () => void
}

type AppType = mapStateToPropsType & mapDispatchToPropsType

const App: React.FC<AppType> = (props) => {
    useEffect(() => {
        props.initializeApp()
        window.addEventListener('unhandledrejection', () => alert('Some error occurred'))

        return () => window.removeEventListener('unhandledrejection', () => alert('Some error occurred'))
    }, [])

    if (!props.initialized) {
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
                        </React.Suspense>
                    </Switch>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state: StateType): mapStateToPropsType => ({
    initialized: state.app.initialized
})

export default connect<mapStateToPropsType, mapDispatchToPropsType, {}, StateType>(mapStateToProps, {initializeApp})(App)
