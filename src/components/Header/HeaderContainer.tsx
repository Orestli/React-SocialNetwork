<<<<<<< HEAD
import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {StateType} from "../../redux/redux-store";

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchPropsType = {
    logout: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const HeaderContainer: React.FC<PropsType> = (props) => {
    if (props.isAuth) {
        return <Header {...props}/>
    } else {
        return <Redirect to={'/login'}/>
    }
}

const mapStateToDispatch = (state: StateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

=======
import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {StateType} from "../../redux/redux-store";

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchPropsType = {
    logout: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<PropsType> {
    render() {
        if (this.props.isAuth) return <Header {...this.props}/>
        return <Redirect to={'/login'}/>
    }
}

const mapStateToDispatch = (state: StateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

>>>>>>> 2168b5cfc8651cef8a12db09eeb1fd0403ebda77
export default connect<MapStatePropsType, MapDispatchPropsType, {}, StateType>(mapStateToDispatch, {logout})(HeaderContainer);