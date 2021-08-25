import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";

class HeaderContainer extends React.Component {
    render() {
        if (this.props.isAuth) return <Header {...this.props}/>
        return <Redirect to={'/login'}/>
    }
}

const mapStateToDispatch = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToDispatch, {logout})(HeaderContainer);