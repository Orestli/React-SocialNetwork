import React from 'react';
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import defaultAvatar from '../../assets/images/default_ava.png'
import {UsersType} from "../../redux/users-reducer";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UsersType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const Users: React.FC<PropsType> = (props) => {
    return (
        <div className="users-wrapper">
            <Paginator totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage} onPageChanged={props.onPageChanged}/>
            <ul className="users-list">
                {
                    props.users.map((data: UsersType) => {
                        return (
                            <li className="dialog">
                                <div>
                                    <NavLink to={'/profile/' + data.id}>
                                        <img src={data.photos.small != null ? data.photos.small : defaultAvatar} alt='ava'
                                             className={'profile-photo'}/>
                                    </NavLink>
                                </div>
                                <div className="dialog-button">
                                    {
                                        data.followed ?
                                            <button disabled={props.followingInProgress.some(id => id === data.id)} onClick={() => {props.unfollow(data.id)}}><b>UNFOLLOW</b></button> :
                                            <button disabled={props.followingInProgress.some(id => id === data.id)} onClick={() => {props.follow(data.id)}}><b>FOLLOW</b></button>
                                    }
                                </div>
                                <div className="dialog-name">
                                    <p>Name: <b>{data.name}</b></p>
                                </div>
                                <div className="dialog-status">
                                    <p>Status: <b>{data.status}</b></p>
                                </div>
                                <div className="dialog-country">
                                    <p>Country: <b>{'data.location.country'}</b></p>
                                </div>
                                <div className="dialog-city">
                                    <p>City: <b>{'data.location.city'}</b></p>
                                </div>
                                <hr/>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Users;