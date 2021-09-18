import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {
    follow,
    getUsers,
    unfollow, UsersType
} from "../../redux/users-reducer";
import {
    _getCurrentPage,
    _getFollowingInProgress,
    _getIsFetching,
    _getPageSize,
    _getTotalUsersCount,
    getUserSelector,
} from "../../redux/users-selectors";
import {StateType} from "../../redux/redux-store";

type MapStatePropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    getUsers: (page: number, pageSize: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

class UsersComponent extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       users={this.props.users}
                       onPageChanged={this.onPageChanged}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                       followingInProgress={this.props.followingInProgress}
                />
            </>
        )
    }
}

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        users: getUserSelector(state),
        pageSize: _getPageSize(state),
        totalUsersCount: _getTotalUsersCount(state),
        currentPage: _getCurrentPage(state),
        isFetching: _getIsFetching(state),
        followingInProgress: _getFollowingInProgress(state)
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, StateType>(mapStateToProps, {
    follow,
    unfollow,
    getUsers
})(UsersComponent);