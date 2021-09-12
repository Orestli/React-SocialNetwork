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

export default connect<MapStatePropsType, MapDispatchPropsType, {}, StateType>(mapStateToDispatch, {logout})(HeaderContainer);