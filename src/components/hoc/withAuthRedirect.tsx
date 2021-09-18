import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";

type mapStateToPropsType = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state: StateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export const withAuthRedirect = (Component: React.FC) => {
    const RedirectComponent: React.FC<mapStateToPropsType> = (props) => {
        if (!props.isAuth) {
            return <Redirect to={"/login"} />
        } else {
            return <Component {...props} />
        }
    }

    return connect<mapStateToPropsType, {}, {}, StateType>(mapStateToPropsForRedirect)(RedirectComponent)
}