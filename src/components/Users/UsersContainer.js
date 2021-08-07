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

class UsersComponent extends React.Component {
    constructor(props) {
        super(props);
    }

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

        debugger
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
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
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