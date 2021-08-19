import React from "react";
import '../main.css'
import Profile from "./Profile";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {addPost, getStatus, setProfile, updateStatus} from "../../redux/profile-reducer";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authUserId
        }
        this.props.setProfile(userId)
        this.props.getStatus(userId)
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        authUserId: state.auth.userId
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, {
        addPost,
        setProfile,
        getStatus,
        updateStatus
    }),
    withAuthRedirect
)(ProfileContainer)