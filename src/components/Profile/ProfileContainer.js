import React from "react";
import '../main.css'
import Profile from "./Profile";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {addPost, getStatus, setProfile, updatePhoto, updateProfile, updateStatus} from "../../redux/profile-reducer";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authUserId
        }
        this.props.setProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return <Profile {...this.props} isOwner={!this.props.match.params.userId} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}
                        updatePhoto={this.props.updatePhoto} updateProfile={this.props.updateProfile}/>
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
        updateStatus,
        updatePhoto,
        updateProfile
    }),
    withAuthRedirect
)(ProfileContainer)