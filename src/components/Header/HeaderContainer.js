import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {setUserData} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {

    componentDidMount() {
        this.props.setUserData();
    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToDispatch = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToDispatch, {setUserData})(HeaderContainer);