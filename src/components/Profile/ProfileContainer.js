import React from "react";
import '../main.css'
import Profile from "./Profile";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {addPost, setProfile, updatePost} from "../../redux/profile-reducer";

class ProfileContainer extends React.Component {

    componentDidMount() {
        this.props.setProfile(this.props.match.params.userId);
    }

    render() {
        if (!this.props.isAuth) {
            return <Redirect to="/login" />
        } else {
            return (
                <Profile {...this.props} profile={this.props.profile}/>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        isAuth: state.auth.isAuth
    }
}

const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {
    addPost,
    updatePost,
    setProfile
})(WithUrlDataContainerComponent);