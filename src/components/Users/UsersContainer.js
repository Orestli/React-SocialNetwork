import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {
    follow,
    getUsers,
    setCurrentPage,
    setTotalUserCount,
    setUsers,
    unfollow
} from "../../redux/users-reducer";
import {
    _getCurrentPage,
    _getFollowingInProgress,
    _getIsFetching,
    _getPageSize,
    _getTotalUsersCount,
    getUserSelector,
} from "../../redux/users-selectors";

class UsersComponent extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        const pages = [];

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return (
            <>
                {this.props.isFetching ? <Preloader /> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       pages = {pages}
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

const mapStateToProps = (state) => {
    return {
        users: getUserSelector(state),
        pageSize: _getPageSize(state),
        totalUsersCount: _getTotalUsersCount(state),
        currentPage: _getCurrentPage(state),
        isFetching: _getIsFetching(state),
        followingInProgress: _getFollowingInProgress(state)
    }
}

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUserCount,
    getUsers
})(UsersComponent);