import React, {useEffect} from "react";
import '../main.css'
import Profile from "./Profile";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {
    addPost,
    getStatus, PostType,
    ProfileType,
    setProfile,
    updatePhoto,
    updateProfile,
    updateStatus
} from "../../redux/profile-reducer";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {StateType} from "../../redux/redux-store";

type mapStateToPropsType = {
    profile: ProfileType | null
    posts: Array<PostType>
    status: string
    isAuth: boolean
    authUserId: number
    match: {
        params: {
            userId: number
        }
    }
}

type mapDispatchToPropsType = {
    addPost: (text: string) => void
    setProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    updatePhoto: (file: any) => void
    updateProfile: (profile: ProfileType) => void
}

export type ProfileContainerType = mapStateToPropsType & mapDispatchToPropsType

const ProfileContainer: React.FC<ProfileContainerType> = (props) => {
    const refreshProfile = () => {
        let userId = props.match.params.userId
        if (!userId) {
            userId = props.authUserId
        }
        props.setProfile(userId)
        props.getStatus(userId)
    }

    useEffect(() => {
        refreshProfile()
    }, [props.match.params.userId])

    return <Profile {...props} isOwner={!props.match.params.userId} profile={props.profile} status={props.status} updateStatus={props.updateStatus}
                    updatePhoto={props.updatePhoto} updateProfile={props.updateProfile}/>
}

const mapStateToProps = (state: StateType): mapStateToPropsType => ({
    profile: state.profilePage.profile,
    posts: state.profilePage.posts,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    authUserId: state.auth.userId
}) as mapStateToPropsType

export default compose(
    withRouter,
    connect<mapStateToPropsType, mapDispatchToPropsType, {}, StateType>(mapStateToProps, {
        addPost,
        setProfile,
        getStatus,
        updateStatus,
        updatePhoto,
        updateProfile
    }),
    withAuthRedirect
)(ProfileContainer)